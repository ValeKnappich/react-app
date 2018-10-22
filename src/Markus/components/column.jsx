import React, { Component } from "react";
import Field from "./field";

class Column extends Component {
  constructor(props) {
    super();
    this.state = {
      fields: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 }
      ],
      enabled: true
    };

    this.fields = [];
    for (let i = 0; i <= 5; i++) {
      this.fields[i] = React.createRef();
    }
    this.fieldArray = [];
    for (let i = 0; i <= 5; i++) {
      this.fieldArray[i] = "blanc";
    }
    this.handleTurn = this.handleTurn.bind(this);
    this.getLastBlanc = this.getLastBlanc.bind(this);
    this.displayTriangleColor = this.displayTriangleColor.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  resetFields() {
    for (let i = 0; i <= 5; i++) {
      this.fieldArray[i] = "blanc";
      this.fields[i].current.setColor("blanc");
    }
    this.setState({ enabled: true });
  }

  getLastBlanc() {
    let i = 0;
    for (; i <= 5; i++) {
      if (this.fields[i].current.state.color !== "blanc") {
        break;
      }
    }
    return i - 1;
  }

  handleTurn() {
    if (this.getLastBlanc() <= 5 && this.getLastBlanc() >= 0) {
      //sets the color in the field component
      this.fields[this.getLastBlanc()].current.setColor(this.props.color);

      //sets the color in the game Array to compare with the rules
      this.fieldArray[this.getLastBlanc()] = this.props.color;
      this.props.setGameArray();

      //enables button
      if (this.getLastBlanc() === 0) {
        this.setState({ enabled: false });
        this.props.buttonEnabled[this.props.id] = false;
        this.props.checkDraw();
      }

      //ckeck if player wins or if its a draw
      let win = this.props.checkWin(this.props.id, this.getLastBlanc());
      if (win) {
        this.props.setWinner(this.props.color);
      }

      //switches the player color
      this.props.switchPlayer();
    }
  }

  displayTriangleColor() {
    let classes =
      this.state.enabled === true
        ? this.props.getTriangleColor()
        : "triangleButton_gray";
    return classes;
  }

  render() {
    return (
      <div className="column">
        <button
          onClick={this.handleTurn}
          className={this.displayTriangleColor()}
          id={this.props.id}
        />
        {this.state.fields.map(field => (
          <Field
            ref={this.fields[field.id]}
            key={field.id}
            color={field.color}
            id={field.id}
          />
        ))}
      </div>
    );
  }
}

export default Column;
