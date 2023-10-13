class PlayerLaser {
  constructor() {
    this.playerLaser = playerLaserShots.length
    this.x = playerRobot.x;
    this.y = playerRobot.y;
    this.xSpeed = playerRobot.xSpeed * 2;
    this.ySpeed = playerRobot.ySpeed * 2;
    this.color = 255;
    this.r = 10;
  }
  display() {
    stroke(0, 0, 255);
    strokeWeight(4);
    fill(this.color);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  bounce() {
    if (this.x > width + 10 || this.x + 10 < 0 || this.y > height + 10 || this.y + 10 < 0) {
      for (let i = 0; i < playerLaserShots.length; i++) {
        if (i > this.playerLaser || playerLaserShots[i].playerLaser > playerLaserShots.length - 1) {
          if (playerLaserShots[i].playerLaser - 1 >= 0) {
            playerLaserShots[i].playerLaser -= 1;
          }
        }
      }
      playerLaserShots.splice(this.playerLaser, 1);
    }
  }
}
