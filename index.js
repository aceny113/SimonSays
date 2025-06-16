var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var isShowingSequence = false;
var level = 0;

function startGame() {
  if (!started) {
    $("#level-title").text("level: " + level);
    nextSequence();
    started = true;
  }
}

$(document).keypress(startGame);

$(document).on("touchstart", startGame);


$(".btn").click(function () {
  if (isShowingSequence) return;
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  playSounds(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickPattern.length - 1);
});


function nextSequence() {
  userClickPattern = [];
  level++;
  $("#level-title").text("level: " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gamePattern.push(randomColor);
  showSequence(0);
}

function showSequence(index) {
  isShowingSequence = true;
  if (index < gamePattern.length) {
    setTimeout(function () {
      var color = gamePattern[index];
      $("#" + color)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
      playSounds(color);
      showSequence(index + 1);
    }, 600);
  } else {
    setTimeout(function () {
      isShowingSequence = false;
    }, 600);
  }
}


function playSounds(currentButton) {
  var audio = new Audio("sounds/" + currentButton + ".mp3");
  audio.play();
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickPattern[currentlevel]) {
    console.log("success");
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong!");

    if (level >= 5) {
      var jumpscareAudio = new Audio("sounds/bulaga-main.mp3");
      jumpscareAudio.play();

      $("#bulaga").fadeIn(100);

      setTimeout(function () {
        $("#bulaga").fadeOut(200);
      }, 5000);
    } else {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
    }

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("You were wrong! Press any key to try again");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
