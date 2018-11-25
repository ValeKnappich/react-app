import React, {Component} from "react";
import ReactDOM from "react-dom";
import './popup.css'

//Usage: message: String       Nachricht, die über das Popup angezeigt wird (Zeilenumbruch durch \n)
//
//       buttons: 2D-Array     Definiert, welche und wie viele Buttons im Popup sein sollen.
//                             Schema:   [["button1Text",onclick1Function],["button2Text",onclick2Function]]
//
//       input: boolean        default: false. Entscheidet, ob ein Eingabefeld im Popup sein soll.
//                             Zugriff auf den Inhalt z.B. über document.getElementById('popup_input').value

function openPopup(message, buttons, input=false) {
    ReactDOM.render(<Popup message={message} buttons={buttons} input={input}/>, document.getElementById('popup_container'));
}

class Popup extends Component{
    render(){
        //create buttons' html tags from given button information
        const buttons = this.props.buttons.map((button, index)=><button type="button" key={button[0]} className="button" id={"popup_button_" + index} onClick={button[1]} style={{height: "3rem"}}>{button[0]}</button>);
        //render input-field?
        //const input = this.props.input ? <input id="popup_input" type="text"/> : null;
        //Workaround for an animation
        setTimeout(()=>{document.getElementsByClassName("popup")[0].classList.add("popup_visible"); },1);
        return (
            <form className="popup" onSubmit={this.props.buttons[this.props.buttons.length-1][1]}>
                <div style={{fontSize: "larger", fontWeight: "bold", whiteSpace: "pre-wrap", textAlign: "center"}}>{this.props.message}</div>
                <div style={{display: 'flex', width: '100%'}}>{buttons}</div>
            </form>
        );
    }
    componentDidMount(){
        const input = document.getElementById('popup_input');
        if(input !== null)input.focus();
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