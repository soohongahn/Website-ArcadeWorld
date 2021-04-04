const board = document.getElementById("board");
const board_ctx = board.getContext("2d");

const roadColor = "#333533";
const carColor = "#f5cb5c";
const obstacleColor = "#cfdbd5";
let passed = false;
let point = 0;
let fallSpeed = 2;
let newGame = true;
var carID, obstacleID;

var left = false;
var right = false;

let car = {
  width: 20,
  height: 40,
  x: 125,
  y: 250,
  speed: 3
};

let obstacle2 = {
  width: 80,
  height: 30,
  x: 0,
  y: 0,
};

let obstacle1 = {
  width: 80,
  height: 30,
  x: board.width - 80,
  y: 0,
};

document.getElementById("exitButton").addEventListener("click", function(){
  window.open("list.html", target="_self");
});

document.getElementById("startButton").addEventListener("click", function(){
  startGame();
});

function reset(){
  passed = false;
  point = 0;
  fallSpeed = 1.5;
  left = false;
  right = false;

  car.speed = 2;
  car.x = 125;

  obstacle1.y = 0;
  obstacle2.y = 0;
  document.getElementById('gameover').innerHTML = "";
}

function updateCar(){
  drawAll();
  move();
}

function startGame(){
  reset();
  drawAll();
  obstacleFall();
  random_obstacle();

  carID = setInterval(function(){
    if(checkDead()){
      console.log("game over");
      clearInterval(carID);
      clearInterval(obstacleID);
      document.getElementById('gameover').innerHTML = "Game Over";
      document.getElementById("startButton").innerHTML = "retry";
      return;
    }
    point+=0.1;
    document.getElementById("score").innerHTML = Math.trunc(point);
    updateCar();
  }, 10);
}

function drawAll(){
  clearCanvas();
  drawCar();
  drawObstacle();
}

function clearCanvas(){
  board_ctx.fillStyle = roadColor;
  board_ctx.fillRect(0, 0, board.width, board.height);
}

function drawCar(){
  board_ctx.fillStyle = carColor;
  board_ctx.fillRect(car.x, car.y, car.width, car.height);
}

function drawObstacle(){
  board_ctx.fillStyle = obstacleColor;
  board_ctx.fillRect(obstacle1.x, obstacle1.y, obstacle1.width, obstacle1.height);
  board_ctx.fillRect(obstacle2.x, obstacle2.y, obstacle2.width, obstacle2.height);
}

function move(){
  if(left){
    if(car.x > 0){
      car.x -= car.speed;
      if(car.x < 0) car.x = 0;
    }
  }
  if(right){
    if(car.x < board.width - car.width){
      car.x += car.speed;
      if(car.x > board.width - car.width) car.x = board.width - car.width;
    }
  }
  return;
}

document.onkeydown = function(e){
  if(e.keyCode == 37) left = true;
  if(e.keyCode == 39) right = true;
}

document.onkeyup = function(e){
  if(e.keyCode == 37) left = false;
  if(e.keyCode == 39) right = false;
}

function random_obstacle(){
  var num = (Math.floor(Math.random() * ((board.width - car.width) - 0) ) + 0);
  num = (num - (num%10));
  obstacle2.width = num;
  obstacle1.x = num + (car.width *5);
  obstacle1.width = board.width - obstacle1.x;
  drawAll();
  passed = false;
  return;
}

function obstacleFall(){
  random_obstacle();
  point += 5;
  if(fallSpeed < 3.5) fallSpeed += .1;
  if(car.speed < 4) car.speed += .2;
  obstacleID = setInterval(function(){
    if(obstacle1.y > board.height){
      passed = true;
      obstacle1.y = 0;
      obstacle2.y = 0;
      clearInterval(obstacleID);
      obstacleFall();
    }
    obstacle1.y += fallSpeed;
    obstacle2.y += fallSpeed;
    drawAll();
  }, 10);
}

function checkDead(){
console.log("car.left: " + car.x + " obs2.x: " + obstacle2.width);
console.log("car.right: " + (car.x+car.width) + " obs1.x: " + obstacle1.x);
  if(Math.trunc(obstacle1.y + obstacle1.height) >= car.y && Math.trunc(obstacle1.y) < (car.y+car.height)){
    if(car.x < obstacle2.width || (car.x+car.width) > obstacle1.x){
      return true;
    }
  }
  return false;
}
