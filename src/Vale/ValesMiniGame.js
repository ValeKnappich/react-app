//React
import React, { Component } from 'react';
import './ValesMiniGame.css';
//Components
import {Table, TableRow, TableHeader} from 'grommet';
import '../../node_modules/grommet-css';
import ReactDOM from "react-dom";
import openPopup from '../ShareComponents/popup'

const settings = {dimension: 6};


export class ValesMiniGame extends Component {
    constructor(){
        super();
        this.increaseCounter = this.increaseCounter.bind(this);
        this.startGame = this.startGame.bind(this);
        this.reset = this.reset.bind(this);
        this.gameEnd = this.gameEnd.bind(this);
        this.popupwrapper = this.popupwrapper.bind(this);
        this.state = {count: 0, lastActiveTile: 0, lastCount: 0};
        this.controlPanel = React.createRef();
        this.scoreboard = React.createRef();
    }
    render() {
        return (
            <div className="App">
                {/*<button className="button" onClick={this.popupwrapper}>Popup</button>*/}
                <ControlPanel app={this} ref={this.controlPanel} startGame={this.startGame} count={this.state.count} />
                <div className="MainView">
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <Field app={this} increaseCounter={this.increaseCounter}/>
                    </div>
                    <Scoreboard ref={this.scoreboard}/>
                </div>
            </div>
        );
    }
    componentDidMount(){
        if(this.props.parent.store.vale.scoreboard_entries !== null) {
            this.scoreboard.current.setState({entries: this.props.parent.store.vale.scoreboard_entries});
        }
    }
    componentWillUnmount(){
        this.props.parent.store.vale.scoreboard_entries = this.scoreboard.current.state.entries;
    }
    increaseCounter(){
        this.setState({count: this.state.count+1});
    }
    startGame(){
        this.controlPanel.current.countDown.current.start();
        let i = Math.floor(Math.random() * 8);
        let tiles = document.getElementsByClassName("Tile");
        tiles[i].classList.add("activeTile");
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
        //Popup
        this.setState({lastCount: this.state.count});
        openPopup("You reached " + this.state.lastCount + " Points!\nEnter your name",
            [["Cancel",()=>{
                ReactDOM.unmountComponentAtNode(document.getElementById('popup_container'));
            }],["Submit",(event)=>{
                event.preventDefault();
                const input = document.getElementById('popup_input');
                this.scoreboard.current.addEntry({name: input.value === "" ? "Unnamed" : input.value, score: this.state.lastCount});
                ReactDOM.unmountComponentAtNode(document.getElementById('popup_container'));
            }]],true);
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
        this.setState({count: 0});
        //Reset Button
        document.getElementById('startButton').disabled = false;
        this.controlPanel.current.setState({buttonText: "Start Game!"});
        //Reset timer
        this.controlPanel.current.countDown.current.reset();
    }
    popupwrapper(){
        openPopup("You reached " + this.state.lastCount + " Points!\nEnter your name",
            [["Cancel",()=>{
                ReactDOM.unmountComponentAtNode(document.getElementById('popup_container'));
            }],["Submit",(event)=>{
                event.preventDefault();
                const input = document.getElementById('popup_input');
                this.scoreboard.current.addEntry({name: input.value === "" ? "Unnamed" : input.value, score: this.state.lastCount});
                ReactDOM.unmountComponentAtNode(document.getElementById('popup_container'));
            }]],true);
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
                <input type="button" id="startButton" className="ControlPanelChild button important" onClick={this.setRunning} value={this.state.buttonText} />
                <div className="ControlPanelChild"><p className="headline">Time<Countdown ref={this.countDown} time={10} onComplete={this.props.app.gameEnd}/></p></div>
                <div className="ControlPanelChild"><p className="headline">Points<Counter count={this.props.count} /></p></div>
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
            <span id="counter" style={{margin: "10px"}} className="important">{this.props.count}</span>
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
                tiles[i] = <hr key={i}/>;
                i++;
            }
            tiles[i] = <Tile ref={this.tiles.count} tileNumber={count} key={i} increaseCounter={this.props.increaseCounter} app={this.props.app}/>;
            i++;
            count++;
        }
        return(
            <div id="Field">
                {tiles}
            </div>
        );
    }
}

class Tile extends Component {
    constructor(){
        super();
        this.setActive = this.setActive.bind(this);
        this.setNormalColor = this.setNormalColor.bind(this);
    }
    render(){
        return(
            <button className="Tile" onClick={this.setActive} id={this.props.tileNumber} />
        );
    }
    setActive(){
        let callingTile = document.getElementById(this.props.tileNumber);
        if(callingTile.classList.contains('activeTile')) {      //If yellow tile gets clicked
            let tileNumber=0;
            do {
                tileNumber = Math.floor(Math.random() * (settings.dimension * settings.dimension-1));
                //tileNumber = Math.floor(Math.random() * 5);
            }while(tileNumber === this.props.app.state.lastActiveTile);
            this.props.app.state.lastActiveTile = tileNumber;
            let tiles = document.getElementsByClassName('Tile');
            try {
                callingTile.style.background = "#EFDA51";
                callingTile.classList.remove('activeTile');
                setTimeout(this.setNormalColor,300);
                callingTile.style.transform = "rotateX(180deg)";
                tiles[tileNumber+1].classList.add("activeTile");
                this.props.increaseCounter();
            }catch(e){}
        }
    }
    setNormalColor(){
        let callingTile = document.getElementById(this.props.tileNumber);
        /*callingTile.classList.remove('activeTile');*/
        callingTile.style.transform = "";
        callingTile.style.background = "#466496";
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
                <p className="headline">Highscores</p>
                <Table responsive={false}>
                    <TableHeader onSort={this.sort} labels={['Name','Score']} sortIndex={false} sortAscending={false}/>
                    <tbody>
                    {entries}
                    </tbody>
                </Table>
                {/*<input type="button" onClick={this.addDummies} value="Insert dummies"/>*/}
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
        return <TableRow key={key}><td>{entry.name}</td><td>{entry.score}</td></TableRow>;
    }
    addEntry(entry){
        let tmp_entries = this.state.entries == null ? [] : this.state.entries;
        tmp_entries.push({name: entry.name, score: entry.score});
        this.sort();
        this.setState({entries: tmp_entries});
    }
    sort(){
        let tmp_entries = this.state.entries == null ? [] : this.state.entries;
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
            <span style={{margin: "10px"}} className="important">{this.state.secs}</span>
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