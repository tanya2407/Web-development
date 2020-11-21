//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
//const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//const items = ["Buy Food", "Cook Food", "Eat Food"];
//const workItems = [];
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser:true, useUnifiedTopology:true })

//create schema
const itemSchema = new mongoose.Schema({
  name : String
});

//create mongoose model based on the Schema("singular vesion of collection", schema)
const Item = mongoose.model("Item",itemSchema);

//default items
const item1 = new Item({
  name: "Cook"
});

const item2 = new Item({
  name: "Read"
});

const defaultItems = [item1,item2];
// model.insertMany([...],callback)
// Item.insertMany(defaultItems,function(err){
//   if(err){console.log(err);}
//   else{console.log("Inset Success!");}
// });

const listSchema ={
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List",listSchema);

app.get("/", function(req, res) {

  Item.find({},function(err,foundItems){
    if(foundItems.length === 0){
      //model.insertMany([...],callback)
      Item.insertMany(defaultItems,function(err){
        if(err){console.log(err);}
        else{console.log("Inset Success!");}
      });
      res.redirect("/");
    }
    else{
    //console.log(foundItems.name);
    res.render("list", {listTitle: "Today", newListItems: foundItems});}
  });

  //res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  }
  else{
    List.findOne({name: listName},function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    });
  }


});

app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    if(listName === "Today"){
      Item.findByIdAndRemove(checkedItemId,function(err){
        if(err){console.log(err);}
        else{console.log("delete successful");}
        res.redirect("/");
      });
    }
    else{
      List.findOneAndUpdate({name: listName},{
        $pull: {items: {_id: checkedItemId}}
      },function(err,foundList){
        if(!err){
          res.redirect("/"+listName);
        }
      });
    }

});

// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });

//dynamic routing -> enabled by express route parameters
app.get("/:customListName",function(req,res){
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name:customListName},function(err,foundList){
    if(!err){
      if(!foundList){
        //create a list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/"+customListName);
      }
      else{
        // show the list
        res.render("list",{listTitle: foundList.name, newListItems: foundList.items})
      }
    }
  });


});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
