//===============================
//Global variables
//===============================

//The music tempo is 120 beats per minute (bpm)
//Each melody is 2 seconds long and has 1 bar of 4 notes. 1 note = 4 quarter-notes.
//Hence, each rhythm array has 16 quarter-notes.
//Each quarter-note takes 0.125 seconds

const rhythm1 = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];
const rhythm2 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0];
const rhythm3 = [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0];

//Iterate throught the rhythm arrays to get the precise timing the player must hit to score
//An array of precise rhythm timings for the 1st melody
const rhythm1TimingArr = [];
for (let i = 0; i < 16; i++) {
  if (rhythm1[i] === 1) {
    //Add 4seconds as 4seconds in is when player's turn for melody 1 starts
    //Mulitply by 0.125 as each quarter-note takes 0.125seconds
    const timing = 4 + (i + 1) * 0.125;
    rhythm1TimingArr.push(timing);
  }
}
//An array of precise rythm timings for the 2nd melody
const rhythm2TimingArr = [];
for (let i = 0; i < 16; i++) {
  if (rhythm2[i] === 1) {
    //Add 8seconds as 8seconds in is when player's turn for melody 2 starts
    const timing = 8 + (i + 1) * 0.125;
    rhythm2TimingArr.push(timing);
  }
}
//An array of precise rythm timings for the 3rd melody.
const rhythm3TimingArr = [];
for (let i = 0; i < 16; i++) {
  if (rhythm3[i] === 1) {
    //Add 16seconds as 16seconds in is when player's turn for melody 3 starts
    const timing = 12 + (i + 1) * 0.125;
    rhythm3TimingArr.push(timing);
  }
}
//Combine all the arrays to get a combined array of precise timings
//This array is used to tally against the player's result
const preciseTimingArr = [
  ...rhythm1TimingArr,
  ...rhythm2TimingArr,
  ...rhythm3TimingArr,
];

console.log(preciseTimingArr);

//===============================
//Root game object
//===============================

//Initialise game once page has fully loaded
window.addEventListener("load", function () {
  return game.init();
});

const game = {
  //Method to start initialising objects, preloading assets and display start screen
  init: function () {
    //Inititalise other objects' properties
    instruction.init();
    level.init();
    scoreboard.init();
    ending.init();

    //Hide all game layers and display the start screen
    game.clearScreens();
    game.showScreen("startScreen");
  },

  //Game starts when player clicks Play
  //The starting screen is cleared and the main playing screen(i.e. level screen) appears
  //All assets assigned to the level screen are loaded
  //Scoreboard is shown and the score updates as player plays
  //Winning/losing screen shown at the end
  start: function () {
    game.clearScreens();
    game.showScreen("levelScreen");
    game.showScreen("scoreScreen");
    level.load();
    scoreboard.updateScore();
    ending.winLose();
  },

  //Method to show the instructions when player clicks Menu
  //At the end of the video instruction, the screen refreshes to the starting screen
  instruct: function () {
    instruction.load();
    instruction.refreshScreen();
    game.clearScreens();
    game.showScreen("instructionScreen");
  },

  //Method to clear all screens
  clearScreens: function () {
    const screenArr = document.getElementsByClassName("gameLayer");
    for (let i = 0; i < screenArr.length; i++) {
      const screen = screenArr[i];
      screen.style.display = "none";
    }
  },

  //Method to show game layer by ID
  showScreen: function (id) {
    const screen = document.getElementById(id);
    screen.style.display = "block";
  },
};

//===============================
//Image & audio loader object
//===============================

//Define an object 'loader' that contains
//methods that alerts player if their browser does not support mp3 audio and mp4 videos
//and load audio, image and video elements
const loader = {
  init: function () {
    if (audio.canPlayType("audio/mpeg") !== "probably") {
      alert(
        "Your browser does not support mp3 audio. Please shift to a another browser"
      );
    }
    if (video.canPlayType("audio/mpeg") !== "probably") {
      alert(
        "Your browser does not support mp4 video. Please shift to a another browser"
      );
    }
  },
  //Define a 'loadSound' method that creates new audio elements
  loadSound: function (url, id) {
    const audio = document.createElement("audio");
    audio.src = url;
    audio.id = id;
    return audio;
  },
  //Define a 'loadImage' method that creates new image elements
  loadImage: function (url, id) {
    let image = document.createElement("img");
    image.src = url;
    image.id = id;
    return image;
  },
  //Define a 'loadVideo' method that creates new video elements
  loadVideo: function (url) {
    let source = document.createElement("source");
    source.src = url;
    return source;
  },
};

//===============================
//Instructions object
//===============================

const instruction = {
  init: function () {
    instructionScreen = document.getElementById("instructionScreen");
    video = document.getElementById("video");
  },
  //Method to load the images and videos for the instructions page
  load: function () {
    videoSource = loader.loadVideo("video/instruction.mp4");
    video.appendChild(videoSource);
    enterGif = loader.loadImage("gif/enter.gif", "enterGif");
    instructionScreen.appendChild(enterGif);
  },
  //Method to refresh to first page after 7 seconds, approximately when the instructional video ends
  refreshScreen: function () {
    setTimeout(function () {
      location.reload();
    }, 7000);
  },
};

//===============================
//Level object
//===============================

const level = {
  init: function () {
    levelScreen = document.getElementById("levelScreen");
    playerImgContainer = document.getElementById("playerImg");
  },
  load: function () {
    //Load the images and audio for playing level screen
    //Assign them to the game object
    //Load instructor GIF
    game.instructorGif = loader.loadImage(
      "gif/instructor.gif",
      "instructorGif"
    );
    levelScreen.appendChild(game.instructorGif);
    //Load player images
    game.playerImg = loader.loadImage("images/player1.png");
    playerImgContainer.appendChild(game.playerImg);
    //Load the audio for level
    game.baseAudio = loader.loadSound("audio/base-audio.mp3", "baseAudio");
    levelScreen.appendChild(game.baseAudio);
    game.baseAudio.play();
  },
};

//===============================
//Scoreboard object
//===============================

const scoreboard = {
  score: 0,
  init: function () {
    scoreScreen = document.getElementById("scoreScreen");
  },
  //Method to get elapsed time between game start and user pressing enter,
  //Rounded to the nearest 0.125 second
  //Add to score if elapsed time matches precise time
  updateScore: function () {
    let startTime = Date.now();
    let URL = 1;
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        let endTime = Date.now();
        let elapsedTime = endTime - startTime;
        let roundedElapsedTime = Math.round(elapsedTime / 125) * 0.125;
        if (preciseTimingArr.includes(roundedElapsedTime)) {
          //Score dynamically updates during runtime
          let updatedScore = scoreboard.score++ + 1;
          document.getElementById("score").innerHTML =
            "Score:" + scoreboard.score + "/19";
          //Player image dynamically updates during runtime by changing the image URL
          let updatedURL = URL++ + 1;
          let player = document.getElementById("playerImg");
          player.innerHTML = '<img src="images/player' + updatedURL + '.png"/>';
        }
      }
    });
  },
};

//===============================
//Ending object
//===============================
const ending = {
  init: function () {
    winScreen = document.getElementById("winScreen");
    loseScreen = document.getElementById("loseScreen");

    //Load assets and assign them to root game object
    //Load winning screen
    ending.winnerGif = loader.loadImage("gif/winningscreen.gif", "winnerGif");
    winScreen.appendChild(ending.winnerGif);

    //Load winning cheer
    ending.cheer = loader.loadSound("audio/cheer.mp3", "cheer");
    winScreen.appendChild(ending.cheer);

    //Load losing screen
    ending.loserImg = loader.loadImage("images/losingscreen.png", "loserImg");
    loseScreen.appendChild(ending.loserImg);

    //Load losing boo
    ending.boo = loader.loadSound("audio/boo.mp3", "boo");
    loseScreen.appendChild(ending.boo);

    //Declare confetti
    JSConfetti = window.JSConfetti;
    jsConfetti = new JSConfetti();
  },

  rainConfetti: function () {
    jsConfetti.addConfetti({ confettiNumber: 1000 });
  },

  //Method to show either winning or losing screen base on the score
  winLose: function () {
    game.baseAudio.addEventListener("ended", function () {
      if (scoreboard.score > 10) {
        game.clearScreens();
        game.showScreen("winScreen");
        ending.rainConfetti();
        ending.cheer.play();
      } else {
        game.clearScreens();
        game.showScreen("loseScreen");
        ending.boo.play();
      }
    });
  },
};
