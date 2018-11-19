import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const Board_HEIGHT = 10;
const Board_WIDTH = 10;
const DEADLINE_X = 9;
const DEADLINE_Y = 19;
let rotation = 0;

class GameBox {

    constructor(xValue, yValue, directionValue, distanceValue) {
        this.x = xValue;
        this.y = yValue;
        this.dir = directionValue;
        this.distance = distanceValue;
        this.hitBottom = false;
        this.isEvaluated = false;
        this.shapeChildren = [];
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
        this.printShape = this.printShape.bind(this);
        this.checkBorder = this.checkBorder.bind(this);

        this.printNewShape_rotation_0 = this.printNewShape_rotation_0.bind(this);
        this.setShape_rotation_1 = this.setShape_rotation_1.bind(this);
        this.setShape_rotation_2 = this.setShape_rotation_2.bind(this);
        this.setShape_rotation_3 = this.setShape_rotation_3.bind(this);

        this.moveShape = this.moveShape.bind(this);

        this.getShape_rotation_0_Coordinates = this.getShape_rotation_0_Coordinates.bind(this);
        this.getShape_rotation_1_Coordinates = this.getShape_rotation_1_Coordinates.bind(this);
        this.getShape_rotation_2_Coordinates = this.getShape_rotation_2_Coordinates.bind(this);
        this.getShape_rotation_3_Coordinates = this.getShape_rotation_3_Coordinates.bind(this);

        this.getBottomSquare_rotation_0_Coordinates = this.getBottomSquare_rotation_0_Coordinates.bind(this);
        this.getBottomSquare_rotation_1_Coordinates = this.getBottomSquare_rotation_1_Coordinates.bind(this);
        this.getBottomSquare_rotation_2_Coordinates = this.getBottomSquare_rotation_2_Coordinates.bind(this);
        this.getBottomSquare_rotation_3_Coordinates = this.getBottomSquare_rotation_3_Coordinates.bind(this);

        this.activateSquare = this.activateSquare.bind(this);
        this.activateBottomSquare = this.activateBottomSquare.bind(this);

        this.setNewBottomSquare_rotation_0 = this.setNewBottomSquare_rotation_0.bind(this);
        this.setNewBottomSquare_rotation_0 = this.setNewBottomSquare_rotation_0.bind(this);
        this.setNewBottomSquare_rotation_0 = this.setNewBottomSquare_rotation_0.bind(this);
        this.setNewBottomSquare_rotation_0 = this.setNewBottomSquare_rotation_0.bind(this);

        this.setBottomSquare_rotation_0 = this.setBottomSquare_rotation_0.bind(this);
        this.setBottomSquare_rotation_1 = this.setBottomSquare_rotation_1.bind(this);
        this.setBottomSquare_rotation_2 = this.setBottomSquare_rotation_2.bind(this);
        this.setBottomSquare_rotation_3 = this.setBottomSquare_rotation_3.bind(this);

        this.moveBottomSquare = this.moveBottomSquare.bind(this);
        this.checknextfieldactive = this.checknextfieldactive.bind(this);
        this.rotateShape = this.rotateShape.bind(this);
        this.rotateBottomSquare = this.rotateBottomSquare.bind(this);

        this.RichardsMiniGame = [];
        this.state = { gameboard: this.initBoardLogic(), boxes: [], currentShape: [], currentShape_rotation_1: [], currentShape_rotation_2: [], currentShape_rotation_3: [] };
        this.bottom_square = { currentBottomSquare: [], currentBottomSquare_rotation_1: [], currentBottomSquare_rotation_2: [], currentBottomSquare_rotation_3: [] };
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
        return this.createIshape();
    }

    createIshape() {
        let newShape = [];
        const b1 = new GameBox(4, 1, direction.NORTH, 1);
        const b2 = new GameBox(4, 2, direction.NORTH, 0);
        const b3 = new GameBox(4, 3, direction.SOUTH, 1);
        const b4 = new GameBox(4, 4, direction.SOUTH, 2);
        b1.shapeChildren.push(b2);
        b1.shapeChildren.push(b3);
        b1.shapeChildren.push(b4);

        b2.shapeChildren.push(b1);
        b2.shapeChildren.push(b3);
        b2.shapeChildren.push(b4);

        b3.shapeChildren.push(b1);
        b3.shapeChildren.push(b2);
        b3.shapeChildren.push(b4);

        b4.shapeChildren.push(b1);
        b4.shapeChildren.push(b2);
        b4.shapeChildren.push(b3);

        newShape.push(b1);
        newShape.push(b2);
        newShape.push(b3);
        newShape.push(b4);
        return newShape;
    }

    createJshape() {
        // TODO implement J Shape
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

            if (gameboard[childClone.x][childClone.y] != null) {
                let otherClone = newChildren.find(x => gameboard[childClone.x][childClone.y] == x.old);
                if (otherClone == null || (otherClone.x == childClone.x && otherClone.y == childClone.y) || gameboard[childClone.x][childClone.y] !== childClone.old) {
                    // evaluate box which is in the way, to make sure that it is already updated
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
        console.log({ text: "hit bottom func", newBoxes: newChildren })
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
        let currentBoard = this.state.gameboard;
        let boxes = this.state.boxes;
        /*
        console.log({
            text: "update call info",
            boxes: boxes,
            command: command,
            newBoxes: newBoxes
        });
        */
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

    activateBottomSquare(x, y) {
        this.RichardsMiniGame[x][y].current.setState({ bottom: true });
    }

    deactivateSqare(x, y) {
        this.RichardsMiniGame[x][y].current.setState({ active: false });
        this.RichardsMiniGame[x][y].current.setState({ bottom: false });
    }
    //Get Coordinates for all opportunitys
    getShape_rotation_0_Coordinates() {
        let shape = [];
        for (let i = 0; i < this.state.currentShape.length; i++) {
            shape.push({ x: this.state.currentShape[i].props.coordinatex, y: this.state.currentShape[i].props.coordinatey });
        }
        return shape;
    }
    getShape_rotation_1_Coordinates() {
        let shape = [];
        for (let i = 0; i < this.state.currentShape_rotation_1.length; i++) {
            shape.push({ x: this.state.currentShape_rotation_1[i].props.coordinatex, y: this.state.currentShape_rotation_1[i].props.coordinatey });
        }
        return shape;
    }
    getShape_rotation_2_Coordinates() {
        let shape = [];
        for (let i = 0; i < this.state.currentShape_rotation_2.length; i++) {
            shape.push({ x: this.state.currentShape_rotation_2[i].props.coordinatex, y: this.state.currentShape_rotation_2[i].props.coordinatey });
        }
        return shape;
    }
    getShape_rotation_3_Coordinates() {
        let shape = [];
        for (let i = 0; i < this.state.currentShape_rotation_3.length; i++) {
            shape.push({ x: this.state.currentShape_rotation_3[i].props.coordinatex, y: this.state.currentShape_rotation_3[i].props.coordinatey });
        }
        return shape;
    }

    //Get Bottom Coordinates for all opportunitys
    getBottomSquare_rotation_0_Coordinates() {
        let square = [];
        for (let i = 0; i < this.state.currentBottomSquare.length; i++) {
            square.push({ x: this.state.currentBottomSquare[i].props.coordinatex, y: this.state.currentBottomSquare[i].props.coordinatey });
        }
        return square;
    }

    getBottomSquare_rotation_1_Coordinates() {
        let square = [];
        for (let i = 0; i < this.state.currentBottomSquare_rotation_1.length; i++) {
            square.push({ x: this.state.currentBottomSquare_rotation_1[i].props.coordinatex, y: this.state.currentBottomSquare_rotation_1[i].props.coordinatey });
        }
        return square;
    }

    getBottomSquare_rotation_2_Coordinates() {
        let square = [];
        for (let i = 0; i < this.state.currentBottomSquare_rotation_2.length; i++) {
            square.push({ x: this.state.currentBottomSquare_rotation_2[i].props.coordinatex, y: this.state.currentBottomSquare_rotation_2[i].props.coordinatey });
        }
        return square;
    }

    getBottomSquare_rotation_3_Coordinates() {
        let square = [];
        for (let i = 0; i < this.state.currentBottomSquare_rotation_3.length; i++) {
            square.push({ x: this.state.currentBottomSquare_rotation_3[i].props.coordinatex, y: this.state.currentBottomSquare_rotation_3[i].props.coordinatey });
        }
        return square;
    }

    getBottomSquare() {
        let square = [];
        square.push({ x: this.state.currentBottomSquare.props.coordinatex, y: this.state.currentBottomSquare.props.coordinatey });
        return square;
    }

    //Print and setBottomSquarefunction

    printShape(rotation) {
        switch (rotation) {
            case 0:
                let tmp_currentShape = [];
                let shape = this.getShape_rotation_0_Coordinates();
                for (let i = 0; i < this.state.currentShape.length; i++) {
                    this.activateSquare(shape[i].x, shape[i].y);
                    tmp_currentShape[i] = this.RichardsMiniGame[shape[i].x][shape[i].y].current;
                }
                this.setState({ currentShape: tmp_currentShape })
                break;
            case 1:
                let tmp_currentShape_rotation_1 = [];
                let shape_rotation_1 = this.getShape_rotation_1_Coordinates();
                for (let i = 0; i < this.state.currentShape_rotation_1.length; i++) {
                    this.activateSquare(shape_rotation_1[i].x, shape_rotation_1[i].y);
                    tmp_currentShape_rotation_1[i] = this.RichardsMiniGame[shape_rotation_1[i].x][shape_rotation_1[i].y].current;
                }
                this.setState({ currentShape_rotation_1: tmp_currentShape_rotation_1 });
                break;
            case 2:
                let tmp_currentShape_rotation_2 = [];
                let shape_rotation_2 = this.getShape_rotation_2_Coordinates();
                for (let i = 0; i < this.state.currentShape_rotation_2.length; i++) {
                    this.activateSquare(shape_rotation_2[i].x, shape_rotation_2[i].y);
                    tmp_currentShape_rotation_2[i] = this.RichardsMiniGame[shape_rotation_2[i].x][shape_rotation_2[i].y].current;
                }
                this.setState({ currentShape_rotation_2: tmp_currentShape_rotation_2 });
                break;
            case 3:
                let tmp_currentShape_rotation_3 = [];
                let shape_rotation_3 = this.getShape_rotation_3_Coordinates();
                for (let i = 0; i < this.state.currentShape_rotation_3.length; i++) {
                    this.activateSquare(shape_rotation_3[i].x, shape_rotation_3[i].y);
                    tmp_currentShape_rotation_3[i] = this.RichardsMiniGame[shape_rotation_3[i].x][shape_rotation_3[i].y].current;
                }
                this.setState({ currentShape_rotation_3: tmp_currentShape_rotation_3 });
                break;
            default: break;
        }
    }

    setBottomSquare_rotation_0() {
        let tmp_currentShape = [];
        let square = this.getBottomSquare_rotation_0_Coordinates();
        for (let i = 0; i < this.state.currentBottomSquare.length; i++) {
            this.activateBottomSquare(square[i].x, square[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[square[i].x][square[i].y].current;
        }
        this.setState({ currentBottomSquare: tmp_currentShape });
    }
    setBottomSquare_rotation_1() {
        let tmp_currentShape = [];
        let square = this.getBottomSquare_rotation_1_Coordinates();
        for (let i = 0; i < this.state.currentBottomSquare_rotation_1.length; i++) {
            this.activateBottomSquare(square[i].x, square[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[square[i].x][square[i].y].current;
        }
        this.setState({ currentBottomSquare_rotation_1: tmp_currentShape });
    }
    setBottomSquare_rotation_2() {
        let tmp_currentShape = [];
        let square = this.getBottomSquare_rotation_2_Coordinates();
        for (let i = 0; i < this.state.currentBottomSquare_rotation_2.length; i++) {
            this.activateBottomSquare(square[i].x, square[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[square[i].x][square[i].y].current;
        }
        this.setState({ currentBottomSquare_rotation_2: tmp_currentShape });
    }
    setBottomSquare_rotation_3() {
        let tmp_currentShape = [];
        let square = this.getBottomSquare_rotation_3_Coordinates();
        for (let i = 0; i < this.state.currentBottomSquare_rotation_3.length; i++) {
            this.activateBottomSquare(square[i].x, square[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[square[i].x][square[i].y].current;
        }
        this.setState({ currentBottomSquare_rotation_3: tmp_currentShape });
    }

    //Print and setBottomSquarefunction at the beginning

    printNewShape_rotation_0(shape) {
        console.log("printNewShape");
        let tmp_currentShape = [];
        for (let i = 0; i < shape.length; i++) {
            this.activateSquare(shape[i].x, shape[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[shape[i].x][shape[i].y].current;
        }
        this.setState({ currentShape: tmp_currentShape });
    }
    setShape_rotation_1(shape) {
        console.log("setShape Rotation 1");
        let tmp_currentShape = [];
        for (let i = 0; i < shape.length; i++) {
            tmp_currentShape[i] = this.RichardsMiniGame[shape[i].x][shape[i].y].current;
        }
        this.setState({ currentShape_rotation_1: tmp_currentShape });
        //,()=>{console.log(this.state.currentShape_rotation_1);})    
    }
    setShape_rotation_2(shape) {
        console.log("setShape Rotation 2");
        let tmp_currentShape = [];
        for (let i = 0; i < shape.length; i++) {
            tmp_currentShape[i] = this.RichardsMiniGame[shape[i].x][shape[i].y].current;
        }
        this.setState({ currentShape_rotation_2: tmp_currentShape });

    }
    setShape_rotation_3(shape) {
        console.log("setShape Rotation 3");
        let tmp_currentShape = [];
        for (let i = 0; i < shape.length; i++) {
            tmp_currentShape[i] = this.RichardsMiniGame[shape[i].x][shape[i].y].current;
        }
        this.setState({ currentShape_rotation_3: tmp_currentShape });
    }


    setNewBottomSquare_rotation_0(square) {
        console.log("getBottomShape Rotation 0")
        let tmp_currentBottomShape = [];
        for (let i = 0; i < square.length; i++) {
            this.activateBottomSquare(square[i].x, square[i].y);
            tmp_currentBottomShape[i] = this.RichardsMiniGame[square[i].x][square[i].y].current;
        }
        this.setState({ currentBottomSquare: tmp_currentBottomShape });
    }
    setNewBottomSquare_rotation_1(square) {
        console.log("getBottomShape Rotation 1")
        let tmp_currentBottomShape = [];
        for (let i = 0; i < square.length; i++) {
            this.activateBottomSquare(square[i].x, square[i].y);
            tmp_currentBottomShape[i] = this.RichardsMiniGame[square[i].x][square[i].y].current;
        }
        this.setState({ currentBottomSquare_rotation_1: tmp_currentBottomShape });
    }
    setNewBottomSquare_rotation_2(square) {
        console.log("getBottomShape Rotation 2")
        let tmp_currentBottomShape = [];
        for (let i = 0; i < square.length; i++) {
            this.activateBottomSquare(square[i].x, square[i].y);
            tmp_currentBottomShape[i] = this.RichardsMiniGame[square[i].x][square[i].y].current;
        }
        this.setState({ currentBottomSquare_rotation_2: tmp_currentBottomShape });
    }
    setNewBottomSquare_rotation_3(square) {
        console.log("getBottomShape Rotation 3")
        let tmp_currentBottomShape = [];
        for (let i = 0; i < square.length; i++) {
            this.activateBottomSquare(square[i].x, square[i].y);
            tmp_currentBottomShape[i] = this.RichardsMiniGame[square[i].x][square[i].y].current;
        }
        this.setState({ currentBottomSquare_rotation_3: tmp_currentBottomShape });
    }

    //Moving Fuction

    moveShape(direction) {
        //this.moveBottomSquare(direction);
        let newCurrentShape = [];
        console.log(rotation);
        console.log(direction);
        for (let i = 0; i < this.state.currentShape.length; i++) {
            let square_rotation_0 = this.state.currentShape[i];
            let x = square_rotation_0.props.coordinatex;
            let y = square_rotation_0.props.coordinatey;
            if (direction === "left") {
                x--;
            }
            if (direction === "right") {
                x++;
            }
            if (direction === "down") {
                y++;
            }
            if (x >= 0 && y >= 0 && x < DEADLINE_X && y < DEADLINE_Y) {
                newCurrentShape[i] = this.RichardsMiniGame[x][y].current;
            }
            else { console.log("Shape 0 is out of boarder") };
        }

        //Move Current Shape Rotation 1
        let newCurrentShape_rotation_1 = [];
        for (let i = 0; i < this.state.currentShape_rotation_1.length; i++) {
            let square_rotation_1 = this.state.currentShape_rotation_1[i];
            let x = square_rotation_1.props.coordinatex;
            let y = square_rotation_1.props.coordinatey;
            if (direction === "left") {
                x--;
            }
            if (direction === "right") {
                x++;
            }
            if (direction === "down") {
                y++;
            }
            if (x >= 0 && y >= 0 && x < DEADLINE_X && y < DEADLINE_Y) {
                newCurrentShape_rotation_1[i] = this.RichardsMiniGame[x][y].current;
            }
            else { console.log("Shape 1 is out of boarder") };
        }

        //Move Current Shape Rotation 2
        let newCurrentShape_rotation_2 = [];
        for (let i = 0; i < this.state.currentShape_rotation_2.length; i++) {
            let square_rotation_2 = this.state.currentShape_rotation_2[i];
            let x = square_rotation_2.props.coordinatex;
            let y = square_rotation_2.props.coordinatey;
            if (direction === "left") {
                x--;
            }
            if (direction === "right") {
                x++;
            }
            if (direction === "down") {
                y++;
            }
            if (x >= 0 && y >= 0 && x < DEADLINE_X && y < DEADLINE_Y) {
                newCurrentShape_rotation_2[i] = this.RichardsMiniGame[x][y].current;
            }
            else { console.log("Shape 2 is out of boarder") };
        }

        //Move Current Shape Rotation 3
        let newCurrentShape_rotation_3 = [];
        for (let i = 0; i < this.state.currentShape_rotation_3.length; i++) {
            let square_rotation_3 = this.state.currentShape_rotation_3[i];
            let x = square_rotation_3.props.coordinatex;
            let y = square_rotation_3.props.coordinatey;
            if (direction === "left") {
                x--;
            }
            if (direction === "right") {
                x++;
            }
            if (direction === "down") {
                y++;
            }
            if (x >= 0 && y >= 0 && x < DEADLINE_X && y < DEADLINE_Y) {
                newCurrentShape_rotation_3[i] = this.RichardsMiniGame[x][y].current;
            }
            else { console.log("Shape 3 is out of boarder") };
        }
        //Clear all activate Shapes
        this.clear(this.getShape_rotation_0_Coordinates());
        this.clear(this.getShape_rotation_1_Coordinates());
        this.clear(this.getShape_rotation_2_Coordinates());
        this.clear(this.getShape_rotation_3_Coordinates());

        //Set all States
        this.setState({ currentShape: newCurrentShape, currentShape_rotation_1: newCurrentShape_rotation_1, currentShape_rotation_2: newCurrentShape_rotation_2, currentShape_rotation_3: newCurrentShape_rotation_3 }, () => { this.printShape(rotation); });
    }

    moveBottomSquare(direction) {
        let newCurrentBottomSquare = [];
        for (let i = 0; i < this.state.currentBottomSquare.length; i++) {
            let square = this.state.currentBottomSquare[i];
            let x = square.props.coordinatex;
            let y = square.props.coordinatey;
            if (direction === "down") {
                y++;
            }
            if (direction === "left") {
                x = x - 1;
            }
            if (direction === "right") {
                x++;
            }
            newCurrentBottomSquare[i] = this.RichardsMiniGame[x][y].current;
        }
        this.setState({ currentBottomSquare: newCurrentBottomSquare }, this.setBottomSquare);
    }

    //Rotation Functions

    rotateShape() {
        let shape_rotation = [];
        let tmp_currentShape = [];
        console.log(rotation);
        switch (rotation) {
            case 0:
                shape_rotation = this.getShape_rotation_1_Coordinates();
                console.log(shape_rotation);
                console.log(this.getShape_rotation_0_Coordinates());
                this.clear(this.getShape_rotation_0_Coordinates());
                for (let i = 0; i < shape_rotation.length; i++) {
                    this.activateSquare(shape_rotation[i].x, shape_rotation[i].y);
                    tmp_currentShape[i] = this.RichardsMiniGame[shape_rotation[i].x][shape_rotation[i].y].current;
                }
                this.setState({ currentShape_rotation_1: tmp_currentShape });
                rotation = 1;
                break;
            case 1:
                shape_rotation = this.getShape_rotation_2_Coordinates();
                console.log(shape_rotation);
                this.clear(this.getShape_rotation_1_Coordinates());
                for (let i = 0; i < shape_rotation.length; i++) {
                    this.activateSquare(shape_rotation[i].x, shape_rotation[i].y);
                    tmp_currentShape[i] = this.RichardsMiniGame[shape_rotation[i].x][shape_rotation[i].y].current;
                }
                this.setState({ currentShape_rotation_2: tmp_currentShape });
                rotation = 2;
                break;
            case 2:
                shape_rotation = this.getShape_rotation_3_Coordinates();
                console.log(shape_rotation);
                this.clear(this.getShape_rotation_2_Coordinates());
                for (let i = 0; i < shape_rotation.length; i++) {
                    this.activateSquare(shape_rotation[i].x, shape_rotation[i].y);
                    tmp_currentShape[i] = this.RichardsMiniGame[shape_rotation[i].x][shape_rotation[i].y].current;
                }
                this.setState({ currentShape_rotation_3: tmp_currentShape });
                rotation = 3;
                break;
            case 3:
                shape_rotation = this.getShape_rotation_0_Coordinates();
                console.log(shape_rotation);
                this.clear(this.getShape_rotation_3_Coordinates());
                for (let i = 0; i < shape_rotation.length; i++) {
                    this.activateSquare(shape_rotation[i].x, shape_rotation[i].y);
                    tmp_currentShape[i] = this.RichardsMiniGame[shape_rotation[i].x][shape_rotation[i].y].current;
                }
                this.setState({ currentShape: tmp_currentShape });
                rotation = 0;
                break;
            default:
                break;
        }
        console.log("Rotation number" + rotation);
    }

    rotateBottomSquare() {
        let newCurrentBottomSquare = [];
        for (let i = 0; i < this.state.currentBottomSquare.length; i++) {
            let square = this.state.currentBottomSquare[i];
            let x = square.props.coordinatex;
            let y = square.props.coordinatey;
            newCurrentBottomSquare[i] = this.RichardsMiniGame[x][y].current;
        }
        this.setState({ currentBottomSquare: newCurrentBottomSquare }, this.setBottomSquare);
    }

    //Functions that Check the Values

    clear(shape) {
        for (let i = 0; i < shape.length; i++) {
            this.deactivateSqare(shape[i].x, shape[i].y);
        }
    }

    checkBorder() {
        let check = true;
        for (let i = 0; i < this.state.currentShape.length; i++) {
            let square = this.state.currentShape[i];
            let x = square.props.coordinatex;
            let y = square.props.coordinatey;
            if (x >= 0 && y >= 0 && x < DEADLINE_X && y < DEADLINE_Y) {
                check = true;
            }
            else { check = false };
        }
        return check;
    }

    checknextfieldactive() {
        let nextfield = [];
        for (let i = 0; i < this.state.currentBottomSquare.length; i++) {
            let square = this.state.currentBottomSquare[i];
            let x = square.props.coordinatex;
            let y = square.props.coordinatey;
            y++;
            nextfield = this.RichardsMiniGame[x][y].current;
        }
        if (nextfield.state.active) {
            return true;
        }
        else { return false; }
    }
}

const shapes = {
    row_rotation_0: [{ x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }],
    bottomsquare_rotation_0: [{ x: 4, y: 4 }],
    row_rotation_1: [{ x: 6, y: 2 }, { x: 5, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 2 }],
    bottomsquare_rotation_1: [{ x: 4, y: 2 }],
    row_rotation_2: [{ x: 5, y: 4 }, { x: 5, y: 3 }, { x: 5, y: 2 }, { x: 5, y: 1 }],
    bottomsquare_rotation_2: [{ x: 4, y: 3 }],
    row_rotation_3: [{ x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }],
    bottomsquare_rotation_3: [{ x: 4, y: 3 }],
};

const direction = { "NORTH": 1, "EAST": 2, "SOUTH": 3, "WEST": 4 }
Object.freeze(direction);
const movement = { "DOWN": 1, "LEFT": 2, "RIGHT": 3 }
Object.freeze(movement);


export default RichardsMiniGame;