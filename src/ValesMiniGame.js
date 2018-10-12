//React
import React, { Component } from 'react';
import './App.css';
//Components
import {Table, TableRow, TableHeader} from 'grommet';
import '../node_modules/grommet-css';

const settings = {dimension: 6};

export class ValesMiniGame extends Component {
    constructor(){
        super();
        this.increaseCounter = this.increaseCounter.bind(this);
        this.startGame = this.startGame.bind(this);
        this.reset = this.reset.bind(this);
        this.gameEnd = this.gameEnd.bind(this);
        this.state = {count: 0};
        this.controlPanel = React.createRef();
        this.scoreboard = React.createRef();
    }
    render() {
        return (
            <div className="App">
                <ControlPanel app={this} ref={this.controlPanel} startGame={this.startGame} count={this.state.count} />
                <Field increaseCounter={this.increaseCounter}/>
                <Scoreboard ref={this.scoreboard}/>
            </div>
        );
    }
    increaseCounter(){
        this.setState((state) => {
            return {count: state.count + 1}
        });
    }
    startGame(){
        //ControlPanel
        this.controlPanel.current.countDown.current.start();
        //Game Logic
        let i = Math.floor(Math.random() * 8);
        let tiles = document.getElementsByClassName("Tile");
        tiles[i].classList.add("activeTile");
        //Reactivate Tiles if 2nd round
        for(let i=0;i<settings.dimension*settings.dimension; i++){
            tiles[i].disabled = false;
        }
    }
    gameEnd(){
        const tiles = document.getElementsByClassName('Tile');
        for(let i=0;i<settings.dimension*settings.dimension; i++){
            tiles[i].disabled = true;
        }
        this.controlPanel.current.setState({buttonText: "Game Over!"});
        let entered_name = prompt("You reached "+this.state.count+" Points!\nEnter your Name to save your Score!");
        if(entered_name === "" || entered_name === null){
            entered_name = "Unnamed";
            this.scoreboard.current.addEntry({name: entered_name, score: this.state.count});
        }
        this.reset();
    }
    reset(){
        //Deactivate active Tile
        let tiles = document.getElementsByClassName('Tile');
        for(let i=0; i<settings.dimension*settings.dimension; i++){
            if(tiles[i].classList.contains('activeTile')){
                tiles[i].classList.remove('activeTile');
            }
        }
        //Reset counter
        this.setState((state) => {
            return {count: 0}
        });
        //Reset Button
        document.getElementById('startButton').disabled = false;
        this.controlPanel.current.setState({buttonText: "Start Game!"});
        //Reset timer
        this.controlPanel.current.countDown.current.reset();
    }
}

class ControlPanel extends Component{
    constructor(){
        super();
        this.state = {buttonText: "Start Game!"};
        this.setRunning = this.setRunning.bind(this);
        this.countDown = React.createRef();
    }
    render(){
        return(
            <div className="ControlPanel">
                <input type="button" id="startButton" onClick={this.setRunning} value={this.state.buttonText} />
                <div className="counterContainer"><p className="headline">Time</p><Countdown ref={this.countDown} className="Countdown" time={10} onComplete={this.props.app.gameEnd}/></div>
                <div className="counterContainer"><p className="headline">Points</p><Counter count={this.props.count} /></div>
            </div>
        );
    }
    setRunning(){
        this.recursiveDraw(3, this.props.startGame , this, "Game Running!");
    }
    recursiveDraw(number, cb, context, endMsg){
        const startButton = document.getElementById('startButton');
        if(startButton!=null){
            startButton.disabled = true;
        }
        let text = number === 0 ? endMsg : number;
        context.setState(() => {
            return {buttonText: text};
        });
        if(number === 0){
            cb();
        }else {
            setTimeout((() => {context.recursiveDraw(number - 1, cb, context, endMsg)}), 1000);
        }
    }
}

class Counter extends Component{
    render(){
        return(
            <span id="counter" >{this.props.count}</span>
        );
    }
}

class Field extends Component{
    constructor(){
        super();
        this.tiles = React.createRef();
    }
    render(){
        let tiles = [];
        let count = 1;
        let i = 0;
        while(count <= settings.dimension*settings.dimension){
            if(count % settings.dimension === 1 && i!==0){
                tiles[i] = <br key={i}/>;
                i++;
            }
            tiles[i] = <Tile ref={this.tiles.count} tileNumber={count} key={i} increaseCounter={this.props.increaseCounter}/>;
            i++;
            count++;
        }

        return(
            <div className="Field">
                {tiles}
            </div>
        );
    }
}

class Tile extends Component {
    constructor(props){
        super();
        this.setActive = this.setActive.bind(this);
    }
    render(){
        return(
            <button className="Tile" onClick={this.setActive} id={this.props.tileNumber}/>
        );
    }
    setActive(){
        //Random images
        let images = ["./rich.jpg", "img1.jpeg"];

        let i = Math.floor(Math.random() * (settings.dimension*settings.dimension-1));
        let callingTile = document.getElementById(this.props.tileNumber);
        let tiles = document.getElementsByClassName('Tile');
        let active = document.getElementsByClassName('activeTile')[0];
        if(callingTile.classList.contains('activeTile')) {      //If yellow tile gets clicked
            try {
                active.classList.remove('activeTile');
                tiles[i].classList.add("activeTile");
                tiles[i].setAttribute('background',"url('" + images[Math.round(Math.random())] + "') no-repeat !important");
                console.log("url('" + images[Math.round(Math.random())] + "') no-repeat !important");
                this.props.increaseCounter();
            }catch(e){}
        }
    }
}

class Scoreboard extends Component{
    constructor(){
        super();
        this.state = {entries: []};
        this.addEntry = this.addEntry.bind(this);
        this.sort = this.sort.bind(this);
        this.addHtml = this.addHtml.bind(this);
        this.addDummies = this.addDummies.bind(this);
    }
    render(){
        let entries = [];
        for(let i=0; i<this.state.entries.length; i++){
            entries[i] = this.addHtml(this.state.entries[i],i);
        }
        return(
            <div className="Scoreboard">
                <p className="counterContainer headline">Highscores</p>
                <Table responsive={true}>
                    <TableHeader onSort={this.sort} labels={['Name','Score']} sortIndex={1} sortAscending={false}/>
                    <tbody>
                    {entries}
                    </tbody>
                </Table>
                <input type="button" onClick={this.addDummies} value="Insert dummies"/>
            </div>
        );
    }
    addDummies(){
        let rndm = Math.floor(Math.random()*20);
        this.addEntry({name: "P1", score: rndm});
        this.addEntry({name: "P2", score: 2*rndm});
        this.addEntry({name: "P3", score: 3*rndm});
    }
    addHtml(entry, key){
        console.log(this.state.entries);
        return <TableRow key={key}><td>{entry.name}</td><td>{entry.score}</td></TableRow>;
    }
    addEntry(entry){
        let tmp_entries = this.state.entries;
        tmp_entries.push({name: entry.name, score: entry.score});
        this.sort();
        this.setState({entries: tmp_entries});
    }
    sort(){
        console.log("sorting");
        let tmp_entries = this.state.entries;
        tmp_entries.sort(this.entryComparator);
        this.setState({entries: tmp_entries});
    }
    entryComparator(entry1, entry2){
        if(entry1.score > entry2.score)return -1;
        else if(entry1.score < entry2.score)return 1;
        else return 0;
    }
}

class Countdown extends Component{
    constructor(props){
        super();
        this.state = {secs: props.time};
        this.countDown = this.countDown.bind(this);
        this.start = this.start.bind(this);
    }
    render(){
        return(
            <span>{this.state.secs}</span>
        );
    }
    countDown(){
        if(this.state.secs === 1){
            this.props.onComplete();
        }
        else{
            this.setState({secs: this.state.secs-1});
            setTimeout(this.countDown, 1000);
        }
    }
    start(){
        this.reset();
        setTimeout(this.countDown, 1000);
    }
    reset(){
        this.setState({secs: this.props.time});
    }
}

export default ValesMiniGame;