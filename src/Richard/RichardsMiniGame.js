import React, { Component } from 'react';
import './style.css';

const Board_HEIGHT = 20;
const Board_WIDTH = 10;

class GameBox {

    constructor(xValue, yValue, directionValue, distanceValue) {
        this.x = xValue;
        this.y = yValue;
        this.dir = directionValue;
        this.distance = distanceValue;
        this.hitBottom = false;
        this.isEvaluated = false;
        this.old = [];
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
        if (this.dir == direction.SOUTH) {
            this.x = this.x + this.distance;
            this.y = this.y - this.distance;
            this.dir = direction.EAST;
        } else if (this.dir == direction.EAST) {
            this.x = this.x - this.distance;
            this.y = this.y - this.distance;
            this.dir = direction.NORTH;
        } else if (this.dir == direction.NORTH) {
            this.x = this.x - this.distance;
            this.y = this.y + this.distance;
            this.dir = direction.WEST;
        } else {
            this.x = this.x + this.distance;
            this.y = this.y + this.distance;
            this.dir = direction.SOUTH;
        }
    }

    clone() {
        const newBox = new GameBox(this.x, this.y, this.dir, this.distance);
        newBox.hitBottom = this.hitBottom;
        newBox.old = this;
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
                <input type="button" value="Start" onClick={() => {
                    this.update(null, this.createRandomShape());
                }} />
                <input type="button" value="Rotate" onClick={() => {
                    this.update();
                }} />
                <input type="button" value="Left" onClick={() => {
                    this.update(movement.LEFT);
                }} />
                <input type="button" value="Right" onClick={() => {
                    this.update(movement.RIGHT);
                }} />
                <input type="button" value="Down" onClick={() => {
                    this.update(movement.DOWN);
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

    createRandomShape() {
        // TODO implement random
        return this.createTshape();
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
        newShape.push(new GameBox(3, 3, direction.WEST, 1));
        return newShape;
    }

    createOshape() {
        let newShape = [];
        newShape.push(new GameBox(5, 2, direction.EAST, 1));
        newShape.push(new GameBox(4, 2, direction.NORTH, 0));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 1));
        newShape.push(new GameBox(5, 3, direction.WEST, 1));
        return newShape;
    }

    orderBoxes(boxes, command) {
        return boxes.sort((a, b) => {
            if (command == null) {
                if (a.x > b.x) return -1;
                if (a.x < b.x) return 1;
                if (a.y > b.y) return -1;
                if (a.y > b.y) return 1;
                return 0;
            }
            else if (command == movement.LEFT) {
                if (a.x < b.x) return 1;
                if (a.x > b.x) return -1;
                if (a.y > b.y) return 1;
                if (a.y < b.y) return -1;
                return 0;
            }
            else if (command == movement.DOWN) {
                if (a.y > b.y) return -1;
                if (a.y < b.y) return 1;
                if (a.x < b.x) return -1;
                if (a.x > b.x) return 1;
                return 0;
            }
            else {
                if (a.x > b.x) return -1;
                if (a.x < b.x) return 1;
                if (a.y > b.y) return -1;
                if (a.y < b.y) return 1;
                return 0;
            }
        });
    }

    evaluate(command, gameboard, boxes) {
        let orderedBoxes = this.orderBoxes(boxes, command);
        let actionSuccess = true;
        let bottomHit = false;
        let newChildren = [];

        for (let i = 0; i < orderedBoxes.length; i++) {
            const box = orderedBoxes[i];

            // do not evaluate if is already evaluated
            if (box.isEvaluated || box.hitBottom) {
                continue;
            }
            const childClone = box.clone();

            // Do action
            if (command == null) {
                childClone.rotate();
            } else {
                childClone.move(command);
            }

            // if the clone hit something or is out of bounds
            if (childClone.x < 0 || childClone.y < 0 || childClone.x == Board_WIDTH) {
                actionSuccess = false;
                break;
            }

            // check if a block is in its way
            if (gameboard[childClone.x][childClone.y] != null) {
                let otherClone = newChildren.find(x => gameboard[childClone.x][childClone.y] == x.old);
                // check if the updated version is still in its way and that is not itself
                if ((otherClone == null || (otherClone.x == childClone.x && otherClone.y == childClone.y)) && gameboard[childClone.x][childClone.y] !== childClone.old) {
                    actionSuccess = false;
                    break;
                }
            }

            // if the clone hits the bottom or the next boxs is already on the bottom 
            if (childClone.y == Board_HEIGHT - 1 || (gameboard[childClone.x][childClone.y + 1] != null && gameboard[childClone.x][childClone.y + 1].hitBottom)) {
                bottomHit = true;
            }

            // Mark as evaluated and remember in array
            childClone.isEvaluated = true;
            newChildren.push(childClone);
        }

        // if evaluation failed, do nothing
        if (actionSuccess == false) {
            return;
        }

        // shape hit bottom and set hitBottom for all true
        if (bottomHit == true) {
            this.markAllAsBottomHit(newChildren);
        }
        this.overrideOriginalsWithValues(newChildren);
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
            oldChild.isEvaluated = true;
            oldChild.dir = newChild.dir;
        }
    }

    update(command, newBoxes) {

        let boxes = this.state.boxes;
        if (newBoxes != null) {
            for (let i = 0; i < newBoxes.length; i++) {
                const element = newBoxes[i];
                boxes.push(element);
            }
        } else {
            this.evaluate(command, this.createGameBoardOfBoxes(boxes), boxes);
        }

        let newBoard = this.createGameBoardOfBoxes(boxes);
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

    createGameBoardOfBoxes(boxes) {
        let newBoard = this.initBoardLogic();
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            newBoard[box.x][box.y] = box;
            boxes[i].isEvaluated = false;
        }
        return newBoard;
    }

    activateSquare(x, y) {
        this.RichardsMiniGame[x][y].current.setState({ active: true });
    }

    deactivateSqare(x, y) {
        this.RichardsMiniGame[x][y].current.setState({ active: false });
        this.RichardsMiniGame[x][y].current.setState({ bottom: false });
    }
}

const direction = { "NORTH": 1, "EAST": 2, "SOUTH": 3, "WEST": 4 }
Object.freeze(direction);
const movement = { "DOWN": 1, "LEFT": 2, "RIGHT": 3 }
Object.freeze(movement);


export default RichardsMiniGame;