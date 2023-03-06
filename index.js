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

// Ball creation and style
const ball = document.createElement("div");
ball.style.borderRadius = "50%";
ball.style.backgroundImage = "radial-gradient(#b15e0c, #990022)";
ball.style.width = ballSize + "px";
ball.style.height = ballSize + "px";
ball.style.position = "absolute";
ball.style.top = ypos;
ball.style.left = xpos;
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
    }

    if (
      parseInt(ball.style.left) < 0 ||
      parseInt(ball.style.left) > parseInt(field.style.width) - ballSize
    ) {
      directionHor = directionHor * -1;
    }
  }, 16);
}

// ball stop function
function ballMovementStop() {
  for (let i = 0; i < intervalID + 1; i++) {
    clearInterval(i);
    field.getElementsByClassName("text")[0].innerText =
      "Mouse click to start again";
  }
}
field.addEventListener("click", ballMovementStart);
field.addEventListener("dblclick", ballMovementStop);

function positionClick(event) {
  const posX = event.clientX;
  const posY = event.clientY;
  console.log("position left " + posX);
  console.log("position top " + posY);
  const posXcorr = posX - (screen.width * 0.2) / 2;
  const posYcorr = posY - 15;
  if (posYcorr > ypos) {
    directionVer = 5;
  } else {
    directionVer = -5;
  }
  directionHor = (directionVer * (posXcorr - xpos)) / (posYcorr - ypos);
}
