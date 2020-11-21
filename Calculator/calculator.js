//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
/*
Has different modes like:
bodyParser.text()
.json()
.urlencoded() -> used to parse the data that comes from html form

*/

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});



app.post("/",function(req,res){

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1 + num2;

  res.send("The result of the calculation is "+result);

});

app.get("/bmicalculator",function(req,res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator",function(req,res){
  var h = parseFloat(req.body.ht);
  var w = parseFloat(req.body.wt);
  bmi = w/(h*h);
  res.send("The result of the calculation is "+bmi);

});

app.listen(3000,function(){
  console.log("Server started on port number 3000.");
});
