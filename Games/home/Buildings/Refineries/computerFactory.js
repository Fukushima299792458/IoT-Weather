class ComputerFactory {
    constructor(x, y) {
        this.computerFactory = computerFactories.length;
        this.preview = true;
        this.encroached = false;
        this.x = x;
        this.y = y;
        this.wx = 5;
        this.wy = 5
        this.level;
        this.maxConsumption;
        this.consumption;
        this.maxProduction = 0.35 * this.level;
        this.currentMaxProduction = 0;
        this.active = false;
        this.materials = [
            // aluminium
            4,
            // silicone
            6,
            // carbon
            5,
            // computerParts 
            12
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
        }

        this.maxProduction = 1 * this.level;
        this.maxConsumption = 27.7778 * this.level;

        context.fillStyle = "rgb(200, 200, 200)";

        if (!this.active) {
            context.fillStyle = "rgb(255, 60, 60)";
        } else if (!(mHrs > 6 && mHrs < 15)) {
            context.fillStyle = "rgb(150, 150, 150)";
        } else if (weather == "storm") {
            context.fillStyle = "rgb(143, 56, 155)";
        }

        rect(this.x - (this.wx / 2), this.y - (this.wy / 2), this.wx * 2, this.wy * 2);
    }
    
    displayStats() {
        // display specific stats at a specific angle dependent on location reletively to edges if mouse is over factory
        if (!this.preview) {
            if (Math.abs(this.x - mouseX) < this.wx && Math.abs(this.y - mouseY) < this.wy) {
                context.fillStyle = "white";
                context.font = "10px Verdana";
                stroke(0, 0, 0);
                strokeWeight(1);
                if (computerFactories[this.computerFactory].x < width - 170 && computerFactories[this.computerFactory].y > 50) {
                    rect(computerFactories[this.computerFactory].x, computerFactories[this.computerFactory].y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, computerFactories[this.computerFactory].x, computerFactories[this.computerFactory].y - 40, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, computerFactories[this.computerFactory].x, computerFactories[this.computerFactory].y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, computerFactories[this.computerFactory].x, computerFactories[this.computerFactory].y - 20, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, computerFactories[this.computerFactory].x, computerFactories[this.computerFactory].y - 10, 170);
                } else if (computerFactories[this.computerFactory].x > width - 170 && computerFactories[this.computerFactory].y < 50) {
                    rect(computerFactories[this.computerFactory].x - 170, computerFactories[this.computerFactory].y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, computerFactories[this.computerFactory].x - 170, computerFactories[this.computerFactory].y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, computerFactories[this.computerFactory].x - 170, computerFactories[this.computerFactory].y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, computerFactories[this.computerFactory].x - 170, computerFactories[this.computerFactory].y + 30, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, computerFactories[this.computerFactory].x - 170, computerFactories[this.computerFactory].y + 40, 170);
                } else if (computerFactories[this.computerFactory].x > width - 170) {
                    rect(computerFactories[this.computerFactory].x - 170, computerFactories[this.computerFactory].y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, computerFactories[this.computerFactory].x - 170, computerFactories[this.computerFactory].y - 40, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, computerFactories[this.computerFactory].x - 170, computerFactories[this.computerFactory].y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, computerFactories[this.computerFactory].x - 170, computerFactories[this.computerFactory].y - 20, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, computerFactories[this.computerFactory].x - 170, computerFactories[this.computerFactory].y - 10, 170);
                } else if (computerFactories[this.computerFactory].y < 50) {
                    rect(computerFactories[this.computerFactory].x, computerFactories[this.computerFactory].y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, computerFactories[this.computerFactory].x, computerFactories[this.computerFactory].y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, computerFactories[this.computerFactory].x, computerFactories[this.computerFactory].y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, computerFactories[this.computerFactory].x, computerFactories[this.computerFactory].y + 30, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, computerFactories[this.computerFactory].x, computerFactories[this.computerFactory].y + 40, 170);
                }
                context.fillStyle = "white";
            }
        }
    }

    consumeFuel() {
        // consumes energy, carbon, silicone and carbon to produce computer parts
        if (this.active && gridOnline) {
            if (carbon > 1 * this.level && silicone > 1 * this.level && aluminium > 8 * this.level) {
                computerParts += 1 * this.level;
                carbon -= 1 * this.level;
                silicone -= 1 * this.level;
                aluminium -= 8 * this.level;
                this.currentMaxProduction = this.maxProduction;
                this.consumption = this.maxConsumption;
            }
        } else {
            this.currentMaxProduction = 0;
            this.consumption = 0;
        }
    }
}
