import React, { Component } from 'react';
import './style.css';
import ArrowKeysReact from 'arrow-keys-react';

const Board_HEIGHT = 20;
const Board_WIDTH = 10;
const direction = { "NORTH": 1, "EAST": 2, "SOUTH": 3, "WEST": 4 }
const movement = { "DOWN": 1, "LEFT": 2, "RIGHT": 3 }
const rotationType = { "AXIS": 1, "DIAGONAL": 2 }
Object.freeze(direction);
Object.freeze(movement);
Object.freeze(rotationType);

class GameBox {

    constructor(xValue, yValue, directionValue, distanceValue) {
        this.x = xValue;
        this.y = yValue;
        this.dir = directionValue;
        this.distance = distanceValue;
        this.hitBottom = false;
        this.old = [];
        this.rotation = rotationType.AXIS;
    }

    move(command) {
        if (this.hitBottom) {
            return;
        }
        if (command == movement.DOWN) {
            this.y++;
        } else if (command == movement.LEFT) {
            this.x--;
        } else if (command == movement.RIGHT) {
            this.x++;
        }
    }

    rotate() {
        if (this.distance == 0 || this.hitBottom) {
            return;
        }
        switch (this.rotation) {
            case rotationType.DIAGONAL:
                this.rotateDiagonal();
                break;
            default:
                this.rotateAxis();
                break;
        }
    }

    rotateAxis() {
        switch (this.dir) {
            case direction.SOUTH:
                this.x = this.x + this.distance;
                this.y = this.y - this.distance;
                this.dir = direction.EAST;
                break;
            case direction.EAST:
                this.x = this.x - this.distance;
                this.y = this.y - this.distance;
                this.dir = direction.NORTH;
                break;
            case direction.NORTH:
                this.x = this.x - this.distance;
                this.y = this.y + this.distance;
                this.dir = direction.WEST;
                break;
            default:
                this.x = this.x + this.distance;
                this.y = this.y + this.distance;
                this.dir = direction.SOUTH;
                break;
        }
    }

    rotateDiagonal() {
        switch (this.dir) {
            case direction.SOUTH:
                this.x = this.x + this.distance * 2;
                this.dir = direction.EAST;
                break;
            case direction.EAST:
                this.y = this.y - this.distance * 2;
                this.dir = direction.NORTH;
                break;
            case direction.NORTH:
                this.x = this.x - this.distance * 2;
                this.dir = direction.WEST;
                break;
            default:
                this.y = this.y + this.distance * 2;
                this.dir = direction.SOUTH;
                break;
        }
    }

    clone() {
        const newBox = new GameBox(this.x, this.y, this.dir, this.distance);
        newBox.hitBottom = this.hitBottom;
        newBox.old = this;
        newBox.rotation = this.rotation;
        return newBox;
    }
}

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            active: false,
            bottom: false,
            coordinatex: this.props.coordinatex,
            coordinatey: this.props.coordinatey,
        };
    }
    render() {
        return (<button
            className="square"
            id={this.props.id}
            style={{ background: this.state.active ? "red" : "white" }}>
            {this.state.value}
        </button>);
    }
}

class RichardsMiniGame extends Component {
    constructor() {
        super();
        this.RichardsMiniGame = [];
        this.state = { boxes: [] };
        ArrowKeysReact.config({
            left: () => {
                this.updateMoveLeft();
            },
            right: () => {
                this.updateMoveRight();
            },
            up: () => {
                this.updateRotate();
            },
            down: () => {
                this.updateMoveDown();
            }
        });
        for (let x = 0; x < Board_WIDTH; x++) {
            let rowRefs = [];
            for (let y = 0; y < Board_HEIGHT; y++) {
                rowRefs.push(React.createRef());
            }
            this.RichardsMiniGame.push(rowRefs);
        }
    }
    render() {
        let RichardsMiniGame = [];
        for (let y = 0; y < Board_HEIGHT; y++) {
            let row = []
            for (let x = 0; x < Board_WIDTH; x++) {
                row.push(<Square ref={this.RichardsMiniGame[x][y]} id={x + "-" + y} coordinatex={x} coordinatey={y} />);
            }
            RichardsMiniGame.push(<div className="Board-row">{row}</div>)
        }
        return (
            <div className="Board">
                <input {...ArrowKeysReact.events} tabIndex="1" type="button" value="Start" onClick={() => {
                    this.updateAddShape(this.createRandomShape());
                }} />
                <input type="button" value="Rotate" onClick={() => {
                    this.updateRotate();
                }} />
                <input type="button" value="Left" onClick={() => {
                    this.updateMoveLeft();
                }} />
                <input type="button" value="Right" onClick={() => {
                    this.updateMoveRight();
                }} />
                <input type="button" value="Down" onClick={() => {
                    this.updateMoveDown();
                }} />
                <header className="Board-header">
                    {RichardsMiniGame}
                </header>
            </div>
        )
    }

    initBoardLogic() {
        // inits the two dimensional game board array
        let newBoard = [];
        for (let i = 0; i < Board_WIDTH; i++) {
            newBoard[i] = [];
            newBoard[i][Board_HEIGHT] = null;
            newBoard[i].pop();
        }
        return newBoard;
    }

    addBoxesToBoard(board, boxes) {
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            board[box.x][box.y] = box;
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createRandomShape() {
        const rand = this.getRandomInt(0, 5);
        switch (rand) {
            case 0:
                return this.createIshape();
            case 1:
                return this.createJshape();
            case 2:
                return this.createLshape();
            case 3:
                return this.createOshape();
            case 4:
                return this.createSshape();
            case 5:
                return this.createTshape();
            default:
                return this.createOshape();
        }

    }

    createIshape() {
        let newShape = [];
        newShape.push(new GameBox(4, 1, direction.NORTH, 1));
        newShape.push(new GameBox(4, 2, direction.NORTH, 0));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 1));
        newShape.push(new GameBox(4, 4, direction.SOUTH, 2));
        return newShape;
    }

    createJshape() {
        let newShape = [];
        newShape.push(new GameBox(5, 2, direction.EAST, 1));
        newShape.push(new GameBox(4, 2, direction.NORTH, 0));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 1));
        newShape.push(new GameBox(4, 4, direction.SOUTH, 2));
        return newShape;
    }

    createTshape() {
        let newShape = [];
        newShape.push(new GameBox(4, 1, direction.NORTH, 1));
        newShape.push(new GameBox(4, 2, direction.NORTH, 0));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 1));
        newShape.push(new GameBox(5, 2, direction.EAST, 1));
        return newShape;
    }

    createLshape() {
        let newShape = [];
        newShape.push(new GameBox(3, 2, direction.WEST, 1));
        newShape.push(new GameBox(4, 2, direction.NORTH, 0));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 1));
        newShape.push(new GameBox(4, 4, direction.SOUTH, 2));
        return newShape;
    }

    createSshape() {
        let newShape = [];
        newShape.push(new GameBox(5, 2, direction.EAST, 1));
        newShape.push(new GameBox(4, 2, direction.NORTH, 0));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 1));
        const box = new GameBox(3, 3, direction.SOUTH, 1);
        box.rotation = rotationType.DIAGONAL;
        newShape.push(box);
        return newShape;
    }

    createOshape() {
        let newShape = [];
        newShape.push(new GameBox(5, 2, direction.SOUTH, 0));
        newShape.push(new GameBox(4, 2, direction.SOUTH, 0));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 0));
        newShape.push(new GameBox(5, 3, direction.SOUTH, 0));
        return newShape;
    }

    addHitBottomBoxesToBoard(gameboard, boxes) {
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            if (box.hitBottom) {
                gameboard[box.x][box.y] = box;
            }
        }
    }

    doAction(child, command) {
        if (command == null) {
            child.rotate();
        } else {
            child.move(command);
        }
    }

    hitBottomDetection(gameboard, newChildren, boxes) {
        let bottomHit = this.hitBottomCheck(gameboard, newChildren);
        if (bottomHit) {
            this.markAllAsBottomHit(newChildren);
            //Create new Random Shape on the Platform
            const newBoxes = this.createRandomShape();
            this.addNewBoxesToBoxes(boxes, newBoxes);
            this.addBoxesToBoard(gameboard, newBoxes);
        }
    }

    hitBottomCheck(gameboard, boxes) {
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            // if the clone hits the bottom or the next boxs is already on the bottom 
            if (box.y == Board_HEIGHT - 1 || (gameboard[box.x][box.y + 1] != null && gameboard[box.x][box.y + 1].hitBottom)) {
                return true;
            }
        }
        return false;
    }

    evaluate(command, boxes) {
        let actionSuccess = true;
        let newChildren = [];
        let gameboard = this.initBoardLogic();
        this.addHitBottomBoxesToBoard(gameboard, boxes);
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];

            // do not evaluate if is already evaluated
            if (box.hitBottom) {
                continue;
            }
            const childClone = box.clone();
            this.doAction(childClone, command);

            // if the clone hit something or is out of bounds
            if (childClone.x < 0 || childClone.y < 0 || childClone.x == Board_WIDTH || gameboard[childClone.x][childClone.y] != null) {
                actionSuccess = false;
                break;
            }

            // Mark as evaluated and remember in array
            newChildren.push(childClone);
            gameboard[childClone.x][childClone.y] = childClone;
        }

        // if evaluation failed, do nothing
        if (actionSuccess == false) {
            gameboard = this.initBoardLogic();
            this.addBoxesToBoard(gameboard, boxes);
            return gameboard;
        }
        this.hitBottomDetection(gameboard, newChildren, boxes);
        this.overrideOriginalsWithValues(newChildren);
        return gameboard;
    }

    markAllAsBottomHit(newChildren) {
        for (let j = 0; j < newChildren.length; j++) {
            newChildren[j].hitBottom = true;
        }
    }

    overrideOriginalsWithValues(newChildren) {
        // update values of the old boxes with the new values from the evaluation
        for (let j = 0; j < newChildren.length; j++) {
            const newChild = newChildren[j];
            const oldChild = newChild.old;
            oldChild.x = newChild.x;
            oldChild.y = newChild.y;
            oldChild.hitBottom = newChild.hitBottom;
            oldChild.dir = newChild.dir;
        }
    }

    updateAddShape(boxes) {
        this.update(null, boxes);
    }

    updateMoveRight() {
        this.update(movement.RIGHT, null);
    }

    updateMoveLeft() {
        this.update(movement.LEFT, null);
    }

    updateRotate() {
        this.update(null, null);
    }

    updateMoveDown() {
        this.update(movement.DOWN, null);
    }

    update(command, newBoxes) {

        let boxes = this.state.boxes;
        let newBoard;
        if (newBoxes != null) {
            this.addNewBoxesToBoxes(boxes, newBoxes);
            newBoard = this.initBoardLogic();
            this.addBoxesToBoard(newBoard, boxes);
        } else {
            newBoard = this.evaluate(command, boxes);
        }
        for (let x = 0; x < newBoard.length; x++) {
            const column = newBoard[x];
            for (let y = 0; y < column.length; y++) {
                const cell = column[y];
                if (cell != null) {
                    this.activateSquare(x, y);
                } else {
                    this.deactivateSqare(x, y);
                }
            }
        }
        this.setState({ boxes: boxes });
    }

    addNewBoxesToBoxes(boxes, newBoxes) {
        for (let i = 0; i < newBoxes.length; i++) {
            const element = newBoxes[i];
            boxes.push(element);
        }
    }

    activateSquare(x, y) {
        this.RichardsMiniGame[x][y].current.setState({ active: true });
    }

    deactivateSqare(x, y) {
        this.RichardsMiniGame[x][y].current.setState({ active: false });
        this.RichardsMiniGame[x][y].current.setState({ bottom: false });
    }
}
export default RichardsMiniGame;