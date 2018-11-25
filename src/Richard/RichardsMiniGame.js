import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
//Richard ist nice

const Board_HEIGHT = 20;
const Board_WIDTH = 10;
const DEADLINE_X = 9;
const DEADLINE_Y = 19;
let rotation = 0;


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
        /*this.printShape_rotation_0 = this.printShape_rotation_0.bind(this);
        this.printShape_rotation_1 = this.printShape_rotation_1.bind(this);
        this.printShape_rotation_2 = this.printShape_rotation_2.bind(this);
        this.printShape_rotation_3 = this.printShape_rotation_3.bind(this);*/
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
        this.state = { currentShape: [], currentShape_rotation_1: [], currentShape_rotation_2: [], currentShape_rotation_3: [] };
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
                    this.printNewShape_rotation_0(shapes.row_rotation_0);
                    this.setShape_rotation_1(shapes.row_rotation_1);
                    this.setShape_rotation_2(shapes.row_rotation_2);
                    this.setShape_rotation_3(shapes.row_rotation_3);


                    this.setNewBottomSquare_rotation_0(shapes.bottomsquare_rotation_0);
                }} />
                <input type="button" value="Rotate" onClick={() => {
                    this.rotateShape();
                }} />
                <input type="button" value="Left" onClick={() => {
                    if (this.checkBorder()) {
                        if (!this.checknextfieldactive()) {
                            this.moveShape("left");
                            console.log("Move left");
                            console.log(rotation);
                        }
                    }
                }} />
                <input type="button" value="Right" onClick={() => {
                    if (this.checkBorder()) {
                        if (!this.checknextfieldactive()) {
                            this.moveShape("right");
                        }
                    }
                }} />
                <input type="button" value="Down" onClick={() => {
                    if (this.checkBorder()) {
                        console.log(this.checkBorder());

                        if (!this.checknextfieldactive()) {

                            console.log(this.checknextfieldactive());

                            this.moveShape("down");
                        }
                    }
                }} />
                <input type="button" value="Coorinates Console" onClick={() => {
                    console.log(this.getShape_rotation_0_Coordinates());
                    console.log(this.getShape_rotation_1_Coordinates());
                    console.log(this.getShape_rotation_2_Coordinates());
                    console.log(this.getShape_rotation_3_Coordinates());
                }} />
                <input type="button" value="Print all CurrentShapes" onClick={() => {
                    this.clear(this.getShape_rotation_0_Coordinates());
                    this.clear(this.getShape_rotation_1_Coordinates());
                    this.clear(this.getShape_rotation_2_Coordinates());
                    this.clear(this.getShape_rotation_3_Coordinates());
                }} />


                <header className="Board-header">
                    {RichardsMiniGame}
                </header>
            </div>
        )
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


    /*printShape_rotation_0() {
        let tmp_currentShape = [];
        let shape = this.getShape_rotation_0_Coordinates();
        for (let i = 0; i < this.state.currentShape.length; i++) {
            this.activateSquare(shape[i].x, shape[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[shape[i].x][shape[i].y].current;
        }
        this.setState({ currentShape: tmp_currentShape });
    }
    printShape_rotation_1() {
        let tmp_currentShape = [];
        let shape = this.getShape_rotation_1_Coordinates();
        for (let i = 0; i < this.state.currentShape_rotation_1.length; i++) {
            this.activateSquare(shape[i].x, shape[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[shape[i].x][shape[i].y].current;
        }
        this.setState({ currentShape_rotation_1: tmp_currentShape });
    }
    printShape_rotation_2() {
        let tmp_currentShape = [];
        let shape = this.getShape_rotation_2_Coordinates();
        for (let i = 0; i < this.state.currentShape_rotation_2.length; i++) {
            this.activateSquare(shape[i].x, shape[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[shape[i].x][shape[i].y].current;
        }
        this.setState({ currentShape_rotation_2: tmp_currentShape });
    }
    printShape_rotation_3() {
        let tmp_currentShape = [];
        let shape = this.getShape_rotation_3_Coordinates();
        for (let i = 0; i < this.state.currentShape_rotation_3.length; i++) {
            this.activateSquare(shape[i].x, shape[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[shape[i].x][shape[i].y].current;
        }
        this.setState({ currentShape_rotation_3: tmp_currentShape });
    }*/
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
        //let newCurrentShape_rotation_1 = [];
        //let newCurrentShape_rotation_2 = [];
        //let newCurrentShape_rotation_3 = [];
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
            newCurrentShape[i] = this.RichardsMiniGame[x][y].current;
        }

        //Move Current Shape Rotation 1
        let newCurrentShape_rotation_1 = []
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
            newCurrentShape_rotation_1[i] = this.RichardsMiniGame[x][y].current;
        }

        //Move Current Shape Rotation 2
        let newCurrentShape_rotation_2 = []
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
            newCurrentShape_rotation_2[i] = this.RichardsMiniGame[x][y].current;
        }

        //Move Current Shape Rotation 3
        let newCurrentShape_rotation_3 = []
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
            newCurrentShape_rotation_3[i] = this.RichardsMiniGame[x][y].current;
        }
        //Clear all activate Shapes
        this.clear(this.getShape_rotation_0_Coordinates());
        this.clear(this.getShape_rotation_1_Coordinates());
        this.clear(this.getShape_rotation_2_Coordinates());
        this.clear(this.getShape_rotation_3_Coordinates());

        //Set all States
        this.setState({ currentShape: newCurrentShape, currentShape_rotation_1: newCurrentShape_rotation_1, currentShape_rotation_2: newCurrentShape_rotation_2, currentShape_rotation_3: newCurrentShape_rotation_3 }, () => { this.printShape(rotation); });

        /*let newCurrentShape = [];
        let newCurrentShape_rotation_1 = [];
        let newCurrentShape_rotation_2 = [];
        let newCurrentShape_rotation_3 = [];
        console.log(rotation);
        console.log(direction);
        // Move 0 rotation Shape
        for (let i = 0; i < this.state.currentShape.length; i++) {
            let square_rotation_0 = this.state.currentShape[i];
            let x = square_rotation_0.props.coordinatex;
            let y = square_rotation_0.props.coordinatey;
            if (direction === "down") {
                y++;
            }
            if (direction === "left") {
                x--;
            }
            if (direction === "right") {
                x++;
            }
            newCurrentShape[i] = this.RichardsMiniGame[x][y].current;
        }
        this.clear(this.getShape_rotation_0_Coordinates());

        if (rotation === 0) {
            this.setState({ currentShape: newCurrentShape }, this.printShape_rotation_0);
            console.log("Set State and Print");
        } else { this.setState({ currentShape: newCurrentShape }) }

        // Move 1 rotation Shape
        for (let i = 0; i < this.state.currentShape_rotation_1.length; i++) {
            let square_rotation_1 = this.state.currentShape_rotation_1[i];
            let x = square_rotation_1.props.coordinatex;
            let y = square_rotation_1.props.coordinatey;
            if (direction === "down") {
                y++;
            }
            if (direction === "left") {
                x--;
            }
            if (direction === "right") {
                x++;
            }
            newCurrentShape_rotation_1[i] = this.RichardsMiniGame[x][y].current;
        }
        this.clear(this.getShape_rotation_1_Coordinates());

        if (rotation === 1) {
            this.setState({ currentShape: newCurrentShape_rotation_1 }, this.printShape_rotation_1);
        } else { this.setState({ currentShape: newCurrentShape_rotation_1 }) }

        // Move 2 rotation Shape
        for (let i = 0; i < this.state.currentShape_rotation_2.length; i++) {
            let square = this.state.currentShape_rotation_2[i];
            let x = square.props.coordinatex;
            let y = square.props.coordinatey;

            if (direction === "down") {
                y++;
            }
            if (direction === "left") {
                x--;
            }
            if (direction === "right") {
                x++;
            }
            newCurrentShape_rotation_2[i] = this.RichardsMiniGame[x][y].current;
        }
        this.clear(this.getShape_rotation_2_Coordinates());
        this.setState({ currentShape_rotation_2: newCurrentShape_rotation_2 });
        for (let i = 0; i < this.state.currentShape_rotation_3.length; i++) {
            let square = this.state.currentShape_rotation_3[i];
            let x = square.props.coordinatex;
            let y = square.props.coordinatey;
            if (direction === "down") {
                y++;
            }
            if (direction === "left") {
                x--;
            }
            if (direction === "right") {
                x++;
            }
            newCurrentShape_rotation_3[i] = this.RichardsMiniGame[x][y].current;
        }
        this.clear(this.getShape_rotation_3_Coordinates());
        this.setState({ currentShape_rotation_3: newCurrentShape_rotation_3 });
    }*/
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

export default RichardsMiniGame;