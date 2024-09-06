class SolarFarm {
    constructor(x, y) {
        this.solarFarm = solarFarms.length;
        this.preview = true;
        this.encroached = false;
        this.x = x;
        this.y = y;
        this.wx = 50;
        this.wy = 50;
        this.level;
        this.maxPower = 0;
        this.currentMaxPower = 0;
        this.power = 0;
        this.nuclearFuel = 0;
        this.water = 0;
        this.active = false;
        this.materials = [
            // aluminium
            5,
            // silicone
            15,
            // carbon
            0,
            // computerParts 
            0
        ];
    }

    display() {
        stroke(0, 0, 0);
        strokeWeight(1);
        // checks for obstruction when being previewed to be built
        if (this.preview) {
            this.active = false;
            this.x = mouseX;
            this.y = mouseY;
            this.encroached = false;
            stroke(0, 255, 0);
            for (let a = 0; a < buildings.length; a++) {
                for (let b = 0; b < buildings[a].length; b++) {
                    for (let c = 0; c < buildings[a][b].length; c++) {
                        if (buildings[a][b][c].r) {
                            if (Math.abs(this.x - buildings[a][b][c].x) < buildings[a][b][c].r + (this.wx / 2) && Math.abs(this.y - buildings[a][b][c].y) < buildings[a][b][c].r + (this.wy / 2) && !buildings[a][b][c].preview && a != 1) {
                                stroke(255, 0, 0);
                                strokeWeight(3);
                                this.encroached = true;
                            }
                        } else if (buildings[a][b][c].wx) {
                            if (Math.abs(this.x - buildings[a][b][c].x) < (this.wx / 2) + (buildings[a][b][c].wx / 2) && Math.abs(this.y - buildings[a][b][c].y) < (this.wy / 2) + (buildings[a][b][c].wy / 2) && !buildings[a][b][c].preview && a != 1) {
                                stroke(255, 0, 0);
                                strokeWeight(3);
                                this.encroached = true;
                            }
                        }
                    }
                }
            }
        } else {
            this.maxPower = 200 * this.level;
        }

        context.fillStyle = "#505050";

        if (!this.active) {
            context.fillStyle = "#202020";
        } else if (!(mHrs > 6 && mHrs < 15)) {
            context.fillStyle = "#303030";
        } else if (weather == "storm") {
            context.fillStyle = "#805000";
        }

        rect(this.x - (this.wx / 2), this.y - (this.wy / 2), this.wx, this.wy);
    }
    
    displayStats() {
        // display specific stats at a specific angle dependent on location reletively to edges if mouse is over solar farm
        if (!this.preview) {
            if (Math.abs(this.x - mouseX) < this.wx / 2 && Math.abs(this.y - mouseY) < this.wy / 2) {
                context.fillStyle = "white";
                context.font = "10px Verdana";
                stroke(0, 0, 0);
                strokeWeight(1);
                if (this.x < width - 170 && this.y > 50) {
                    rect(this.x, this.y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, this.x, this.y - 40, 170);
                    context.fillText(`Maximum Power Production: ${this.maxPower}`, this.x, this.y - 30, 170);
                    context.fillText(`Current Max Power: ${this.currentMaxPower}`, this.x, this.y - 20, 170);
                    context.fillText(`Power: ${this.power}`, this.x, this.y - 10, 170);
                } else if (this.x > width - 170 && this.y < 50) {
                    rect(this.x - 170, this.y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, this.x - 170, this.y + 10, 170);
                    context.fillText(`Maximum Power Production: ${this.maxPower}`, this.x - 170, this.y + 20, 170);
                    context.fillText(`Current Max Power: ${this.currentMaxPower}`, this.x - 170, this.y + 30, 170);
                    context.fillText(`Power: ${this.power}`, this.x - 170, this.y + 40, 170);
                } else if (this.x > width - 170) {
                    rect(this.x - 170, this.y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, this.x - 170, this.y - 40, 170);
                    context.fillText(`Maximum Power Production: ${this.maxPower}`, this.x - 170, this.y - 30, 170);
                    context.fillText(`Current Max Power: ${this.currentMaxPower}`, this.x - 170, this.y - 20, 170);
                    context.fillText(`Power: ${this.power}`, this.x - 170, this.y - 10, 170);
                } else if (this.y < 50) {
                    rect(this.x, this.y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, this.x, this.y + 10, 170);
                    context.fillText(`Maximum Power Production: ${this.maxPower}`, this.x, this.y + 20, 170);
                    context.fillText(`Current Max Power: ${this.currentMaxPower}`, this.x, this.y + 30, 170);
                    context.fillText(`Power: ${this.power}`, this.x, this.y + 40, 170);
                }
                context.fillStyle = "white";
            }
        }
    }

    consumeFuel() {
        // produces energy  based on the weather
        if (gridOnline && this.active) {
            if (mHrs > 6 && mHrs < 15) {
                this.currentMaxPower = this.maxPower;
            } else if (weather == "storm") {
                this.currentMaxPower = this.maxpower * 0.1;
            } else {
                this.currentMaxPower = 0;
                this.power = 0;
            }
        } else {
            this.currentMaxPower = 0;
            this.power = 0;
        }
    }
}
