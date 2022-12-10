var map = new Array(20);
var stone = 1;
for(var i = 0; i < map.length; i++) map[i] = new Array(20);
for(var i = 0; i < 20; i++){
  for(var j = 0; j < 20; j++){
    map[i][j] = 0;
  }
}

function Get_Stone(y, x){
  if(0 > y || y > 19 || 0 > x || x > 19) console.log("ERROR");
  else if(y == null || x == null) console.log("ERROR");
  else if(map[y][x] == 1 || map[y][x] == 2) console.log("ERROR");
  else{
    map[y][x] = stone;
    colorStone(document.getElementById('Y').value, document.getElementById('X').value);
    check(y, x);
    if(stone == 1) stone = 2;
    else stone = 1;
  }
}

function check(y, x){
  var chk = 0;
  for(var i = 0; i < 5; i++){
    if(x + i < 20){
      if(map[y][x + i] == stone){
        chk++;
      }
    }
  }
  if(chk == 5){
    console.log("Win!");
    WIN();
  }

  chk = 0;
  for(var i = 0; i < 5; i++){
    if(x - i > 0){
      if(map[y][x - i] == stone){
        chk++;
      }
    }
  }
  if(chk == 5){
    console.log("Win!");
    WIN();
  }

  chk = 0;
  for(var i = 0; i < 5; i++){
    if(y + i < 20){
      if(map[y + i][x] == stone){
        chk++;
      }
    }
  }
  if(chk == 5){
    console.log("Win!");
    WIN();
  }

  chk = 0;
  for(var i = 0; i < 5; i++){
    if(y - i > 0){
      if(map[y - i][x] == stone){
        chk++;
      }
    }
  }
  if(chk == 5){
    console.log("Win!");
    WIN();
  }

  chk = 0;
  for(var i = 0; i < 5; i++){
    if(y + i < 20 && x + i < 20){
      if(map[y + i][x + i] == stone){
        chk++;
      }
    }
  }
  if(chk == 5){
    console.log("Win!");
    WIN();
  }

  chk = 0;
  for(var i = 0; i < 5; i++){
    if(y + i < 20 && x - i > 0){
      if(map[y + i][x - i] == stone){
        chk++;
      }
    }
  }
  if(chk == 5){
    console.log("Win!");
    WIN();
  }

  chk = 0;
  for(var i = 0; i < 5; i++){
    if(y - i > 0 && x + i < 20){
      if(map[y - i][x + i] == stone){
        chk++;
      }
    }
  }
  if(chk == 5){
    console.log("Win!");
    WIN();
  }

  chk = 0;
  for(var i = 0; i < 5; i++){
    if(y - i > 0 && x - i > 0){
      if(map[y - i][x - i] == stone){
        chk++;
      }
    }
  }
  if(chk == 5){
    console.log("Win!");
    WIN();
  }
  show_Map();
}

function show_Map(){
  for(var i = 1; i < 20; i++){
    console.log(map[i]);
  }
}

function WIN(){
  if(stone == 1) document.write("BLACK\n WIN!");
  else document.write("WHITE\n WIN!");
}
