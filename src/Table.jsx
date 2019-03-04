import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ["name", "Lname", "age"],
      rows: [
        {
          name: "qaiser",
          Lname: "sayyed",
          age: "17"
        },
        {
          name: "jonh",
          Lname: "doe",
          age: "45"
        },
        {
          name: "doe",
          Lname: "johny",
          age: "32"
        }
      ]
    };
  }

  render() {
    let rowdata = this.state.rows;
    let coldata = this.state.columns;

    let tableHeaders = (
      <thead>
        <tr>
          {coldata.map(function(column) {
            return <th key={column}>{column}</th>;
          })}
        </tr>
      </thead>
    );

    let tableBody = rowdata.map(function(row) {
      return (
        <tr key={row}>
          {coldata.map(function(column) {
            return <td>{row[column]}</td>;
          })}
        </tr>
      );
    });
    console.log(tableHeaders);
    console.log(tableBody);

    return (
      <table className="table table-bordered table-hover" width="100%">
        {tableHeaders}
        {tableBody}
      </table>
    );
  }
}

export default Table;
