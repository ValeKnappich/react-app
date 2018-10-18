import React, {Component} from "react";
import ReactDOM from "react-dom";

function openPopup(message, buttons, input=false) {
    ReactDOM.render(<Popup message={message} buttons={buttons} input={input}/>, document.getElementById('popup_container'));
}

class Popup extends Component{
    render(){
        const buttons = this.props.buttons.map((button, index)=><button type="button" key={button[0]} className="button" id={"popup_button_" + index} onClick={button[1]} style={{height: "3rem"}}>{button[0]}</button>);
        const input = this.props.input ? <input id="popup_input" type="text"/> : null;
        return (
            <form className="popup" onSubmit={this.props.buttons[this.props.buttons.length-1][1]}>
                <div style={{fontSize: "larger", whiteSpace: "pre-wrap", textAlign: "center"}}>{this.props.message}</div>
                {input}
                <div style={{display: 'flex', width: '100%'}}>{buttons}</div>
            </form>
        );
    }
    componentDidMount(){
        const input = document.getElementById('popup_input');
        if(input !== null)input.focus();
        document.getElementById("root").style.opacity = "0.3";
    }
    componentWillUnmount(){
        document.getElementById('root').style.opacity = 1;
    }
}

export default openPopup;