import React, { Component } from "react";

class Field extends Component {
  constructor(props) {
    super();
    this.state = { color: "blanc" };
    this.setColor = this.setColor.bind(this);
  }
  render() {
    return (
      <div className="field">
        <div className={this.state.color} />
      </div>
    );
  }

  setColor(newColor) {
    this.setState({ color: newColor });
  }
}

export default Field;
