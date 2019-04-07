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
      customers: [],

      name: "",
      phone_no: "",
      policy_no: ""
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleDeleteData = this.handleDeleteData.bind(this);
    this.handelUpdatedata = this.handelUpdatedata.bind(this);
  }
  handleFormChange(state) {
    console.log("App form change");
    let student = {
      name: state.name,
      phone_no: state.phone_no,
      policy_no: state.policy_no
    };
    let students_array = [...this.state.customers];

    students_array.push(student);
    console.log("old state", this.state.customers);

    this.setState({
      customers: students_array
    });
    console.log("new state", this.state.customers);
  }
  handleTableChange(json) {
    console.log("App Table changed");
    this.setState({
      customers: json
    });
  }
  handleDeleteData(customer) {
    console.log("removing", customer.name);
    var updated_array = this.state.customers.filter(function(cus) {
      return cus.policy_no != customer.policy_no;
    });
    this.setState({ customers: updated_array });
    console.log("update state is ", updated_array);
  }
  handelUpdatedata(old_data, new_data) {
    console.log("updating... old data", old_data);
    console.log("new data", new_data);
    var main_array = this.state.customers;
    var index = main_array.findIndex(
      x => x.customer_id === old_data.customer_id
    );
    var updated_array = main_array.filter(function(customer) {
      main_array[index].name = new_data.name;
      main_array[index].phone_no = new_data.phone_no;
      main_array[index].policy_no = new_data.policy_no;
      return customer;
    });
    console.log("index", index);
    console.log("updated arayy", updated_array);
    this.setState({
      customers: updated_array
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
              handleDeleteData={this.handleDeleteData}
              customers={this.state.customers}
              handleTableChange={this.handleTableChange}
              handelUpdatedata={this.handelUpdatedata}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
