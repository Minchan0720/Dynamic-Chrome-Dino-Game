// Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


// Images
var img1 = new Image();
img1.src = './imgs/cactus.png';

var img2 = new Image();
img2.src = './imgs/dino-basic.png';


// Dino
var dino = {
    x : 400,
    y : 400,
    width : 90,
    height : 100,
    draw(){
      ctx.fillStyle = 'green';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      // 공룡 이미지
      ctx.drawImage(img2, this.x, this.y)
    }
}


// Cactus
class Cactus {
  constructor(){
    this.x = 2000;
    this.y = 430;
    this.width = 35;
    this.height = 70;
  }
  draw(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y)
  }
}


// Functions
var timer = 0;
var cactuss = [];
var jumpTimer = 0;
var animation;


// Animation
function frameGo(){
    animation = requestAnimationFrame(frameGo)
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height);

    if (timer % 120 === 0){
      var cactus = new Cactus();
      cactuss.push(cactus);
    }

    cactuss.forEach((a, i, o)=>{
      if (a.x < 0){
        o.splice(i, 1)
      }

      // 선인장 움직임 속도
      // a.x-=4;

      crash(dino, a);
      
      a.draw();
    })

    // 점프중일때 실행
    if (jumping == true){
        dino.y -= 4;
        jumpTimer++;
    }
    // 점프중이 아닐때 실행
    if (jumping == false){
      if (dino.y < 400){
        dino.y+=4; 
      }
    }
    // 타이머가 30
    if (jumpTimer > 30){
        jumping = false;
        jumpTimer = 0;
    }

    dino.draw();
}
frameGo();


// Crash Check
function crash(dino, cactus){
  // 공룡의 x값 - 선인장의 x값 & 공룡의 y값 - 선인장의 y값
  var xDifferent = cactus.x - (dino.x + dino.width);
  var yDifferent = cactus.y - (dino.y + dino.height);
  // 위의 값이 0 이하일때 실행
  if (xDifferent <= 0 && yDifferent <= 0){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    cancleAnimationFrame(animation)
  }
}


// Jump Animation
var jumping = false;
// 스페이스바 눌렀을때 실행
document.addEventListener('keydown', function(e){
  if (e.code === 'Space'){
    jumping = true;
  }
})