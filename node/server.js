var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
//var fs = require("fs");
var mysql = require("mysql");
var con = {
  host: "localhost",
  user: "root",
  password: "",
  database: "react_ca2"
};
var cors = require("cors");
app.use(cors());
var connection = mysql.createConnection(con);
connection.connect(function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("CONNECTED TO DATABASE");
  }
});

app.post("/", function(req, res) {
  console.log("POST REQUESTED");

  console.log(req.body);
  var name = req.body.name;
  var phone_no = req.body.phone_no;
  var policy_no = req.body.policy_no;
  var sql_query =
    "INSERT INTO customer (name,phone_no,policy_no) VALUES ('" +
    name +
    "','" +
    phone_no +
    "', '" +
    policy_no +
    "')";
  console.log("RUNNING QUERY");
  connection.query(sql_query, function(error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.parse(JSON.stringify(data)));
    }
  });
  console.log("DATA INSERTED");
});

app.get("/", function(req, res, next) {
  console.log("RUNNING QUERY");

  connection.query("SELECT * FROM customer", function(err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
    console.log(result);
  });

  console.log("QUERY COMPLETE");
});

app.delete("/", function(req, res) {
  console.log("DELETEING DATA");
  var name = req.body.name;
  sql = "DELETE from customer where name ='" + name + "'";
  console.log("running query", sql);

  connection.query(sql, function(err, result) {
    if (err) throw err;
  });

  console.log("DATA DELETED!!");
});

app.listen(8080);
console.log("Server is ON");
