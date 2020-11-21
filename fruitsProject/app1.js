//Accessing MONGO DB using "MONGOOSE"
const mongoose = require('mongoose');

//connect to mongo db Database
//port that can access database server/db name -> if doesnt exist then will create new database
mongoose.connect("mongodb://localhost:27017/fruitsDB",{useUnifiedTopology:true,useNewUrlParser:true});

//create schema
const fruitSchema = new mongoose.Schema({
  //name: String,
  name: {
    type : String,
    required : [true,"Plese check your data entry, no name specified."]
  },
  //rating: Number,
  rating: {
    type: Number,
    min : 1,
    max : 10
  },
  review: String
});

//use this schema to create a mongoose model
//(create a new collection)
//will convert "Fruit" to "fruits" on it own
const Fruit = mongoose.model("Fruit",fruitSchema);

//create fruit document
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Nice!"
});

//save the fruit document in the Fruits collection inside fruitsDB database
//fruit.save();

const personSchema = new mongoose.Schema({
  name: String ,
  age : Number,
  favouriteFruit : fruitSchema
});


const pineapple = new Fruit({
  name: "pineapple",
  rating: 9,
  review : "I love it!"
});

//pineapple.save();

const Person = mongoose.model("Person",personSchema);
const person = new Person({
  name: "Amy",
  age: 23,
  favouriteFruit : pineapple
});

//person.save();

//Add many fruit
const kiwi = new Fruit({
  name:"kiwi",
  rating :10,
  review: "Best fruit"
});

const orange = new Fruit({
  name: "orange",
  rating: 4,
  review:"Too sour for me!"
});

const banana = new Fruit({
  name: "banana",
  rating : 8,
  review:"I love it!"
});

//save in bulk (array of obj that match the particular schema, callback)
// Fruit.insertMany([kiwi,orange,banana],function(err){
//   if(err){
//     consol.log(err);
//   }
//   else{
//     console.log("successfully saved all the fruits.")
//   }
// });

// READING from Database
Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close();
    //console.log(fruits);
    fruits.forEach(function(f){
      console.log(f.name);
    });
  }
});

const mango = new Fruit({
  name: "Mango",
  rating: 9,
  review : "you will love it!"
});

mango.save();

Person.updateOne({name: "John"},{favouriteFruit:mango},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Update successful");
  }
})
