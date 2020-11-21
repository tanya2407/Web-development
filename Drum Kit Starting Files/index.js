/*
//document.querySelector("button").addEventListener("click",handleClick)

or
//anonymous function
document.querySelector("button").addEventListener("click",function (){
  alert("I got Clicked!")
});

*/

for(var i =0;i<document.querySelectorAll(".drum").length;i++){
  document.querySelectorAll(".drum")[i].addEventListener("click",handleClick);
}

function switch_key(key){
  switch (key) {
    case "w":
      var tom1 = new Audio('sounds/tom-1.mp3');
      tom1.play();
    break;
    case "a":
      var tom2 = new Audio('sounds/tom-2.mp3');
      tom2.play();
    break;
    case "s":
      var tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
    break;
    case "d":
      var tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
    break;
    case "j":
      var snare = new Audio('sounds/snare.mp3');
      snare.play();
    break;
    case "k":
      var crash = new Audio('sounds/crash.mp3');
      crash.play();
    break;
    case "l":
      var kick = new Audio('sounds/kick-bass.mp3');
      kick.play();
    break;

    default: console.log(key);

  }
}

function handleClick(){
  //console.log(this.innerHTML)  // returns <button class="a drum">a</button>
  var buttonInnerHTML = this.innerHTML;
  switch_key(buttonInnerHTML);
  buttonAnimation(buttonInnerHTML);
}
// var audio = new Audio('sounds/tom-1.mp3');
// audio.play();

document.addEventListener("keypress",handleKeyboard);

function handleKeyboard(event){
  switch_key(event.key);
  buttonAnimation(event.key);
}

/*
document.addEventListener("keypress",function(event){
  switch_key(event.key);
});
*/

function buttonAnimation(currentKey){
  var activeButton = document.querySelector("."+currentKey);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed")
  }, 100 );
}
