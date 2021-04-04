var direction = 1;
var selectionColor = "#f5cb5c";
const listitem1 = document.getElementById('item1');
const listitem2 = document.getElementById('item2');
const listitem3 = document.getElementById('item3');
const listitem4 = document.getElementById('item4');
const listitem5 = document.getElementById('item5');

document.onkeydown = function (event) {
     switch (event.keyCode) {
        case 38:
          direction--;
          direction = Math.abs(direction)%5;
          if(direction == 0){direction = 5;}
          select(direction);
          break;
        case 40:
          direction++;
          direction = Math.abs(direction)%5;
          if(direction == 0){direction = 5;}
          select(direction);
          break;
        case 13:
            openGame(direction);
          break;
     }
};

function select(itemNum){
listitem1.style.color = "#e8eddf";
listitem2.style.color = "#e8eddf";
listitem3.style.color = "#e8eddf";
listitem4.style.color = "#e8eddf";
listitem5.style.color = "#e8eddf";

  switch (itemNum) {
    case 1:
      listitem1.style.color = selectionColor;
    break;
    case 2:
      listitem2.style.color = selectionColor;
    break;
    case 3:
      listitem3.style.color = selectionColor;
    break;
    case 4:
      listitem4.style.color = selectionColor;
    break;
    case 5:
      listitem5.style.color = selectionColor;
    break;
  }
}

function openGame(gameNum){
  switch (gameNum) {
    case 1:
      window.open("snake.html", target="_self");
    break;
    case 2:
      window.open("race.html", target="_self");
    break;
    case 3:
      window.open("brick.html", target="_self");
    break;
    case 4:
      window.open("about.html", target="_self");
    break;
    case 5:
      window.open("index.html", target="_self");
    break;
  }
}
