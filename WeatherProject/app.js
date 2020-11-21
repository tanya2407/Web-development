const express = require("express");
const https = require("https");
//No need to explicittl install as it is  native node module

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");


})

app.post("/",function(req,res){

  //console.log(req.body.cityName);
  //console.log("post recieved");


  const query = req.body.cityName;
  const apiKey = "aee05e4ae55244c30bbd4b09d8645399"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+unit;
  //const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=aee05e4ae55244c30bbd4b09d8645399&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);  //returns 200 for success

    //retreive data
    response.on("data",function(data){
      //console.log(data);
      //convert to javascript Object
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);

      const weatherDes = weatherData.weather[0].description
      console.log(weatherDes);

      const icon = weatherData.weather[0].icon
      const img_link = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      //send data to browser
      res.write("<p>The weather is currently " + weatherDes + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius </h1>");
      res.write("<img src="+img_link +">")
      res.send();
    })
  });
  //res.send("Server is up and running.");


})

app.listen(3000,function(){
  console.log("The server is running on port 3000.");
})
