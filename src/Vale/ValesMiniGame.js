import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import './ValesMiniGame.css';
import Scoreboard from './Scoreboard'
import ControlPanel from './ControlPanel'
import Field from './Field'
import openPopup from '../ShareComponents/popup'

/*Top level component rendering all other Components, also */
/*  -holding the current Score, given down via props*/

export const settings = {dimension: 6};

export default class ValesMiniGame extends Component {
    constructor(){
        super();
        this.increaseCounter = this.increaseCounter.bind(this);
        this.startGame = this.startGame.bind(this);
        this.reset = this.reset.bind(this);
        this.gameEnd = this.gameEnd.bind(this);
        this.state = {count: 0, lastActiveTile: 0, lastCount: 0};
        this.controlPanel = React.createRef();
        this.scoreboard = React.createRef();
    }
    render() {
        return (
            <div className="App">
                <ControlPanel app={this} ref={this.controlPanel} startGame={this.startGame} count={this.state.count} />
                <div className="MainView">
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <Field app={this} increaseCounter={this.increaseCounter} />
                    </div>
                    <Scoreboard ref={this.scoreboard}/>
                </div>
            </div>
        );
    }
    componentDidMount(){    //Load state from parent Store when tab is changed to vale
        if(this.props.parent.store.vale.scoreboard_entries !== null) {
            this.scoreboard.current.setState({entries: this.props.parent.store.vale.scoreboard_entries});
        }
    }
    componentWillUnmount(){ //Save state to parent Store when tab is changed from vale
        this.props.parent.store.vale.scoreboard_entries = this.scoreboard.current.state.entries;
    }
    increaseCounter(){
        this.setState({count: this.state.count+1});
    }
    startGame(){
        //Starting Countdown
        this.controlPanel.current.countDown.current.start();
        //activate next yellow tile
        let i = Math.floor(Math.random() * 8);
        let tiles = document.getElementsByClassName("Tile");
        tiles[i].classList.add("activeTile");
        //Re-enable all tiles
        for(let i=0;i<settings.dimension*settings.dimension; i++){
            tiles[i].disabled = false;
        }
    }
    gameEnd(){
        //Disable all tiles
        const tiles = document.getElementsByClassName('Tile');
        for(let i=0;i<settings.dimension*settings.dimension; i++){
            tiles[i].disabled = true;
        }
        this.controlPanel.current.setState({buttonText: "Game Over!"});
        //Popup
        this.setState({lastCount: this.state.count});
        openPopup("You reached " + this.state.lastCount + " Points!\nEnter your name",
            [["Cancel",()=>{
                //Animation
                const field = document.getElementById('Field');
                field.style.transition = "transform 1s ease-in-out";
                field.style.transform = "rotateX(360deg)";
                setTimeout(()=>{field.style.transition = "";field.style.transform = "rotateX(0deg)"},1000);
                //popup
                ReactDOM.unmountComponentAtNode(document.getElementById('popup_container'));
            }],["Submit",(event)=>{
                //Animation
                const field = document.getElementById('Field');
                field.style.transition = "transform 1s ease-in-out";
                field.style.transform = "rotateX(360deg)";
                setTimeout(()=>{field.style.transition = "";field.style.transform = "rotateX(0deg)"},1000);
                //popup
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
}