let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d'); // context 란 뜻으로 ctx

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let dino = {
    x: 50,
    y: 200,
    width: 40,
    height: 50,
    draw() {
        ctx.drawImage(dinoImg, this.x, this.y);
    }
}

class Cactus {
    constructor() {
        this.width = 40 + getRandomInt(-3, 4);
        this.height = 50 + getRandomInt(-3, 4);
        this.x = 500;
        this.y = 250 - this.height;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let timer = 0;
let cactusArr = [];
let gameState = 0; // 0: end, 1: start
let jumpState = 0; // 0: default, 1: jumping
let jumpTimer = 0;
let animation;
let life = 5;
let score = 0;
let dinoImg =   new Image();
dinoImg.src = 'dino.png';

function frameAction() {
    animation = requestAnimationFrame(frameAction);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timer += 1;
    
    if(timer % 110 == 0){
        let cactus = new Cactus();
        cactusArr.push(cactus);
    }
    cactusArr.forEach((a, i, o)=>{
        if(a.x < 0){
            o.splice(i, 1);
            score += 10;
            document.querySelector('#score').innerHTML = score;
        } else if(collisionDetection(dino, a) < 0){
            o.splice(i, 1);
        }
        
        a.x -= 4;
        a.draw();
    })    

    if(jumpState == 1){
        jumpTimer++; 
        dino.y -= 4.5;
    }
    if(jumpTimer > 50){
        jumpState = 0;
        jumpTimer = 0;
    }
    if(jumpState == 0){
        if(dino.y < 200){
            dino.y += 5.5;
        }
    }

    drawLine();
    dino.draw();
}

document.addEventListener('keydown', (e)=>{
    if(e.code == 'Space'){
        if(gameState == 0){
            gameState = 1; // 게임실행
            frameAction();
            document.querySelector('h2').style.display = 'none';
        } else if(gameState == 1 && jumpState !== 1){ // 게임실행중이고 점프 상태가 아닐 때만 스페이스 눌림 처리
            jumpState = 1; // 점프중으로 변경
        }
    }
})

function collisionDetection(dino, cactus){
    // Dino와 Cactus 간 충돌 여부를 확인합니다.
    if (
        dino.x < cactus.x + cactus.width && dino.x + dino.width > cactus.x && dino.y < cactus.y + cactus.height && dino.y + dino.height > cactus.y
    ) {
        // 충돌 시 실행되는 코드
        life--;
        document.querySelector('#life').innerHTML = life;
        if (life <= 0) {
            alert('게임오버');
            gameState = 0;
            cancelAnimationFrame(animation);
            location.reload(); // 게임 종료 후 새로고침
        }
        return true; // 충돌이 발생함을 알립니다.
    } else {
        return false; // 충돌이 발생하지 않음을 알립니다.
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function drawLine(){
    ctx.beginPath();
    ctx.moveTo(0, 250);
    ctx.lineTo(600, 250);
    ctx.stroke();
}
