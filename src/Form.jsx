import React, { Component } from "react";
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      phone_no: this.props.phone_no,
      policy_no: this.props.policy_no
    };
    this.handleChange = this.handleChange.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
  }

  handleChange(e) {
    console.log("changed");
    let student = this.state;
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addCustomer() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost:8080/");
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(this.state));
    this.props.handleFormChange(this.state);
    console.log(this.state);
    this.setState({
      name: "",
      phone_no: "",
      policy_no: ""
    });
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-success"
          data-toggle="modal"
          data-target="#insertmodel"
        >
          Add Customers
        </button>

        <div
          className="modal fade"
          id="insertmodel"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add Customers
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="Text"
                  name="name"
                  placeholder="Name"
                  className="text m-2"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <br />
                <input
                  type="Text"
                  name="phone_no"
                  placeholder="Phone No."
                  className="text m-2"
                  value={this.state.phone_no}
                  onChange={this.handleChange}
                />
                <br />
                <input
                  type="Text"
                  name="policy_no"
                  placeholder="Policy No."
                  className="text m-2"
                  value={this.state.policy_no}
                  onChange={this.handleChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={this.addCustomer}
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
