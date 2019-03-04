import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import Navbar from "./Navbar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div>
            <Navbar />
          </div>
          <div className="m-3">
            <Table />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
