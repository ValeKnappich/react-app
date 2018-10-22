import React, { Component } from "react";

class Modal extends Component {
  constructor(props) {
    super();
    this.state = { reset: false };
    this.display = this.display.bind(this);
  }

  display() {
    let display = this.props.winner === "blanc" ? "none" : "block";
    return display;
  }

  render() {
    let modal = document.getElementById("myModal");
    let btn = document.getElementById("close");
    if (this.props.winner !== "blanc" || this.props.draw === true) {
      modal.style.display = "block";
      btn.onclick = function() {
        modal.style.display = "none";
      };
    }
    if (this.props.draw === false) {
      return (
        <div id="myModal" className="modal">
          <div className={this.props.displayWinner()}>
            <p>Spieler {this.props.colorToGerman()} gewinnt!!!</p>
            <button onClick={this.props.resetAll} id="close">
              OK
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="myModal" className="modal">
          <div className="draw">
            <p>Unentschieden!</p>
            <button onClick={this.props.resetAll} id="close">
              OK
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Modal;
