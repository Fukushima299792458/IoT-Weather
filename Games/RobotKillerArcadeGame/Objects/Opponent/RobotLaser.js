class RobotLaser {
  constructor(parent) {
    this.robotLaser = robotLaserShots.length
    this.x = robots[parent].x;
    this.y = robots[parent].y;
    this.xSpeed = robots[parent].xSpeed * 2;
    this.ySpeed = robots[parent].ySpeed * 2;
    this.color = 255;
    this.r = 10;
  }
  display() {
    stroke(255, 0, 0);
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
      for (let i = 0; i < robotLaserShots.length; i++) {
        if (i > this.robotLaser || robotLaserShots[i].robotLaser > robotLaserShots.length - 1) {
          if (robotLaserShots[i].robotLaser - 1 >= 0) {
            robotLaserShots[i].robotLaser -= 1;
          }
        }
      }
      robotLaserShots.splice(this.robotLaser, 1);
    }
  }
}
