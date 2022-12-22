//===============================
//Game global variables
//===============================

const rhythm1 = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];
const rhythm2 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0];
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
//Main game object
//===============================

//Initialise game once page has fully loaded
window.addEventListener("load", function () {
  return game.init();
});

const game = {
  //Method to start initialising objects, preloading assets and display start screen
  init: function () {
    //Inititalise objects
    instruction.init();
    level.init();
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

  //Method to show game layer by ID
  showScreen: function (id) {
    const screen = document.getElementById(id);
    screen.style.display = "block";
  },

  //Method to show instruction
  instruct: function () {
    instruction.load();
    instruction.refreshScreen();
    game.clearScreens();
    game.showScreen("instructionScreen");
  },

  //Method  to start game
  start: function () {
    game.clearScreens();
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

//Loader method for loading assets
const loader = {
  init: function () {
    let mp3Support;
    if (audio.canPlayType("audio/mpeg") === "probably") {
      mp3Support = false;
      alert(
        "Your browser does not support mp3 audio. Please shift to a another browser"
      );
    }
    let mp4Support;
    if (video.canPlayType("audio/mpeg") === "probably") {
      mp4Support = false;
      alert(
        "Your browser does not support mp4 video. Please shift to a another browser"
      );
    }
  },
  loadSound: function (url, id) {
    const audio = document.createElement("audio");
    audio.src = url;
    audio.id = id;
    return audio;
  },
  loadImage: function (url, id) {
    let image = document.createElement("img");
    image.src = url;
    image.id = id;
    return image;
  },
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
  load: function () {
    videoSource = loader.loadVideo("video/instruction.mp4");
    video.appendChild(videoSource);
    enterGif = loader.loadImage("gif/enter.gif", "enterGif");
    instructionScreen.appendChild(enterGif);
  },
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
    let URL = 1;
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

console.log("no bug");
