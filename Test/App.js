import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Tableview from "./Table";
import Navbar from "./Navbar";
import Form from "./Form";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      name: "",
      phone_no: "",
      policy_no: ""
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  handleFormChange(state) {
    console.log("App form change");
    let student = {
      // customer_id: state.customer_id,
      name: state.name,
      phone_no: state.phone_no,
      policy_no: state.policy_no
    };
    let students_array = [...this.state.students];

    students_array.push(student);
    console.log("old state", this.state.students);

    this.setState({
      students: students_array
      // name: "",
      // phone_no: "",
      // policy_no: ""
    });
    console.log("new state", this.state.students);
  }
  handleTableChange(json) {
    console.log("App Table changed");
    this.setState({
      students: json
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div>
            <Navbar />
          </div>
          <div className="m-3">
            <Form
              name={this.state.name}
              phone_no={this.state.phone_no}
              policy_no={this.state.policy_no}
              handleFormChange={this.handleFormChange}
            />
          </div>
          <div className="m-3">
            <Tableview
              students={this.state.students}
              handleTableChange={this.handleTableChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
