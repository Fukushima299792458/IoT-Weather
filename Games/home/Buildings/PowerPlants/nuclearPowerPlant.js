class NuclearPowerPlant {
    constructor(x, y) {
        this.nuclearPowerPlant = nuclearPowerPlants.length;
        this.preview = true;
        this.encroached = false;
        this.x = x;
        this.y = y;
        this.r = 10;
        this.level;
        this.maxPower = 0;
        this.currentMaxPower = 0;
        this.power = 0;
        this.nuclearFuel = 0;
        this.water = 0;
        this.active = false;
        this.materials = [
            // aluminium
            9,
            // silicone
            35,
            // carbon
            3,
            // computerParts 
            10
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
                            if (Math.sqrt(Math.pow(this.x - buildings[a][b][c].x, 2) + Math.pow(this.y - buildings[a][b][c].y, 2)) < buildings[a][b][c].r + this.r && !buildings[a][b][c].preview && a != 1) {
                                stroke(255, 0, 0);
                                strokeWeight(3);
                                this.encroached = true;
                            }
                        } else if (buildings[a][b][c].wx) {
                            if (Math.abs(this.x - buildings[a][b][c].x) < this.r + (buildings[a][b][c].wx / 2) && Math.abs(this.y - buildings[a][b][c].y) < this.r + (buildings[a][b][c].wy / 2) && !buildings[a][b][c].preview && a != 1) {
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

        context.fillStyle = "#ffffff";

        if (!this.active) {
            context.fillStyle = "#b0b0b0";
        } else if (!(mHrs > 6 && mHrs < 15)) {
            context.fillStyle = "#e0e0e0";
        } else if (weather == "storm") {
            context.fillStyle = "#ffd080";
        }

        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
    
    displayStats() {
        // display specific stats at a specific angle dependent on location reletively to edges if mouse is over powerPlant
        if (!this.preview) {
            if (Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2)) < this.r) {
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
        // consume nuclear fuel and water to produce enrgy
        if (gridOnline && this.active) {
            if (water > (50.05245 *  this.maxPower) - this.water) {
                water -= (50.05245 *  this.maxPower) - this.water;
                this.water += (50.05245 *  this.maxPower) - this.water;
            }
            if (this.water > 5.005245 *  this.power) {
                this.water -= 5.005245 *  this.power;
                contaminatedWaterIce += 5.005245 *  this.power;
                if (this.nuclearFuel > this.power / 24000000) {
                    this.nuclearFuel -= this.power / 24000000;
                    this.currentMaxPower = this.maxPower;
                } else if (nuclearFuel > (this.maxPower / 24000000) * 17532) {
                    nuclearFuel -= (this.maxPower / 24000000) * 17532;
                    this.nuclearFuel += (this.maxPower / 24000000) * 17532;
                    this.currentMaxPower = this.maxPower;
                } else {
                    this.currentMaxPower = 0;
                }
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
