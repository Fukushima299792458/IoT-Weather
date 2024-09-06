const statsTracker = document.getElementById("TheMeter-O-Meter");
let robotLaser;
let playerRobot;
let x = 0;
let y = 0;
let fireRate = 500;
let robots = [];
let robotLaserShots = [];
let playerLaserShots = [];
let canvas;
let width;
let height;
let fires = [];
let level = 0;

function setup() {
    canvas = createCanvas(innerWidth, innerHeight - 18);
    width = canvas.width;
    height = canvas.height;
    robots.unshift(new Robot);
    playerRobot = new PlayerRobot;
}

function draw() {
    canvas = createCanvas(innerWidth, innerHeight - 18);
    width = canvas.width;
    height = canvas.height;
    background(0)
    if (playerRobot.health > 1) {
        for (let i = 0; i < playerLaserShots.length; i++) {
            playerLaserShots[i].display();
            playerLaserShots[i].move();
        }
        for (let i = 0; i < playerLaserShots.length; i++) {
            playerLaserShots[i].playerLaser = i;
            playerLaserShots[i].bounce();
        }
        for (let i = 0; i < robotLaserShots.length; i++) {
            robotLaserShots[i].display();
            robotLaserShots[i].move();
        }
        for (let i = 0; i < robotLaserShots.length; i++) {
            robotLaserShots[i].robotLaser = i;
            robotLaserShots[i].bounce();
        }
        if (robots) {
            for (let i = 0; i < robots.length; i++) {
                robots[i].display();
            }
            if (robots[0] && robots[0].robot == 0) {
                robots[0].die();
            } else if (robots[0]) {
                robots[0].robot -= 1;
            }
        }
        playerRobot.display();
        playerRobot.bounce();
        playerRobot.move();
        if (robots.length < 1) {
            statsTracker.innerHTML = "You Win!";
        }
    } else {
        statsTracker.innerHTML = "Game Over!";
    }
}
