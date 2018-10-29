import React, {Component} from "react";
import ReactDOM from "react-dom";
import './popup.css'

function openPopup(message, buttons, input=false) {
    ReactDOM.render(<Popup message={message} buttons={buttons} input={input}/>, document.getElementById('popup_container'));
}

class Popup extends Component{
    render(){
        //create buttons' html tags from given button information
        const buttons = this.props.buttons.map((button, index)=><button type="button" key={button[0]} className="button" id={"popup_button_" + index} onClick={button[1]} style={{height: "3rem"}}>{button[0]}</button>);
        //render input-field?
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
        if(input !== null)input.focus();    //prefocus
        document.getElementById("root").style.opacity = "0.3";
        //Make popup close, when clicked next to the popup
        //click Listener on document
        this.documentEventListener = document.getElementById('root').addEventListener("click", ()=>{
            const cancelButton = document.getElementById('popup_button_0');
            if(cancelButton!==null)cancelButton.click();
        });
    }
    componentWillUnmount(){
        document.getElementById('root').style.opacity = 1;
        document.removeEventListener("click",this.documentEventListener);
    }
}

export default openPopup;