class PlayerRobot {
  constructor() {
    this.x = width / 2;
    this.y = height / 1.5;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.color = 255;
    this.r = 10;
    this.shield = 100;
    this.shieldRegen = 0.005;
    this.health = 100;
    this.healthRegen = 0;
    this.fireRate = 500;
    this.fire = setInterval(this.laserRelease, this.fireRate);
  }
  display() {
    stroke(0, 255, 0);
    strokeWeight(1);
    fill(this.color);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.shield < 100 - this.shieldRegen) {
      this.shield += this.shieldRegen;
    } else if (this.shield < 100) {
      this.shield = 100;
    }
    if (this.health < 100 - this.healthRegen) {
      this.health += this.healthRegen;
    } else if (this.health < 100) {
      this.health = 100;
    }
    statsTracker.innerHTML = `Health: ${Math.floor(this.health)} Sheild: ${Math.floor(this.shield)} Level: ${level}`;
  }
  bounce() {
    if(this.x > width) {
        this.x = 0;
        this.color = 255;
    } else if (this.x < 0) {
        this.x = width;
        this.color = 255;
    }
    if(this.y > height) {
        this.y = 0
        this.color = 255;
    } else if (this.y < 0) {
        this.y = height;
        this.color = 255;
    }
    for (let i = 0; i < robotLaserShots.length; i++) {
      if (Math.sqrt(Math.pow(playerRobot.x - robotLaserShots[i].x, 2) + Math.pow(playerRobot.y - robotLaserShots[i].y, 2)) < robotLaserShots[i].r + playerRobot.r) {
        if (this.shield < 1 && this.health > 0) {
          this.health -= 1 - this.shield;
          this.shield = 0
        } else if (this.shield > 1 || this.shield == 1) {
          this.shield -= 1;
        }
        if (this.health < 1) {
          window.open('https://web.au.edusercontent.com/o7ch2sigo1rkh0evqo8o6tqbh8/youtube.html', '_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=300, top=100, width=750, height=400, visible=none', '')
        }
      }
    }
  }
  laserRelease(){
    if (Math.abs(playerRobot.xSpeed) + Math.abs(playerRobot.ySpeed) > 0) {
      playerLaserShots.unshift(new PlayerLaser);
    }
  }
}

document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
      case 32:
      // space pressed
      playerRobot.ySpeed = 0;
      playerRobot.xSpeed = 0;
      break;
      case 37:
      // left arrow pressed
			playerRobot.xSpeed = -5;
      break;
      case 38:
      // up arrow pressed
			playerRobot.ySpeed = -5;
      break;
      case 39:
      // right arrow pressed
			playerRobot.xSpeed = 5;
      break;
      case 40:
      // down arrow pressed
			playerRobot.ySpeed = 5;
      break;
    }
});
