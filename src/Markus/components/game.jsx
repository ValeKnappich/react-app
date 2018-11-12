import React, { Component } from "react";
import Column from "./column";
import Modal from "./modal";
import '../basic.css';

class MarkusMiniGame extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 }
      ],
      playerColor: "yellow",
      winner: "blanc",
      draw: false
    };
    this.columns = [];
    for (let i = 0; i <= 6; i++) {
      this.columns[i] = React.createRef();
    }
    this.modal = React.createRef();
    this.gameArray = [];
    this.buttonEnabled = [true, true, true, true, true, true, true];
    this.setGameArray = this.setGameArray.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
    this.getTriangleColor = this.getTriangleColor.bind(this);
    this.checkVertical = this.checkVertical.bind(this);
    this.checkHorizontal = this.checkHorizontal.bind(this);
    this.checkDiagonal = this.checkDiagonal.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.setWinner = this.setWinner.bind(this);
    this.displayWinner = this.displayWinner.bind(this);
    this.colorToGerman = this.colorToGerman.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.checkDraw = this.checkDraw.bind(this);
  }

  setWinner(color) {
    this.setState({ winner: color });
  }

  setGameArray() {
    for (let i = 0; i <= 6; i++) {
      this.gameArray[i] = this.columns[i].current.fieldArray;
    }
    console.log(this.gameArray);
    console.log(this.state.winner);
  }

  switchPlayer() {
    if (this.state.playerColor === "red") {
      this.setState({ playerColor: "yellow" });
    }
    if (this.state.playerColor === "yellow") {
      this.setState({ playerColor: "red" });
    }
    return this.state.playerColor;
  }

  getTriangleColor() {
    let classes = "triangleButton_";
    classes += this.state.playerColor === "red" ? "red" : "yellow";
    return classes;
  }

  displayWinner() {
    let classes = "winner_";
    classes += this.state.winner;
    return classes;
  }

  checkVertical(columnIndex, fieldIndex) {
    let color = this.gameArray[columnIndex][fieldIndex];
    if (fieldIndex >= 3) {
      return false;
    } else {
      for (let i = 1; i <= 3; i++) {
        if (this.gameArray[columnIndex][fieldIndex + i] !== color) {
          return false;
        } else {
          continue;
        }
      }
    }
    return true;
  }

  checkHorizontal(columnIndex, fieldIndex) {
    let color = this.gameArray[columnIndex][fieldIndex];
    let counter = 1;
    let left = 1;
    let right = 1;
    while (
      columnIndex - left >= 0 &&
      this.gameArray[columnIndex - left][fieldIndex] === color
    ) {
      counter++;
      left++;
    }
    while (
      columnIndex + right <= 6 &&
      this.gameArray[columnIndex + right][fieldIndex] === color
    ) {
      counter++;
      right++;
    }
    if (counter < 4) {
      return false;
    } else {
      return true;
    }
  }

  checkDiagonal(columnIndex, fieldIndex) {
    let color = this.gameArray[columnIndex][fieldIndex];
    let counterLeftUp = 1;
    let counterLeftDown = 1;
    let left = 1;
    let right = 1;
    let up = 1;
    let down = 1;

    //check upper left to lower right
    while (
      columnIndex - left >= 0 &&
      fieldIndex - up >= 0 &&
      this.gameArray[columnIndex - left][fieldIndex - up] === color
    ) {
      counterLeftUp++;
      left++;
      up++;
    }
    while (
      columnIndex + right <= 6 &&
      fieldIndex + down <= 5 &&
      this.gameArray[columnIndex + right][fieldIndex + down] === color
    ) {
      counterLeftUp++;
      right++;
      down++;
    }

    // check lower left to upper right
    left = 1;
    right = 1;
    up = 1;
    down = 1;
    while (
      columnIndex - left >= 0 &&
      fieldIndex + down <= 5 &&
      this.gameArray[columnIndex - left][fieldIndex + down] === color
    ) {
      counterLeftDown++;
      left++;
      down++;
    }
    while (
      columnIndex + right <= 6 &&
      fieldIndex - up >= 0 &&
      this.gameArray[columnIndex + right][fieldIndex - up] === color
    ) {
      counterLeftDown++;
      right++;
      up++;
    }

    if (counterLeftUp < 4 && counterLeftDown < 4) {
      return false;
    } else {
      return true;
    }
  }

  checkWin(columnIndex, fieldIndex) {
    let vertical = this.checkVertical(columnIndex, fieldIndex);
    let horizontal = this.checkHorizontal(columnIndex, fieldIndex);
    let diagonal = this.checkDiagonal(columnIndex, fieldIndex);
    if (vertical || horizontal || diagonal) {
      return true;
    } else {
      return false;
    }
  }

  checkDraw() {
    let check = false;
    for (let k = 0; k <= 6; k++) {
      check = check || this.buttonEnabled[k];
    }
    if (check === false) {
      this.setState({ draw: true });
    }
  }

  colorToGerman() {
    let color = this.state.winner === "red" ? "Rot" : "Gelb";
    return color;
  }

  resetAll() {
    this.setState({ playerColor: "yellow", winner: "blanc", draw: false });
    for (let i = 0; i <= 6; i++) {
      this.columns[i].current.resetFields();
      this.buttonEnabled[i] = true;
    }
  }

  render() {
    return (
      <div className="game">
        {this.state.columns.map(column => (
          <Column
            key={column.id}
            id={column.id}
            ref={this.columns[column.id]}
            getTriangleColor={this.getTriangleColor}
            switchPlayer={this.switchPlayer}
            color={this.state.playerColor}
            setGameArray={this.setGameArray}
            checkWin={this.checkWin}
            setWinner={this.setWinner}
            checkDraw={this.checkDraw}
            buttonEnabled={this.buttonEnabled}
          />
        ))}
        <Modal
          ref={this.modal}
          resetAll={this.resetAll}
          colorToGerman={this.colorToGerman}
          displayWinner={this.displayWinner}
          winner={this.state.winner}
          draw={this.state.draw}
        />
      </div>
    );
  }
}

export default MarkusMiniGame;

