class LaunchPad {
    constructor(x, y) {
        this.launchPad = launchPads.length;
        this.preview = true;
        this.encroached = false;
        this.x = x;
        this.y = y;
        this.r = 10;
        this.level;
        this.maxFuel;
        this.rocketFuel = 0;
        this.maxPower = 0;
        this.power = 0;
        this.active = false;
        this.materials = [
            // aluminium
            5,
            // silicone
            0,
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
            this.maxFuel = 1200 * this.level;
            this.maxPower = 0.01 * this.maxFuel;
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
        // display specific stats at a specific angle dependent on location reletively to edges if mouse is over lauch pad
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
                    context.fillText(`Rocket Fuel: ${this.rocketFuel}`, this.x, this.y - 30, 170);
                    context.fillText(`Power: ${this.power}`, this.x, this.y - 20, 170);
                    context.fillText(`Resources To Build Rocket: ${70 * this.level} Al, ${50 * this.level} CP`, this.x, this.y - 10, 170);
                } else if (this.x > width - 170 && this.y < 50) {
                    rect(this.x - 170, this.y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, this.x - 170, this.y + 10, 170);
                    context.fillText(`Rocket Fuel: ${this.rocketFuel}`, this.x - 170, this.y + 20, 170);
                    context.fillText(`Power: ${this.power}`, this.x - 170, this.y + 30, 170);
                    context.fillText(`Resources To Build Rocket: ${70 * this.level} Al, ${50 * this.level} CP`, this.x - 170, this.y + 40, 170);
                } else if (this.x > width - 170) {
                    rect(this.x - 170, this.y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, this.x - 170, this.y - 40, 170);
                    context.fillText(`Rocket Fuel: ${this.rocketFuel}`, this.x - 170, this.y - 30, 170);
                    context.fillText(`Power: ${this.power}`, this.x - 170, this.y - 20, 170);
                    context.fillText(`Resources To Build Rocket: ${70 * this.level} Al, ${50 * this.level} CP`, this.x - 170, this.y - 10, 170);
                } else if (this.y < 50) {
                    rect(this.x, this.y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, this.x, this.y + 10, 170);
                    context.fillText(`Rocket Fuel: ${this.rocketFuel}`, this.x, this.y + 20, 170);
                    context.fillText(`Power: ${this.power}`, this.x, this.y + 30, 170);
                    context.fillText(`Resources To Build Rocket: ${70 * this.level} Al, ${50 * this.level} CP`, this.x, this.y + 40, 170);
                }
                context.fillStyle = "white";
            }
        }
    }

    consumeFuel() {
        // make sure it has topped up cryogenic fuel but loses it if it loses power
        if (rocketFuel > this.maxFuel - this.rocketFuel && this.active && gridOnline) {
            rocketFuel -= this.maxFuel - this.rocketFuel;
            this.rocketFuel += this.maxFuel - this.rocketFuel;
        }
        if (this.active && gridOnline) {
            if (this.rocketFuel) {
                this.power = this.maxPower;
            }
            // builds rocket if clear and has enough supplies
            if (aluminium >= 70 * this.level && computerParts >= 50 * this.level) {
                aluminium -= 70 * this.level;
                computerParts -= 50 * this.level;
                setTimeout(function() {
                    rockets.push(new buildingsClass[7][2], this.x, this.y, this.launchPad);
                    transportFacilities = [fuelRefineries, launchPads, rockets];
                    buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
                }, 60000);
            }
        } else {
            this.power = 0;
            this.rocketFuel = 0;
        }
    }
}
