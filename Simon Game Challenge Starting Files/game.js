var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

$(document).keypress(function(){
  if(!start){
    $("#level-title").text("Level "+level);
    nextSequence();
    start =  true;
  }
});

$(".btn").click(function(){
  //var userChosenColor = this.id;
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
       }, 1000);
    }
  }
  else{
    console.log("Wrong");
    //var audio = new Audio("sounds/wrong.mp3");
    //audio.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}

function nextSequence(){
  userClickedPattern  = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed")
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
