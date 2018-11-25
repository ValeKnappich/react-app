import React, {Component} from "react";
import './ValesMiniGame.css';

/*Contains ControlPanel including the following Classes*/
/*  -ControlPanel*/
/*  -Counter     */
/*  -Countdown   */

export default class ControlPanel extends Component{
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
    setRunning(){   //Wrapper-function for the Countdown
        this.recursiveDraw(3, this.props.startGame , this, "Game Running!");
    }
    recursiveDraw(number, cb, context, endMsg){     //recursive Countdown
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
            //Completely controlled by parent over props
            <span id="counter" style={{margin: "10px",color: "black"}} className="important">{this.props.count}</span>
        );
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
            <span style={{margin: "10px",color: "black"}} className="important">{this.state.secs}</span>
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