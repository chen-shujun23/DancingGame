//create lights
//animate lights
//see if match on beat
//reaction - audio visual

//This function will be called once the page loads completely
const pageLoaded = () => {
  alert("Hello Player!");

  //Get a handle to the canvas object
  const canvas = document.querySelector("#myCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //Get the 2d context for this canvas
  //2d context objects provide methods to draw game elements on screen
  const ctx = canvas.getContext("2d");

  //Drawing code here:
};

const createRow = () => {};

//Audio
//rythm 1: 11231
//rythm 2: 111321
//rythm 3: 11132111
