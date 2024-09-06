class Robot {
  constructor() {
    level += 1;
    this.robot = robots.length;
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
    this.xSpeed = 4;
    this.ySpeed = -3;
    this.color = 255;
    this.r = 10;
    this.fireRate = 500;
    this.robotLaserShots = [];
    this.health = 10;
    this.healthRegen = 0;
    this.shield = 0;
    this.shieldRegen = 0;
    this.fire = setInterval(this.laserRelease, this.fireRate, this.robot);
  }
  display() {
    stroke(255, 0, 0);
    strokeWeight(1);
    fill(this.color);
    ellipse(this.x, this.y, this.r*2, this.r*2);

    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.shield < 0 - this.shieldRegen) {
      this.shield += this.shieldRegen;
    } else if (this.shield < 0) {
      this.shield = 0;
    }
    if (this.health < 10 - this.healthRegen) {
      this.health += this.healthRegen;
    } else if (this.health < 10) {
      this.health = 10;
    }

    if(this.x > width || this.x < 0) {
      if (this.x > width) {
        if (this.xSpeed > 0) {
          this.xSpeed *= -0.1 / robots.length + -1;
        }
      } else if (this.x < 0) {
        if (this.xSpeed < 0) {
          this.xSpeed *= -0.1 / robots.length + -1;
        }
      }
      if (Math.pow(this.xSpeed, 2) + Math.pow(this.ySpeed, 2) < 100){
        this.color = 255;
      } else if ((200 / robots.length) < this.fireRate) {
        if (this.xSpeed > this.ySpeed) {
          this.xSpeed /= 2;
        } else {
          this.ySpeed /= 2;
        }
        this.fireRate *= 1 - (0.1 / robots.length);
        clearInterval(this.fire);
        this.fire = setInterval(this.laserRelease, this.fireRate, this.robot);
      } else {
        if (this.xSpeed > this.ySpeed) {
          this.xSpeed /= 2;
        } else {
          this.ySpeed /= 2;
        }
        this.fireRate = 500;
        clearInterval(this.fire);
        this.fire = setInterval(this.laserRelease, this.fireRate, this.robot);
        robots.unshift(new Robot);
      }
    }
    if (this.y > height || this.y < 0) {
      if (this.y > height) {
        if (this.ySpeed > 0) {
          this.ySpeed *= -0.1 / robots.length + -1;
        }
      } else if (this.y < 0) {
        if (this.ySpeed < 0) {
          this.ySpeed *= -0.1 / robots.length + -1;
        }
      }

      if (Math.pow(this.ySpeed, 2) + Math.pow(this.ySpeed, 2) < 100){
        this.color = 255;
      } else if ((200 / robots.length) < this.fireRate) {
        if (this.xSpeed > this.ySpeed) {
          this.xSpeed /= 2;
        } else {
          this.ySpeed /= 2;
        }
        this.fireRate *=  1 - (0.1 / robots.length);
        clearInterval(this.fire)
        this.fire = setInterval(this.laserRelease, this.fireRate, this.robot);
      } else {
        if (this.xSpeed > this.ySpeed) {
          this.xSpeed /= 2;
        } else {
          this.ySpeed /= 2;
        }
        this.fireRate = 500;
        clearInterval(this.fire)
        this.fire = setInterval(this.laserRelease, this.fireRate, this.robot);
        robots.unshift(new Robot);
      }
    }
    for (let i = 0; i < playerLaserShots.length; i++) {
      if (Math.sqrt(Math.pow(this.x - playerLaserShots[i].x, 2) + Math.pow(this.y - playerLaserShots[i].y, 2)) < playerLaserShots[i].r + this.r) {
        if (this.shield < 1 && this.health > 0) {
          this.health -= 1 - this.shield;
          this.shield = 0
        } else if (this.shield > 1 || this.shield == 1) {
          this.shield -= 1;
        }
      }
    }
  }
  laserRelease(robot) {
    if (robots[robot]) {
      robotLaserShots.unshift(new RobotLaser(robot));
    }
  }
  die() {
    if (this.health < 1) {
      clearInterval(this.fire);
      for (let i = 0; i < robots.length; i++) {
        if (i > this.robot || robots[i].robot > robots.length - 1) {
          if (robots[i].robot - 1 >= 0) {
            robots[i].robot -= 1;
          }
        }
      }
      robots.splice(this.robot, 1);
      if (robots[this.robot]) {
        robots[this.robot].die();
      }
    } else if (robots[this.robot + 1] && robots[this.robot + 1].robot == this.robot + 1) {
      robots[this.robot + 1].die();
    }
  }
}
