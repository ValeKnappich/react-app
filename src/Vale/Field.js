import React, {Component} from "react";
import {settings} from './ValesMiniGame'
import './ValesMiniGame.css';


export default class Field extends Component{
    constructor(){
        super();
        this.tiles = React.createRef();
    }
    render(){
        let tiles = [];
        let count = 1;
        let i = 0;
        //loop to create array with html tags, including linebreaks (hr)
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
            do {    //Prevent, that the active tile is the same twice in a row
                tileNumber = Math.floor(Math.random() * (settings.dimension * settings.dimension-1));
            }while(tileNumber === this.props.app.state.lastActiveTile);
            this.props.app.state.lastActiveTile = tileNumber;
            let tiles = document.getElementsByClassName('Tile');
            try {
                //Workaround to make animation look smooth
                callingTile.style.background = "#EFDA51";       //Same color as activeTile
                callingTile.classList.remove('activeTile');
                setTimeout(()=>{
                    let callingTile = document.getElementById(this.props.tileNumber);
                    callingTile.style.transform = "";
                    callingTile.style.background = "#466496";
                },300);            //Half of the time defined in css property transition, so the color changes in the middle of the animation
                callingTile.style.transform = "rotateX(180deg)";
                tiles[tileNumber+1].classList.add("activeTile");
                this.props.increaseCounter();
            }catch(e){}
        }
    }
}
