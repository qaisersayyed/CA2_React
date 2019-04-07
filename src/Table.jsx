import React, { Component } from "react";

class Tableview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unupdated_state: [],
      customers: this.props.customers,
      tmpdata: {
        name: "",
        phone_no: "",
        policy_no: ""
      }
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  componentDidMount() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost:8080");
    xmlhttp.onload = () => {
      const incoming_data = xmlhttp.responseText;
      const json = JSON.parse(incoming_data);
      console.log("data", json);
      this.setState({ customers: json });
      this.props.handleTableChange(json);
    };
    xmlhttp.send();
  }

  handleUpdateState(customer) {
    this.setState({ unupdated_state: customer, tmpdata: customer });
  }

  updateData() {
    console.log(this.state.unupdated_state);

    this.state.unupdated_state.name = this.state.tmpdata.name;
    this.state.unupdated_state.phone_no = this.state.tmpdata.phone_no;
    this.state.unupdated_state.policy_no = this.state.tmpdata.policy_no;
    console.log("update requested..", this.state.unupdated_state);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", "http://localhost:8080/");
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(this.state.unupdated_state));
    console.log("updated in database");
    this.props.handelUpdatedata(this.state.unupdated_state, this.state.tmpdata);
  }

  deleteData(customer) {
    alert("Delete Data ?");
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", "http://localhost:8080/");
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(customer));
    console.log("deleted", customer);
    this.props.handleDeleteData(customer);
  }

  render() {
    let students = this.props.customers;
    let tabledata = students.map((s, index) => {
      var customer = s;
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{s.name}</td>
          <td>{s.phone_no}</td>
          <td>{s.policy_no}</td>
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#updatemodal"
              onClick={e => this.handleUpdateState(customer)}
            >
              Update
            </button>
          </td>
          <td>
            <button
              onClick={e => this.deleteData(customer, e)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Phone No.</th>
              <th>Policy No.</th>
            </tr>
          </thead>
          <tbody>{tabledata}</tbody>
        </table>
        <div
          className="modal fade"
          id="updatemodal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Update Customer
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
                  value={this.state.tmpdata.name}
                  onChange={e => {
                    let update_state = this.state.tmpdata;
                    update_state.name = e.target.value;
                    this.setState({
                      tmpdata: update_state
                    });
                    console.log(this.state.tmpdata);
                  }}
                />
                <br />
                <input
                  type="Text"
                  name="phone_no"
                  placeholder="Phone No."
                  className="text m-2"
                  value={this.state.tmpdata.phone_no}
                  onChange={e => {
                    let update_state = this.state.tmpdata;
                    update_state.phone_no = e.target.value;
                    this.setState({
                      tmpdata: update_state
                    });
                    console.log(this.state.tmpdata);
                  }}
                />
                <br />
                <input
                  type="Text"
                  name="policy_no"
                  placeholder="Policy No."
                  className="text m-2"
                  value={this.state.tmpdata.policy_no}
                  onChange={e => {
                    let update_state = this.state.tmpdata;
                    update_state.policy_no = e.target.value;
                    this.setState({
                      tmpdata: update_state
                    });
                    console.log(this.state.tmpdata);
                  }}
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
                  onClick={e => this.updateData(e)}
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Tableview;
