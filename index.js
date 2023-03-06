// Data definition
window.width;
let directionHor = 1;
let directionVer = 1;
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
ball.style.bottom = ypos;
ball.style.left = xpos;
field.appendChild(ball);

// ball movement start

function ballMovementStart() {
  field.getElementsByClassName("text")[0].innerText = "Double click to stop";
  intervalID = setInterval(() => {
    ypos = ypos + 1 * directionVer;
    xpos = xpos + 1 * directionHor;

    ball.style.bottom = ypos + "px";
    ball.style.left = xpos + "px";

    if (
      parseInt(ball.style.bottom) === parseInt(field.style.height) - ballSize ||
      parseInt(ball.style.bottom) === 0
    ) {
      directionVer = directionVer * -1;
    }

    if (
      parseInt(ball.style.left) === 0 ||
      parseInt(ball.style.left) === parseInt(field.style.width) - ballSize
    ) {
      directionHor = directionHor * -1;
    }
  }, 16);
}
function ballMovementStop() {
  for (let i = 0; i < intervalID + 1; i++) {
    clearInterval(i);
    field.getElementsByClassName("text")[0].innerText =
      "Mouse click to start again";
  }
}
field.addEventListener("click", ballMovementStart);
field.addEventListener("dblclick", ballMovementStop);
