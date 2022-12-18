//create lights
//animate lights
//see if match on beat
//reaction - audio visual

//melody1 = 11231
const rhythm1 = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];
//melody2 = 111321
const rhythm2 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0];
//melody3 = 11132111
const rhythm3 = [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0];

//This function will be called once the page loads completely
const pageLoaded = () => {
  // alert("Hello Player!");
  //Get a handle to the canvas object
  const canvas = document.querySelector("canvas");
  //Get the 2d context for this canvas
  //2d context objects provide methods to draw game elements on screen
  const ctx = canvas.getContext("2d");
  //Get sprites
  const spriteSheet = document.querySelector("#sprite-sheet");
  //DRAWING code here:
  // Draw a sprite from the sprite sheet onto the canvas
  // context.drawImage(
  //   spriteSheet,
  //   x,
  //   y,
  //   width,
  //   height,
  //   canvasX,
  //   canvasY,
  //   width,
  //   height
  // );
  const createRow = () => {};
};

console.log("no bug");
