import React, { Component } from "react";
//import Counter from "./Counter";
class Navbar extends Component {
  state = {};
  render() {
    const navbarstyle = {
      color: "white"
    };
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" style={navbarstyle}>
            Navbar
          </a>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
