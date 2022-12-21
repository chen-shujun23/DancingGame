const game = {
  score: 0,
  getRoundedElapsedTime: function () {
    let startTime = Date.now();
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        let endTime = Date.now();
        let elapsedTime = endTime - startTime;
        let roundedElapsedTime = Math.round(elapsedTime / 125) * 0.125;
        console.log(roundedElapsedTime);
        if (preciseTimingArr.includes(roundedElapsedTime)) {
          let updatedScore = ++game.score;
          console.log(`Your score is ${updatedScore}`);
        } else {
          console.log("You missed!");
        }
      }
    });
  },
};
