// Data definition
window.width;
let directionHor = 5;
let directionVer = 5;
const ballSize = 50;
const field = document.getElementById("app");
field.style.width = screen.width * 0.8 + "px";
field.style.height = screen.height * 0.8 + "px";
const ballPosition = ([xpos, ypos] = [0, 0]);
console.log(screen.height);
let intervalID;
let ballColors = ["#00aa00", "#aa0000", "#00aaaa", "#0000aa", "#aaaa00"];

// Ball creation and style
const ball = document.createElement("div");
ball.style.borderRadius = "50%";
ball.style.backgroundImage = `radial-gradient(${ballColors.toString()})`;
ball.style.width = ballSize + "px";
ball.style.height = ballSize + "px";
ball.style.position = "absolute";
ball.style.top = ypos;
ball.style.left = xpos;
ball.className = "ball";
field.appendChild(ball);

// ball movement start function

function ballMovementStart(event) {
  field.getElementsByClassName("text")[0].innerText =
    "Double tap to stop, single tap to change direction";
  positionClick(event);
  clearInterval(intervalID);
  intervalID = setInterval(() => {
    ypos = ypos + 1 * directionVer;
    xpos = xpos + 1 * directionHor;

    ball.style.top = ypos + "px";
    ball.style.left = xpos + "px";

    if (
      parseInt(ball.style.top) > parseInt(field.style.height) - ballSize ||
      parseInt(ball.style.top) < 0
    ) {
      directionVer = directionVer * -1;
      ballColors.push(ballColors[0]);
      ballColors.shift();
      ball.style.backgroundImage = `radial-gradient(${ballColors.toString()})`;
    }

    if (
      parseInt(ball.style.left) < 0 ||
      parseInt(ball.style.left) > parseInt(field.style.width) - ballSize
    ) {
      directionHor = directionHor * -1;
      ballColors.push(ballColors[0]);
      ballColors.shift();
      ball.style.backgroundImage = `radial-gradient(${ballColors.toString()})`;
    }
  }, 16);
}

// ball stop function
function ballMovementStop() {
  clearInterval(intervalID);
  field.getElementsByClassName("text")[0].innerText =
    "Tap or click to start again";
  // }
}
field.addEventListener("click", ballMovementStart);
field.addEventListener("dblclick", ballMovementStop);

function positionClick(event) {
  // Getting click global position

  const posX = event.clientX;
  const posY = event.clientY;

  //  Correction of click position in correspondence to field size and position
  const posXcorr = posX - (screen.width * 0.2) / 2;
  const posYcorr = posY - 15;
  // Setting of ball movement angle and direction

  if (posYcorr > ypos) {
    directionVer = 5;
  } else {
    directionVer = -5;
  }
  directionHor = (directionVer * (posXcorr - xpos)) / (posYcorr - ypos);

  //  Unifying ball speed at every click position
  const ballSpeed = (directionHor ** 2 + directionVer ** 2) ** 0.5;
  directionHor = (directionHor * 7) / ballSpeed;
  directionVer = (directionVer * 7) / ballSpeed;
}
