//===============================
//Game global variables
//===============================

//melody1 = 11231
const rhythm1 = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];
//melody2 = 111321
const rhythm2 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0];
//melody3 = 11132111
const rhythm3 = [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0];

const rhythm1TimingArr = [];
for (let i = 0; i < 16; i++) {
  if (rhythm1[i] === 1) {
    const timing = 4 + (i + 1) * 0.125;
    rhythm1TimingArr.push(timing);
  }
}

const rhythm2TimingArr = [];
for (let i = 0; i < 16; i++) {
  if (rhythm2[i] === 1) {
    const timing = 8 + (i + 1) * 0.125;
    rhythm2TimingArr.push(timing);
  }
}

const rhythm3TimingArr = [];
for (let i = 0; i < 16; i++) {
  if (rhythm3[i] === 1) {
    const timing = 12 + (i + 1) * 0.125;
    rhythm3TimingArr.push(timing);
  }
}

const preciseTimingArr = [
  ...rhythm1TimingArr,
  ...rhythm2TimingArr,
  ...rhythm3TimingArr,
];

console.log(preciseTimingArr);

//===============================
//Game object
//===============================

//Initialise game once page has fully loaded
window.addEventListener("load", function () {
  return game.init();
});

const game = {
  //Method to start initialising objects, preloading assets and display start screen
  init: function () {
    // //Get handler for game canvas and game context
    // game.canvas = document.getElementById("canvas");
    // game.ctx = game.canvas.getContext("2d");

    //Inititalise objects
    level.init();
    // loader.init();
    scoreboard.init();
    ending.init();

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

  // //Method to hide game layer by ID
  // hideScreen: function (id) {
  //   const screen = document.getElementById(id);
  //   screen.style.display = "none";
  // },

  //Method to show game layer by ID
  showScreen: function (id) {
    const screen = document.getElementById(id);
    screen.style.display = "block";
  },

  // //Method to show play screen
  // showLevelScreen: function () {
  //   this.clearScreens();
  //   this.showScreen("levelScreen");
  // },

  //Method  to start game
  start: function () {
    game.clearScreens();
    game.showScreen("canvas");
    game.showScreen("levelScreen");
    game.showScreen("scoreScreen");
    level.load();
    scoreboard.updateScore();
    ending.winLose();
  },
};

//===============================
//Image & audio loader object
//===============================

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
  loadSound: function (url, id) {
    this.loaded = false;
    this.totalCount++;
    game.showScreen("loadingScreen");
    const audio = document.createElement("audio");
    audio.addEventListener("canplaythrough", loader.itemLoaded, false);
    audio.src = url;
    audio.id = id;
    return audio;
  },
  loadImage: function (url, id) {
    this.loaded = false;
    this.totalCount++;
    game.showScreen("loadingScreen");
    let image = document.createElement("img");
    image.addEventListener("load", loader.itemLoaded, false);
    image.src = url;
    image.id = id;
    return image;
  },

  // //Method to stop listening for event type for this item already loaded
  // itemLoaded: function (e) {
  //   e.target.removeEventListener(e.type, loader.itemLoaded, false);
  //   loader.loadedCount++;
  //   document.getElementById("loadingMessage").innerHTML =
  //     "Loaded " + loader.loadedCount + "of " + loader.totalCount;
  //   if (loader.loadedCount === loader.totalCount) {
  //     loader.loaded = true;
  //     loader.loadedCount = 0;
  //     loader.totalCount = 0;
  //     game.hideScreen("loadingScreen");
  //   }
  // },
};

//===============================
//Game level object
//===============================

const level = {
  //level data
  init: function () {
    levelScreen = document.getElementById("levelScreen");
    playerImgContainer = document.getElementById("playerImg");
  },
  load: function () {
    //Load the images for level
    //Load instructor gif
    instructorGif = loader.loadImage("gif/instructor.gif", "instructorGif");
    levelScreen.appendChild(instructorGif);

    //Load player images
    playerImg = loader.loadImage("images/player1.png");
    playerImgContainer.appendChild(playerImg);

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
    let URL = 0;
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        let endTime = Date.now();
        let elapsedTime = endTime - startTime;
        let roundedElapsedTime = Math.round(elapsedTime / 125) * 0.125;
        console.log(roundedElapsedTime);
        if (preciseTimingArr.includes(roundedElapsedTime)) {
          let updatedScore = scoreboard.score++ + 1;
          document.getElementById("score").innerHTML =
            "Score:" + scoreboard.score + "/19";
          let updatedURL = URL++ + 1;
          console.log(`URL: ${updatedURL}`);
          let player = document.getElementById("playerImg");
          player.innerHTML = '<img src="images/player' + updatedURL + '.png"/>';
          console.log(`Score : ${updatedScore}`);
        } else {
          console.log("Missed!");
        }
      }
    });
  },
};

//===============================
//Ending screen object
//===============================
const ending = {
  init: function () {
    // baseAudio = document.getElementById("baseAudio");
    winScreen = document.getElementById("winScreen");
    loseScreen = document.getElementById("loseScreen");

    //Load winning screen
    winnerGif = loader.loadImage("gif/winningscreen.gif", "winnerGif");
    winScreen.appendChild(winnerGif);

    //Load winning cheer
    ending.cheer = loader.loadSound("audio/cheer.mp3", "cheer");
    winScreen.appendChild(ending.cheer);

    //Load losing screen
    loserImg = loader.loadImage("images/losingscreen.png", "loserImg");
    loseScreen.appendChild(loserImg);

    //Declare confetti
    JSConfetti = window.JSConfetti;
    jsConfetti = new JSConfetti();
  },

  rainConfetti: function () {
    jsConfetti.addConfetti({ confettiNumber: 1000 });
  },

  winLose: function () {
    // baseAudio = getElementById("baseAudio");
    game.baseAudio.addEventListener("ended", function () {
      if (scoreboard.score > 10) {
        game.clearScreens();
        game.showScreen("winScreen");
        ending.rainConfetti();
        ending.cheer.play();
      } else {
        game.clearScreens();
        game.showScreen("loseScreen");
      }
    });
  },
};

console.log("no bug");
