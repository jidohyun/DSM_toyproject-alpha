const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bird = {
  x: 50,
  y: 150,
  width: 20,
  height: 20,
  gravity: 0.5, // 중력 값을 줄여서 떨어지는 속도를 느리게 함
  lift: -10, // 리프트 값을 조정하여 날아오르는 힘을 조절
  velocity: 0,
};

const pipes = [];
const pipeWidth = 50;
const pipeGap = 150;
let frame = 0;
let score = 0;
const pipeInterval = 120; // 파이프 생성 간격을 120 프레임으로 조정

// Control the bird
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    bird.velocity = bird.lift;
  }
});

function drawBird() {
  ctx.fillStyle = "red";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, pipe.y, pipeWidth, pipe.height);
    ctx.fillRect(
      pipe.x,
      pipe.y + pipe.height + pipeGap,
      pipeWidth,
      canvas.height - pipe.height - pipeGap
    );
  }
}

function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    gameOver();
  }
}

function updatePipes() {
  if (frame % pipeInterval === 0) {
    const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
    pipes.push({ x: canvas.width, y: 0, height: pipeHeight });
  }

  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    pipe.x -= 2;

    // Remove off-screen pipes
    if (pipe.x + pipeWidth < 0) {
      pipes.splice(i, 1);
      score++;
    }

    // Check collision with pipes
    if (
      bird.x < pipe.x + pipeWidth &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.height || bird.y + bird.height > pipe.height + pipeGap)
    ) {
      gameOver();
    }
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBird();
  drawPipes();
  drawScore();
  updateBird();
  updatePipes();

  frame++;

  if (!gameOverFlag) {
    requestAnimationFrame(draw);
  }
}

let gameOverFlag = false;

function gameOver() {
  gameOverFlag = true;
  document.getElementById("gameOver").style.display = "block";
  canvas.style.display = "none";
}

function restartGame() {
  document.location.reload();
}

draw();
