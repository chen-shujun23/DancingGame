//melody1 = 11231
const rhythm1 = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];
//melody2 = 111321
const rhythm2 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0];
//melody3 = 11132111
const rhythm3 = [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0];

//Basic game object
const game = {
  //Method to start initialising objects, preloading assets and display start screen
  init: function () {
    //Get handler for game canvas and game context
    game.canvas = document.getElementById("gameCanvas");
    game.ctx = game.canvas.getContext("2d");

    //Inititalise objects
    level.init();
    loader.init();

    //Hide all game layers and display the start screen
    game.clearScreens();
    game.showScreen("startScreen");
  },
  //Method to clear screens
  clearScreens: function () {
    const screenArr = document.getElementsByClassName("gameLayer");
    for (let i = 0; i < screenArr.length; i++) {
      const screen = screenArr[i];
      screen.style.display = "none";
    }
  },
  //Method to hide game layer by ID
  hideScreen: function (id) {
    const screen = document.getElementById(id);
    screen.style.display = "none";
  },
  //Method to show game layer by ID
  showScreen: function (id) {
    const screen = document.getElementById(id);
    screen.style.display = "block";
  },

  //Method to show play screen
  showLevelScreen: function () {
    game.clearScreens();
    game.showScreen("levelScreen");
  },

  //Function to play audio
  playAudio: function (url) {
    const audio = new Audio(url);
    audio.play();
  },
  //Method to start game
  start: function () {
    game.clearScreens();
    game.showScreen("levelScreen");
    game.showScreen("scoreScreen");
    game.playAudio("audio/melody1.mp3");
    game.ended = false;
    // game.animationFrame = window.requestAnimationFrame(
    //   game.animate,
    //   game.canvas
    // );
  },
  handleGameLogic: function () {
    //placeholder code;
  },
  // animate: function () {
  //   game.handleGameLogic();
  //   //Draw images
  //   loader.loadImage("images/sprites.png");
  //   game.ctx.drawImage(this.image, this.imageWidth*(imageNumber),0,this.);
  // },
};

//Initialise game once page has fully loaded
window.addEventListener("load", function () {
  return game.init();
});

//=====================================================================

//Image and audio loader
const loader = {
  loaded: true,
  loadedCount: 0, //Assests that have been loaded so far
  totalCount: 0, //Total number of assets that need loading

  //Method to check for sound support and create audio tag upon initialisation
  init: function () {
    let mp3Support;
    const audio = document.createElement("audio");
    if (audio.canPlayType("audio/mpeg") === "probably") {
      mp3Support = true;
    } else {
      mp3Support = false;
      alert(
        "Your browser does not support mp3 audio. Please shift to a new browser"
      );
    }
  },
  loadSound: function (url) {
    this.loaded = false;
    this.totalCount++;
    game.showScreen("loadingScreen");
    const audio = new Audio();
    audio.addEventListener("canplaythrough", loader.itemLoaded, false);
    audio.src = url;
    return audio;
  },
  loadImage: function (url) {
    this.loaded = false;
    this.totalCount++;
    game.showScreen("loadingScreen");
    const image = new Image();
    image.addEventListener("load", loader.itemLoaded, false);
    image.src = url;
    return image;
  },
  //Method to stop listening for event type for this item already loaded
  itemLoaded: function (e) {
    e.target.removeEventListener(e.type, loader.itemLoaded, false);
    loader.loadedCount++;
    document.getElementById("loadingMessage").innerHTML =
      "Loaded " + loader.loadedCount + "of " + loader.totalCount;
    if (loader.loadedCount === loader.totalCount) {
      loader.loaded = true;
      loader.loadedCount = 0;
      loader.totalCount = 0;
      game.hideScreen("loadingScreen");
    }
  },
};

//======================================================================

//Basic level object

const level = {
  //level data
  init: function () {
    const levelScreen = document.getElementById("levelScreen");
  },
  load: function () {
    game.score = 0;
    document.getElementById("score").innerHTML = "Score: " + game.score;
    //Load the images for level
    game.spritesheet = loader.loadImage("images/sprites.png");
    //Call game to start once all assets loaded
    loader.onload = game.start;
  },
};

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
loader.loadImage("images/sprites.png");
