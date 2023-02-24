(function () {
  // Get references to the game elements
  const gameBoard = document.getElementById('game-board');
  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  const bullet = document.getElementById('bullet');
  const bomb = document.getElementById('bomb');

  // Set initial player positions
  let player1X = 50;
  let player1Y = 50;
  let player2X = 400;
  let player2Y = 400;

  // Set initial bullet and bomb positions
  let bulletX = 0;
  let bulletY = 0;
  let bombX = 0;
  let bombY = 0;

  // Set bullet and bomb speeds
  const bulletSpeed = 5;
  const bombSpeed = 3;

  // Set bullet and bomb intervals
  let bulletInterval;
  let bombInterval;

  // Set bullet and bomb fired flags
  let bulletFired = false;
  let bombFired = false;

  // Set keycodes for player movements
  const LEFT_ARROW = 37;
  const UP_ARROW = 38;
  const RIGHT_ARROW = 39;
  const DOWN_ARROW = 40;
  const SPACE_BAR = 32;

  // Set keydown event listener for player movements
  document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
      case LEFT_ARROW:
        player1X -= 5;
        player1.style.left = player1X + 'px';
        break;
      case UP_ARROW:
        player1Y -= 5;
        player1.style.top = player1Y + 'px';
        break;
      case RIGHT_ARROW:
        player1X += 5;
        player1.style.left = player1X + 'px';
        break;
      case DOWN_ARROW:
        player1Y += 5;
        player1.style.top = player1Y + 'px';
        break;
      case SPACE_BAR:
        fireBullet();
        break;
    }
  });

  // Set interval for moving player 2 randomly
  setInterval(movePlayer2, 500);

  function movePlayer2() {
    const randomMovement = Math.floor(Math.random() * 4);
    switch (randomMovement) {
      case 0:
        player2X -= 5;
        break;
      case 1:
        player2Y -= 5;
        break;
      case 2:
        player2X += 5;
        break;
      case 3:
        player2Y += 5;
        break;
    }
    player2.style.left = player2X + 'px';
    player2.style.top = player2Y + 'px';
  }

  function fireBullet() {
    if (!bulletFired) {
      bulletFired = true;
      bullet.style.display = 'block';
      bulletX = player1X + 20;
      bulletY = player1Y;
      bullet.style.left = bulletX + 'px';
      bullet.style.top = bulletY + 'px';
      bulletInterval = setInterval(moveBullet, 20);
    }
  }
  function moveBullet() {
    bulletX += bulletSpeed;
    bullet.style.left = bulletX + 'px';
    if (bulletX > player2X && bulletX < player2X + 50 && bulletY > player2Y && bulletY < player2Y + 50) {
      clearInterval(bulletInterval);
      bulletFired = false;
      bullet.style.display = 'none';
      player2.style.background = 'grey';
      setTimeout(function () {
        player2.style.background = 'red';
      }, 200);
    }
    if (bulletX > 500) {
      clearInterval(bulletInterval);
      bulletFired = false;
      bullet.style.display = 'none';
    }
  }

  function moveBomb() {
    bombY += bombSpeed;
    bomb.style.top = bombY + 'px';
    if (bombX > player1X && bombX < player1X + 50 && bombY > player1Y && bombY < player1Y + 50) {
      clearInterval(bombInterval);
      bombFired = false;
      bomb.style.display = 'none';
      player1.style.background = 'grey';
      setTimeout(function () {
        player1.style.background = 'blue';
      }, 200);
    }
    if (bombY > 500) {
      clearInterval(bombInterval);
      bombFired = false;
      bomb.style.display = 'none';
    }
  }
  function fireBomb() {
    if (!bombFired) {
      bombFired = true;
      bomb.style.display = 'block';
      bombX = player2X + 20;
      bombY = player2Y + 50;
      bomb.style.left = bombX + 'px';
      bomb.style.top = bombY + 'px';
      bombInterval = setInterval(moveBomb, 20);
    }
  }

  // Set keyup event listener for stopping bullet and bomb
  document.addEventListener('keyup', function (event) {
    if (event.keyCode === SPACE_BAR) {
      clearInterval(bulletInterval);
      bulletFired = false;
      bullet.style.display = 'none';
    } else if (event.keyCode === 66) {
      clearInterval(bombInterval);
      bombFired = false;
      bomb.style.display = 'none';
    }
  });

  // Set button click event listener for firing bomb
  document.getElementById('fire-bomb').addEventListener('click', function () {
    fireBomb();
  });
})();
