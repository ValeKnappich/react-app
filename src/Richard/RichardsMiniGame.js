//Reactjs import
import React, { Component } from 'react';
import ReactDOM from "react-dom";
//CSS import
import './style.css';
import '../../node_modules/grommet-css';
//ArroyKeys import
import ArrowKeysReact from 'arrow-keys-react';
//Popup import
import openPopup from '../ShareComponents/popup-tetris'
//establish the Height and Width
const Board_HEIGHT = 20;
const Board_WIDTH = 10;

const direction = { "NORTH": 1, "EAST": 2, "SOUTH": 3, "WEST": 4 }
const movement = { "DOWN": 1, "LEFT": 2, "RIGHT": 3 }
const rotationType = { "AXIS": 1, "DIAGONAL": 2 }
const colors = { "I": "grayBox", "J": "greenBox", "L": "blueBox", "O": "yellowBox", "Z": "cyanBox", "T": "redBox", "S": "pinkBox", "BLANK": "whiteBox" }
const defaultSquareClass = "square";
//With object.freeze cant change the states
Object.freeze(direction);
Object.freeze(movement);
Object.freeze(rotationType);
Object.freeze(colors);


class Counter extends Component {
    render() {
        return (
            //Completely controlled by parent over props
            <span id="counter" style={{ margin: "10px" }} className="important">{this.props.Points}</span>
        );
    }
}

class Time extends Component {
    constructor() {
        super();
        this.state = { secs: 0, gamestatus: true };
        this.timer = this.timer.bind(this);
        this.start = this.start.bind(this);
    }
    render() {
        return (
            <span id="counter" style={{ margin: "10px" }} className="important">{this.state.secs}</span>
        );
    }
    timer() {
        //Gamestatus false == Game is over
        if (this.state.gamestatus === false) {
            //Reset this timer and return the gametime
            this.reset();
            return this.state.secs;
        }
        //Gamestatus true
        this.setState({ secs: this.state.secs + 1 });
        setTimeout(this.timer, 1000);

    }
    start() {
        //start the timer
        this.reset();
        setTimeout(this.timer, 1000);
    }
    reset() {
        //reset the timer
        this.setState({ secs: 0 });
    }
}


class GameBox {
    /*
    Each square contains a Gamebox containing the most important data.
    In addition, a clone is created. The clone checks the subsequent operation. 
    If the validation can be successful, the operation will be done with the Gamebox.
    */

    constructor(xValue, yValue, directionValue, distanceValue, colorValue) {
        this.x = xValue;
        this.y = yValue;
        this.dir = directionValue;
        this.distance = distanceValue;
        this.hitBottom = false;
        this.onlyDown = false;
        this.old = [];
        this.rotation = rotationType.AXIS;
        this.color = colorValue;
    }
    //move function that get a command 
    move(command) {
        if (this.hitBottom && this.onlyDown === false) {
            return;
        }
        if (command === movement.DOWN) {
            this.y++;
        } else if (command === movement.LEFT && this.onlyDown === false) {
            this.x--;
        } else if (command === movement.RIGHT && this.onlyDown === false) {
            this.x++;
        }
    }
    //rotate function that get a command
    rotate() {
        //catches the cases that you cant rotate a set Shape
        if (this.distance === 0 || this.hitBottom) {
            return;
        }
        switch (this.rotation) {
            //There are two Types of Rotations: Diagonal and Axis
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
    //Create a Gamebox Clone Object
    clone() {
        const newBox = new GameBox(this.x, this.y, this.dir, this.distance, this.color);
        newBox.hitBottom = this.hitBottom;
        newBox.old = this;
        newBox.rotation = this.rotation;
        newBox.onlyDown = this.onlyDown;
        return newBox;
    }
}

class Square extends Component {
    /*
    The component square return in HTML construct, which represents the square in the design, also contains coordinates, color, activity and 
    */
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            style: defaultSquareClass + " " + colors.BLANK,
            coordinatex: this.props.coordinatex,
            coordinatey: this.props.coordinatey,
        };
    }
    render() {
        return (<button
            id={this.props.id}
            className={this.state.style}>
            {this.state.value}
        </button>);
    }
}

class RichardsMiniGame extends Component {
    /*
    The RichardsMiniGame component returns the entire HTML construct, which represents the board's time and points in the design
    */
    constructor() {
        super();
        this.RichardsMiniGame = [];
        this.time_ref = React.createRef();
        this.state = { boxes: [], Points: 0, gameEndText: "" };
        this.moveDownSecond = this.moveDownSecond.bind(this);
        this.udpateMoveDown = this.udpateMoveDown.bind(this);
        this.gameEnd = this.gameEnd.bind(this);
        this.openPopupBoard = this.openPopupBoard.bind(this);
        //The cases what happens when you press the keys
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
                this.udpateMoveDown();
            }
        });
        //Create references to access the square
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
        //Building the Board
        for (let y = 0; y < Board_HEIGHT; y++) {
            let row = []
            for (let x = 0; x < Board_WIDTH; x++) {
                //Push Board_Wight Sqaure Compontens in a Array
                row.push(<Square ref={this.RichardsMiniGame[x][y]} key={this.props.id} id={x + "-" + y} coordinatex={x} coordinatey={y} />);
            }
            RichardsMiniGame.push(<div className="Board-row">{row}</div>)
        }

        return (
            <div className="body-game">
                <div className="Pannel">
                    <input {...ArrowKeysReact.events} tabIndex="1" type="button" value="Start" className="ControlPanel button important" onClick={() => {
                        this.updateAddShape(this.createRandomShape());
                        this.moveDownSecond();
                        this.time_ref.current.start();
                    }} />
                    {//Displays the Time and the Points 
                    }
                    <div className="ControlPanel">
                        <p className="headline">Time
                            <Time ref={this.time_ref} />
                        </p>
                    </div>
                    <div className="ControlPanel">
                        <span className="Button_text">The more rows you delete at once, the more points you get</span>
                        <p className="headline">Points
                            <Counter Points={this.state.Points} />
                        </p>
                    </div>
                </div>
                {//Displays new Buttons and new screen resolution, to play tetris with an Smartphone 
                }
                <div className="leftSideBoard">
                    <input type="button" value="Start" className="button_direction" onClick={() => {
                        this.updateAddShape(this.createRandomShape());
                        this.moveDownSecond();
                        this.time_ref.current.start();
                    }} />
                    <input type="button" value="Down" className="button_direction" onClick={() => {
                        this.udpateMoveDown();
                    }} />
                    <input type="button" value="Left" className="button_direction" onClick={() => {
                        this.udpateMoveLeft();
                    }} />
                </div>
                <div className="rightSideBoard">
                    <input type="button" value="Right" className="button_direction" onClick={() => {
                        this.udpateMoveRight();
                    }} />
                    <input type="button" value="Rotate" className="button_direction" onClick={() => {
                        this.updateRotate();
                    }} />
                </div>
                <div className="Board-screen">
                    <header className="Board-game">
                        {//Displays the entire Board
                        }
                        {RichardsMiniGame}
                    </header>
                </div>
            </div>
        )
    }

    /*
    Following are functions that relate solely to the creation and calculation of new positions of the shapes
    */

    //Move the Shape every Second Down
    moveDownSecond() {
        this.udpateMoveDown();
        setTimeout(this.moveDownSecond, 1000);
    }

    initBoardLogic() {
        //inits the two dimensional game board array
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

    //Calculate a random number to create a random Shape 
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

    //Creating the different Shapes
    createIshape() {
        let newShape = [];
        newShape.push(new GameBox(4, 1, direction.NORTH, 1, colors.I));
        newShape.push(new GameBox(4, 2, direction.NORTH, 0, colors.I));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 1, colors.I));
        newShape.push(new GameBox(4, 4, direction.SOUTH, 2, colors.I));
        return newShape;
    }

    createJshape() {
        let newShape = [];
        newShape.push(new GameBox(5, 2, direction.EAST, 1, colors.J));
        newShape.push(new GameBox(4, 2, direction.NORTH, 0, colors.J));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 1, colors.J));
        newShape.push(new GameBox(4, 4, direction.SOUTH, 2, colors.J));
        return newShape;
    }

    createTshape() {
        let newShape = [];
        newShape.push(new GameBox(4, 1, direction.NORTH, 1, colors.T));
        newShape.push(new GameBox(4, 2, direction.NORTH, 0, colors.T));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 1, colors.T));
        newShape.push(new GameBox(5, 2, direction.EAST, 1, colors.T));
        return newShape;
    }

    createLshape() {
        let newShape = [];
        newShape.push(new GameBox(3, 2, direction.WEST, 1, colors.L));
        newShape.push(new GameBox(4, 2, direction.NORTH, 0, colors.L));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 1, colors.L));
        newShape.push(new GameBox(4, 4, direction.SOUTH, 2, colors.L));
        return newShape;
    }

    createSshape() {
        let newShape = [];
        newShape.push(new GameBox(5, 2, direction.EAST, 1, colors.S));
        newShape.push(new GameBox(4, 2, direction.NORTH, 0, colors.S));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 1, colors.S));
        const box = new GameBox(3, 3, direction.SOUTH, 1, colors.S);
        box.rotation = rotationType.DIAGONAL;
        newShape.push(box);
        return newShape;
    }

    createOshape() {
        let newShape = [];
        newShape.push(new GameBox(5, 2, direction.SOUTH, 0, colors.O));
        newShape.push(new GameBox(4, 2, direction.SOUTH, 0, colors.O));
        newShape.push(new GameBox(4, 3, direction.SOUTH, 0, colors.O));
        newShape.push(new GameBox(5, 3, direction.SOUTH, 0, colors.O));
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
        if (command === null) {
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
        this.hitBottomCheckOnlyDown(gameboard, newChildren);
    }

    hitBottomCheckOnlyDown(gameboard, newChildren) {
        //from down to up
        for (let y = Board_HEIGHT - 1; y >= 0; y--) {
            for (let x = 0; x < Board_WIDTH; x++) {
                const cell = gameboard[x][y];
                //catch Error if Shape over Board_Height
                const cellBelow = (y + 1 === Board_HEIGHT) ? null : gameboard[x][y + 1];

                if (cell != null && cell.hitBottom && cell.onlyDown && (cell.y === Board_HEIGHT - 1 || (cellBelow != null && cellBelow.hitBottom && cellBelow.onlyDown === false))) {
                    cell.onlyDown = false;
                }
            }
        }
    }

    hitBottomCheck(gameboard, boxes) {

        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            const boxBelow = box.y + 1 === Board_HEIGHT ? null : gameboard[box.x][box.y + 1];
            // if the clone hits the bottom or the next boxs is already on the bottom 
            if (box.hitBottom === false && (box.y === Board_HEIGHT - 1 || (boxBelow != null && boxBelow.hitBottom))) {
                return true;
            }
        }
        return false;
    }


    evaluate(command, boxes) {
        /*
        Evalute the new position. It will calculate with the Clone Gamebox. 
        The Gamebox contains an Array with his Childchildren (an Array which contais the other active Gameboxes)
        */
       
        let actionSuccess = true;
        let newChildren = [];
        let gameboard = this.initBoardLogic();
        this.addHitBottomBoxesToBoard(gameboard, boxes);
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            // do not evaluate if is already evaluated
            if (box.hitBottom && box.onlyDown === false) {
                continue;
            }
            const childClone = box.clone();
            this.doAction(childClone, command);
            // if the clone hit something or is out of bounds
            if (childClone.x < 0 || childClone.y < 0 || childClone.x === Board_WIDTH || gameboard[childClone.x][childClone.y] != null) {
                actionSuccess = false;
                break;
            }
            // Mark as evaluated and remember in array
            newChildren.push(childClone);
            gameboard[childClone.x][childClone.y] = childClone;
        }

        // if evaluation failed, do nothing
        if (actionSuccess === false) {
            gameboard = this.initBoardLogic();
            this.addBoxesToBoard(gameboard, boxes);
            return gameboard;
        }
        this.hitBottomDetection(gameboard, newChildren, boxes);
        
        this.checkLineFull(gameboard, newChildren, boxes);
        this.overrideOriginalsWithValues(newChildren);
        return gameboard;
    }

    updatePoints(clearRowCount) {
        let newPoints = clearRowCount * clearRowCount;
        let oldPoints = this.state.Points;
        this.setState({ Points: oldPoints + newPoints },this.gameEnd());
    }

    checkLineFull(gameboard, newChildren, boxes) {
        let rowFullCount = 0;
        let lowestFullRow = -1;
        for (let y = 0; y < Board_HEIGHT; y++) {
            let rowIsFull = this.rowIsFull(gameboard, y);
            if (rowIsFull) {
                rowFullCount++;
                if (y > lowestFullRow) {
                    lowestFullRow = y;
                }

                this.clearRow(gameboard, y, newChildren, boxes);
                this.setRowdown(gameboard, boxes);
                this.updatePoints(rowFullCount);
            }
        }
        this.setAboveBoxesToOnlyDown(gameboard, lowestFullRow);
    }

    setRowdown(gameboard, boxes){
        for (let y = 0; y < Board_HEIGHT; y++) {
            for (let x = 0; x < Board_WIDTH; x++) {
            const cell = gameboard[x][y];
            if(cell != null ){
                cell.y++;
            }
            }
        }
    }

    setAboveBoxesToOnlyDown(gameboard, yLowest) {
        for (let y = 0; y < yLowest; y++) {
            for (let x = 0; x < Board_WIDTH; x++) {
                const cell = gameboard[x][y];
                if (cell != null && cell.hitBottom) {
                    cell.onlyDown = true;
                }
            }
        }
    }

    rowIsFull(gameboard, y) {
        for (let x = 0; x < Board_WIDTH; x++) {
            const cell = gameboard[x][y];
            if (!(cell != null) || (cell != null && cell.hitBottom === false)) {
                return false;
            }
        }
        return true;
    }

    clearRow(gameboard, y, newChildren, boxes) {
        for (let x = 0; x < Board_WIDTH; x++) {
            let cell = gameboard[x][y];
            this.removeElementFromList(newChildren, cell);
            this.removeElementFromList(boxes, cell); //this.removeElementFromList(boxes, cell.old);
        }
    }

    removeElementFromList(list, element) {
        let index = list.indexOf(element);
        //The splice() method changes the contents of an array by removing existing elements and/or adding new elements.
        if (index > -1) {
            list.splice(index, 1);
        }
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
            oldChild.onlyDown = newChild.onlyDown;
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

    udpateMoveDown() {
        this.update(movement.DOWN, null);
    }

    update(command, newBoxes) {
        /*
        Updates the old Gameboxes, if the evaluation from the clone was successful 
        */
        let boxes = this.state.boxes;
        let newBoard;
        if (newBoxes != null) {
            this.addNewBoxesToBoxes(boxes, newBoxes);
            newBoard = this.initBoardLogic();
            this.addBoxesToBoard(newBoard, boxes);
        } else {
            newBoard = this.evaluate(command, boxes);
        }
        //Deactivates the old Shape and activates the new Shape
        for (let x = 0; x < newBoard.length; x++) {
            const column = newBoard[x];
            for (let y = 0; y < column.length; y++) {
                const cell = column[y];
                if (cell != null) {
                    this.activateSquare(x, y, cell.color);
                } else {
                    this.deactivateSqare(x, y);
                }
            }
        }
        //Set the new Shape in the State
        this.setState({ boxes: boxes });
    }

    addNewBoxesToBoxes(boxes, newBoxes) {
        for (let i = 0; i < newBoxes.length; i++) {
            const element = newBoxes[i];
            boxes.push(element);
        }
    }

    //Set the State Square Background with the Shape color (style)
    activateSquare(x, y, style) {
        this.RichardsMiniGame[x][y].current.setState({ style: defaultSquareClass + " " + style });
    }

    //Set the State Square Background white
    deactivateSqare(x, y) {
        this.RichardsMiniGame[x][y].current.setState({ style: defaultSquareClass + " " + colors.BLANK });
    }

    //open the Endgame Popup
    openPopupBoard() {
        //Popup
        openPopup(this.state.gameEndText + " You reached " + this.state.Points + " Points in " + this.time_ref.current.state.secs + " Seconds!",
            [["Want to play another round?", () => {
                //Set up new Game
                for (let x = 0; x < Board_WIDTH; x++) {
                    for (let y = 0; y < Board_HEIGHT; y++) {
                        this.deactivateSqare(x, y);
                    }
                }
                //Set all State of the beginning Value and Close Popup
                this.setState({ Time: 0, Points: 0, gameEndText: "" }, () => ReactDOM.unmountComponentAtNode(document.getElementById('popup_container')));
            }]], true);
    }
    //if the game is over, the Endgame Popup will pop up and shows the Points and time
    gameEnd() {
        /*
        Depending on how many points were scored, another message will be issued. 
        The State were set and afterwards the popup-function will be called with the callbackfunction 
        */
        if (this.state.Points === 0) {
            this.setState({ gameEndText: "Do you know how to play the game? Loser!" }, () => this.openPopupBoard());
        }
        else if (this.state.Points <= 10) {
            this.setState({ gameEndText: "Good" }, () => this.openPopupBoard());
        }
        else if (this.state.Points < 20 && this.state.Points > 10) {
            this.setState({ gameEndText: "Well done, are you cheating ?" }, () => this.openPopupBoard());
        }
        else {
            this.setState({ gameEndText: "You are ready for the World Championsship !" }, () => this.openPopup());
        }

    }
}

//Export the complete Game
export default RichardsMiniGame;