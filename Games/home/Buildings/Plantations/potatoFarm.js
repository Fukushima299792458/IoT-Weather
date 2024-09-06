class PotatoFarm {
    constructor(x, y) {
        this.potatoFarm = potatoFarms.length;
        this.preview = true;
        this.encroached = false;
        this.x = x;
        this.y = y;
        this.wx = 20;
        this.wy = 10;
        this.level;
        this.maxConsumption;
        this.consumption;
        this.maxProduction = 20;
        this.currentMaxProduction = 0;
        this.active = false;
        this.water = 0;
        this.food = 0;
        this.materials = [
            // aluminium
            5,
            // silicone
            10,
            // carbon
            0,
            // computerParts 
            1
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

        this.maxConsumption = 1.929 * this.level;


        // change colour based on how much food/potatoes has been grown
        context.fillStyle = `rgb(${255 - (this.food / ((1000 * this.level) / 255))}, 255, ${255 - (this.food / (1000 * this.level) / 255)}`;

        if (!this.active) {
            context.fillStyle = `rgb(${176 - (this.food / ((1000 * this.level) / 255))}, 176, ${176 - (this.food / ((1000 * this.level) / 255))}`;
        } else if (!(mHrs > 6 && mHrs < 15)) {
            context.fillStyle = `rgb(${224 - (this.food / ((1000 * this.level) / 255))}, 224, ${224 - (this.food / ((1000 * this.level) / 255))}`;
        } else if (weather == "storm") {
            context.fillStyle = `rgb(${255 - (this.food / ((1000 * this.level) / 255))}, 208, ${128 - (this.food / ((1000 * this.level) / 255))}`;
        }

        rect(this.x - (this.wx / 2), this.y - (this.wy / 2), this.wx, this.wy);
    }
    
    displayStats() {
        // display specific stats at a specific angle dependent on location reletively to edges if mouse is over farm
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
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, this.x, this.y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, this.x, this.y - 20, 170);
                    context.fillText(`Requirements (Water/Power): ${0.055554648 * this.level}/${this.consumption}`, this.x, this.y - 10, 170);
                } else if (this.x > width - 170 && this.y < 50) {
                    rect(this.x - 170, this.y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, this.x - 170, this.y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, this.x - 170, this.y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, this.x - 170, this.y + 30, 170);
                    context.fillText(`Requirements (Water/Power): ${0.055554648 * this.level}/${this.consumption}`, this.x - 170, this.y + 40, 170);
                } else if (this.x > width - 170) {
                    rect(this.x - 170, this.y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, this.x - 170, this.y - 40, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, this.x - 170, this.y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, this.x - 170, this.y - 20, 170);
                    context.fillText(`Requirements (Water/Power): ${0.055554648 * this.level}/${this.consumption}`, this.x - 170, this.y - 10, 170);
                } else if (this.y < 50) {
                    rect(this.x, this.y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, this.x, this.y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, this.x, this.y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, this.x, this.y + 30, 170);
                    context.fillText(`Requirements (Water/Power): ${0.055554648 * this.level}/${this.consumption}`, this.x, this.y + 40, 170);
                }
                context.fillStyle = "white";
            }
        }
    }

    consumeFuel() {
        if (this.active) {
            // consume water energy to produce potatoes
            if (water > (0.777765333 * this.level) - this.water) {
                water -= (0.777765333 - this.water * this.level);
                this.water = (0.777765333 * this.level);
            }
            if (this.water > 0.002314777 * this.level && gridOnline) {
                this.water -= 0.002314777 * this.level;
                this.food += 0.69166 * this.level;
                if (this.food > 1000 * this.level) {
                    food += this.food;
                    this.food = 0;
                }
                this.maxProduction = this.level * 1000;
                this.currentMaxProduction = this.maxProduction;
                this.consumption = 1.929 * this.level;
            } else {
                this.consumption = 0;
                this.currentMaxProduction = 0;
            }
        } else {
            this.consumption = 0;
            this.currentMaxProduction = 0;
        }
    }
}
