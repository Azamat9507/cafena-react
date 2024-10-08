//@ts-nocheck
import React, { useState, Component }from "react";

class Car extends Component {
    constructor(props) {
      super(props);
      this.state = {
        brand: "Ford",
        model: "Mustang",
        color: "red",
        year: 1964
      };
    }
    changeColor = () => {
      this.setState({color: "blue", model: "Tesla", year: 1843});
    };

    componentDidMount() {
        console.log("run componentDidmount");
        // runs after first render = RETRIEVE DATA FROM BACKEND SERVER
    }

    componentWillUnmount() {
        console.log("run componentWillUnmount");
        // runs after component unmount
    }

    componentDidUpdate() {
        
    }


    render() {
      return (
        <div>
          <h1>My {this.state.brand}</h1>
          <p>
            It is a {this.state.color} - {this.state.model} - from {" "}
            {this.state.year}.
          </p>
          <button
            type="button"
            onClick={this.changeColor}
          >Change color</button>
        </div>
      );
    }
  }

  export default Car;