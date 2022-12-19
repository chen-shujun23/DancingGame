//melody1 = 11231
const rhythm1 = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];
//melody2 = 111321
const rhythm2 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0];
//melody3 = 11132111
const rhythm3 = [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0];

// //This function will be called once the page loads completely
// const pageLoaded = () => {
//   //Start initialising objects, preloading assets and display start screen
//   //Create game object with key-value pairs that saves references to game
//   const game = {
//     function init:() {
//       const canvas = document.querySelector("canvas");
//       const ctx = canvas.getContext("2d");
//       //Hide all game layers and display the start screen
//       hideScreens();
//       showScreen("#startScreen");
//     }
//   }
// };

//Function to start initialising objects, preloading assets and display start screen
function init() {
  const canvas = document.querySelector("#gameCanvas");
  const ctx = canvas.getContext("2d");
  //Hide all game layers and display the start screen
  clearScreens();
  showScreen("startScreen");
}

//Iterate through all the game layers and set their display to none
function clearScreens() {
  const screenArr = [document.querySelectorAll("gameLayer")];
  for (let i = 0; i <= screen.length; i++) {
    const screen = screenArr[i];
    screen.style.display = "none";
  }
}
//Function to hide game layer by ID
function hideScreen(id) {
  const screen = document.getElementById(id);
  screen.style.display = "none";
}

//Function to show game layer by ID
function showScreen(id) {
  const screen = document.getElementById(id);
  screen.style.display = "block";
}

//Function to play audio
function playAudio(id) {
  const audio = document.getElementById(id);
  audio.play();
}

//Initialise game once page has fully loaded
window.addEventListener("load", init);

console.log("no bug");

// //Get sprites
// const spriteSheet = document.querySelector("#sprite-sheet");
// //DRAWING code here:
// // Draw a sprite from the sprite sheet onto the canvas
// // context.drawImage(
// //   spriteSheet,
// //   x,
// //   y,
// //   width,
// //   height,
// //   canvasX,
// //   canvasY,
// //   width,
// //   height
// // );
