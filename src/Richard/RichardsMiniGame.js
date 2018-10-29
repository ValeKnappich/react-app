import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const Board_HEIGHT = 20;
const Board_WIDTH = 10;
const DEADLINE_X = 9;
const DEADLINE_Y = 19;


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
        this.printNewShape = this.printNewShape.bind(this);
        this.moveShape = this.moveShape.bind(this);
        this.getShapeCoordinates = this.getShapeCoordinates.bind(this);
        this.activateSquare = this.activateSquare.bind(this);
        this.activateBottomSquare = this.activateBottomSquare.bind(this);
        this.setNewBottomSquare = this.setNewBottomSquare.bind(this);
        this.setBottomSquare = this.setBottomSquare.bind(this);
        this.moveBottomSquare = this.moveBottomSquare.bind(this);
        this.checknextfieldactive = this.checknextfieldactive.bind(this);
        this.rotateShape = this.rotateShape.bind(this);
        this.rotateBottomSquare = this.rotateBottomSquare.bind(this);

        this.RichardsMiniGame = [];
        this.state = { currentShape: [] };
        this.bottom_square = { currentBottomSquare: []};
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
            for (let x = 0; x <  Board_WIDTH; x++) {
                row.push(<Square ref={this.RichardsMiniGame[x][y]} id={x + "-" + y} coordinatex={x} coordinatey={y} />);
            }
            RichardsMiniGame.push(<div className="Board-row">{row}</div>)
        }
        return (
            <div className="Board">
                <input type="button" value="start" onClick={() => {
                    this.printNewShape(shapes.row)
                }} />
                <input type="button" value="move" onClick={() => {
                    if(this.checkBorder() && !this.checknextfieldactive()){
                    this.moveShape();
                    }
                }} />
                <input type="button" value="Bottom" onClick={() => {
                    this.setNewBottomSquare(shapes.bottomsquare);
                }} />
                <input type="button" value="Check Next Field" onClick={() => {
                    this.checknextfieldactive();
                }} />
                <input type="button" value="Rotate" onClick={() => {
                    this.rotateShape();
                }} />
                <input type="button" value="Rotate" onClick={() => {
                    console.log(this.getBottomSquareCoordinates());
                }} />
                
                
                <header className="Board-header">
                    {RichardsMiniGame}
                </header>
            </div>
        )
    }
    
    activateSquare(x, y) {
        this.RichardsMiniGame[x][y].current.setState({active: true});
    }

    activateBottomSquare(x,y){
        this.RichardsMiniGame[x][y].current.setState({bottom: true});
    }

    deactivateSqare(x, y) {
        this.RichardsMiniGame[x][y].current.setState({ active: false });
        this.RichardsMiniGame[x][y].current.setState({bottom: false});
    }

    getShapeCoordinates() {
        let shape = [];
        for (let i = 0; i < this.state.currentShape.length; i++) {
            shape.push({ x: this.state.currentShape[i].props.coordinatex, y: this.state.currentShape[i].props.coordinatey });
        }
        return shape;
    }
    getBottomSquareCoordinates(){
        let square = [];
        for (let i = 0; i < this.state.currentBottomSquare.length; i++){
            square.push({x: this.state.currentBottomSquare[i].props.coordinatex, y:this.state.currentBottomSquare[i].props.coordinatey});
        }
        return square;
    }

    getBottomSquare(){
        let square = [];
        square.push({x: this.state.currentBottomSquare.props.coordinatex, y: this.state.currentBottomSquare.props.coordinatey});
        return square;
    }

    printShape() {
        let tmp_currentShape = [];
        let shape = this.getShapeCoordinates();
        for (let i = 0; i < this.state.currentShape.length; i++) {
            this.activateSquare(shape[i].x, shape[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[shape[i].x][shape[i].y].current;
        }
        this.setState({ currentShape: tmp_currentShape });
    }

    printNewShape(shape) {
        console.log("printNewShape");
        let tmp_currentShape = [];
        for (let i = 0; i < shape.length; i++) {
            this.activateSquare(shape[i].x, shape[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[shape[i].x][shape[i].y].current;
        }
        this.setState({ currentShape: tmp_currentShape });
    }

    setBottomSquare(){
        let tmp_currentShape = [];
        let square = this.getBottomSquareCoordinates();
        for (let i = 0; i < this.state.currentBottomSquare.length; i++) {
            this.activateBottomSquare(square[i].x, square[i].y);
            tmp_currentShape[i] = this.RichardsMiniGame[square[i].x][square[i].y].current;
        }
        this.setState({currentBottomSquare: tmp_currentShape});
    }

    setNewBottomSquare(square) {
        console.log("getBottomShape")
        let tmp_currentBottomShape = [];
        for (let i = 0; i < square.length; i++) {
            this.activateBottomSquare(square[i].x, square[i].y);
            tmp_currentBottomShape[i] = this.RichardsMiniGame[square[i].x][square[i].y].current;
        }
        this.setState({currentBottomSquare: tmp_currentBottomShape});
    }

    clear(shape) {
        for (let i = 0; i < shape.length; i++) {
            //if(this.RichardsMiniGame[x][y].current.state.active){this.RichardsMiniGame[x][y].current.setState({active: false});}
            this.deactivateSqare(shape[i].x, shape[i].y);
        }
    }

    checkBorder(){
    for (let i = 0; i < this.state.currentShape.length; i++){
        let square = this.state.currentShape[i];
        let x = square.props.coordinatex;
        let y = square.props.coordinatey;
        console.log(x,y);
        if (x>=0 && y>=0 && x < DEADLINE_X && y < DEADLINE_Y){
            return true;
        }
        else {return false};
        }
    }

    checknextfieldactive(){
        let nextfield = [];
        for (let i = 0; i < this.state.currentBottomSquare.length; i++){
            let square = this.state.currentBottomSquare[i];
            let x = square.props.coordinatex;
            let y = square.props.coordinatey;
            y++;
            nextfield = this.RichardsMiniGame[x][y].current;
        }
        if(nextfield.state.active){
            return true;
        }
        else {return false;}
    }

    moveBottomSquare() {
    let newCurrentBottomSquare = [];
    for (let i = 0; i < this.state.currentBottomSquare.length; i++) {
        let square = this.state.currentBottomSquare[i];
        let x = square.props.coordinatex;
        let y = square.props.coordinatey;
        y++;
        newCurrentBottomSquare[i] = this.RichardsMiniGame[x][y].current;
        }  
    this.setState({currentBottomSquare: newCurrentBottomSquare}, this.setBottomSquare);
    }

    rotateBottomSquare() {
        let newCurrentBottomSquare = [];
        for (let i = 0; i < this.state.currentBottomSquare.length; i++) {
            let square = this.state.currentBottomSquare[i];
            let x = square.props.coordinatex;
            let y = square.props.coordinatey;
            /*x = x-1;
            y = y-2;*/
            newCurrentBottomSquare[i] = this.RichardsMiniGame[x][y].current;
            }  
        this.setState({currentBottomSquare: newCurrentBottomSquare}, this.setBottomSquare);
    }

    rotateShape(){
        this.rotateBottomSquare();
        let currentShape = this.getShapeCoordinates();
        currentShape[0].x = currentShape[0].x + 2;
        currentShape[0].y = currentShape[0].y + 1;
        currentShape[1].x = currentShape[1].x + 1;
        currentShape[1].y = currentShape[1].y;
        currentShape[2].x = currentShape[2].x;
        currentShape[2].y = currentShape[2].y - 1;
        currentShape[3].x = currentShape[3].x - 1;
        currentShape[3].y = currentShape[3].y - 2;
        console.log(currentShape);
        for(let i=0;i<4;i++){
            while(currentShape[i].x < 0){
                currentShape[i].x++;
            }
            while(currentShape[i].y < 0){
                currentShape[i].y++;
            }
        }
        currentShape[0] = this.RichardsMiniGame[currentShape[0].x][currentShape[0].y].current;
        currentShape[1] = this.RichardsMiniGame[currentShape[1].x][currentShape[1].y].current;
        currentShape[2] = this.RichardsMiniGame[currentShape[2].x][currentShape[2].y].current;
        currentShape[3] = this.RichardsMiniGame[currentShape[3].x][currentShape[3].y].current;

        console.log(currentShape);
        this.clear(this.getShapeCoordinates());
        this.setState({currentShape: currentShape}, this.printShape);
    }

    moveShape() {
        this.moveBottomSquare();
        let newCurrentShape = [];
        for (let i = 0; i < this.state.currentShape.length; i++) {
        let square = this.state.currentShape[i];
        let x = square.props.coordinatex;
        let y = square.props.coordinatey;
        if(y + 1 < Board_HEIGHT){
            y++;
        }
        else{
            console.log("border is hit");
        }
        newCurrentShape[i] = this.RichardsMiniGame[x][y].current;
        }
        this.clear(this.getShapeCoordinates());
        this.setState({ currentShape: newCurrentShape }, this.printShape);
    }
}

const shapes = {
    row: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
    bottomsquare: [{x: 0, y: 3}]
};

export default RichardsMiniGame;
