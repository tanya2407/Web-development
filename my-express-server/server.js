const express = require("express");
// A func that represents express module
const app = express();

/*
3. to specify what  should happen  when a browser gets in touch
with our server and makes a get request
app.get(location->usually the route)
i.e. when someone makes a get request to our home page
A call back func tell the server ehat to do when request happens
app.get("/",function(request,response){

5. use send method to send a response
req-> request
res-> response
})
*/
app.get("/",function(req,res){
  //4. console.log(request);

  //response.send("Hello");
  // Can also send html
  res.send("<h1>Hello World!</h1>");
});

app.get("/contact",function(req,res){
    res.send("Contact me at: tanya garg@gmail.com");
});

app.get("/About",function(req,res){
  res.send("I am Tanya. I am training to become a web developer.")
});

app.get("/hobbies",function(req,res){
  res.send("<ul><li>Coffee</li><li>Sports</li></ul>")
});
//1. use app to listen on a specific port for any HTTP requests that get sent to our server.
app.listen(3000, function(){
  console.log("Server started on port 3000");
});



// Server Built :)
/*
-2. To see when our port is setup and when our server is running, we can
add a callback function to this method

-
*/
