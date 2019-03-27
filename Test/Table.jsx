import React, { Component } from "react";

class Tableview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: this.props.students,
      tmpdata: [
        {
          name: "",
          phone_no: "",
          policy_no: ""
        }
      ]
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost:8080");
    xmlhttp.onload = () => {
      const incoming_data = xmlhttp.responseText;
      const json = JSON.parse(incoming_data);
      console.log("data", json);
      this.setState({ students: json });
      this.props.handleTableChange(json);
    };
    xmlhttp.send();
  }

  updateData() {
    console.log("update requested..");
  }

  deleteData(customer) {
    alert("Delete Data ?");
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", "http://localhost:8080/");
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(customer));
    console.log("deleted", customer.name);
  }
  handleChange() {
    console.log("changed");
  }

  render() {
    let students = this.props.students;
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
                  onChange={this.handleChange}
                />
                <br />
                <input
                  type="Text"
                  name="phone_no"
                  placeholder="Phone No."
                  className="text m-2"
                  value={this.state.tmpdata.phone_no}
                  onChange={this.handleChange}
                />
                <br />
                <input
                  type="Text"
                  name="policy_no"
                  placeholder="Policy No."
                  className="text m-2"
                  value={this.state.tmpdata.policy_no}
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
                  onClick={this.updateData}
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
