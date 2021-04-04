document.getElementById("exitButton").addEventListener("click", function(){
  window.open("list.html", target="_self");
});

document.addEventListener("keydown", keypressed, false);
document.addEventListener("keyup", keyreleased, false);

const board = document.getElementById("board");
const ctx = board.getContext("2d");
const ballRadius = 10;
const boardColor = "#333533";
const ballColor = "#f5cb5c";
const padColor = "#cfdbd5";
const brickColor = "#cfdbd5";

var dx = 1.5;
var dy = -1.5;
var padSpeed = 4;
var id;
var score = 0;
var brickArray = [];
var brickRow = 3;
var brickColumn = 5;
var brickHeight = 20;
var brickWidth = 48;

var ball = {
  x: board.width/2,
  y: board.height - 40,
};

var pad = {
  x: board.width/2 - 35,
  y: board.height - 15,
  right: false,
  left: false,
  width: 70,
  height: 8,
};

document.getElementById("startButton").addEventListener("click", function(){
  fillBrickArray();
  reset();
  id = setInterval(startGame, 10);
});

function reset(){
  dx = 1.5;
  dy = -1.5;
  padSpeed = 4;
  id = 0;
  score = 0;

  pad.x = board.width/2 - 35;
  pad.y = board.height - 15;
  pad.right = false;
  pad.left = false;

  ball.x = board.width/2;
  ball.y = board.height - 40;

  document.getElementById('gameover').innerHTML = "";
}

function startGame(){
  clearCanvas();
  drawBall();
  drawPad();
  moveBall();
  movePad();
  drawAllBricks();
  checkHit();
  checkEnd();
}

function checkEnd(){
  if (score == 150){
    document.getElementById('gameover').innerHTML = "You Win!";
    clearInterval(id);
  }
}

function clearCanvas(){
  ctx.fillStyle = boardColor;
  ctx.fillRect(0, 0, board.width, board.height);
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI*2, false);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawPad(){
  ctx.beginPath();
  ctx.fillStyle = padColor;
  ctx.fillRect(pad.x, pad.y, pad.width, pad.height);
  ctx.fill();
  ctx.closePath();
}

function fillBrickArray(){
  for(var i = 0; i < brickColumn; i++){
      brickArray[i] = [];
    for(var j = 0; j < brickRow; j++){
      brickArray[i][j] = {x: 0, y: 0, hit: false};
    }
  }
}

function drawAllBricks(){
  for(var i = 0; i < brickColumn; i++){
    for(var j = 0; j < brickRow; j++){
      if(!brickArray[i][j].hit){
        brickArray[i][j].x = (i * brickWidth + ((i+1) * 10));
        brickArray[i][j].y = (j * brickHeight + ((j+1) * 15));
        drawBrick(brickArray[i][j]);
      }
    }
  }
}

function drawBrick(brick){
  ctx.beginPath();
  ctx.fillStyle = brickColor;
  ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight);
  ctx.fill();
  ctx.closePath();
}

function moveBall(){
  if(ball.x >= board.width - ballRadius || ball.x < ballRadius){
    dx = -dx;
  }
  if(ball.y < ballRadius){
    dy = -dy;
  }
  if(ball.y > board.height + ballRadius){
    clearInterval(id);
    document.getElementById('gameover').innerHTML = "Game Over";
    document.getElementById("startButton").innerHTML = "retry";
    return;
  }
  if(ball.x + ballRadius >= pad.x && ball.x - ballRadius <= pad.x + pad.width){
    if(ball.y + ballRadius > pad.y && ball.y + ballRadius < pad.y + pad.height){
      if(dy > 0 ) {
        dy = -dy;
        dx *= 1.05;
        dy *= 1.05;
      }
    }
  }
  ball.x += dx;
  ball.y += dy;
}

function movePad(){
  if(pad.left && (pad.x > 0)){
    pad.x -= padSpeed;
  } else if (pad.right && (pad.x + pad.width < board.width)){
    pad.x += padSpeed;
  }
}

function checkHit(){
  for(var i = 0; i < brickColumn; i++){
    for(var j = 0; j < brickRow; j++){
      if(!brickArray[i][j].hit){
        if(ball.x + ballRadius > brickArray[i][j].x && ball.x - ballRadius < brickArray[i][j].x + brickWidth){
          if(ball.y - ballRadius < brickArray[i][j].y + brickHeight && ball.y + ballRadius > brickArray[i][j].y){
            dy = -dy;
            brickArray[i][j].hit = true;
            score += 10;
            document.getElementById('score').innerHTML = score;
          }
        }
      }
    }
  }
}

function keypressed(e){
  switch (e.keyCode) {
    case 37:  //left
      pad.left = true;
    break;
    case 39:  //right
      pad.right = true;
    break;
  }
}

function keyreleased(e){
  switch (e.keyCode) {
    case 37:  //left
      pad.left = false;
    break;
    case 39:  //right
      pad.right = false;
    break;
  }
}
