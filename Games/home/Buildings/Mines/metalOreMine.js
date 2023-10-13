class MetalOreMine {
    constructor(x, y) {
        this.metalOreMine = metalOreMines.length;
        this.preview = true;
        this.encroached = false;
        this.x = x;
        this.y = y;
        this.wx = 10;
        this.wy = 20;
        this.level;
        this.maxConsumption;
        this.consumption;
        this.maxProduction = 20;
        this.currentMaxProduction = 0;
        this.active = false;
        this.materials = [
            // aluminium
            4,
            // silicone
            0,
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

        this.maxConsumption = 8.6038526639984139671506338797935 * this.level;

        context.fillStyle = "rgb(230, 133, 0)";

        if (!(mHrs > 6 && mHrs < 15)) {
            if (this.active) {
                context.fillStyle = "rgb(200, 103, 0)";
            } else {
                context.fillStyle = "rgb(180, 83, 0)";
            }
        } else if (!this.active) {
            context.fillStyle = "rgb(247, 160, 0)";
        } else if (weather == "storm") {
            context.fillStyle = "rgb(255, 168, 0)";
        }

        rect(this.x - (this.wx / 2), this.y - (this.wy / 2), this.wx, this.wy);
    }
    
    displayStats() {
        // display specific stats at a specific angle dependent on location reletively to edges if mouse is over mine
        if (!this.preview) {
            if (Math.abs(this.x - mouseX) < this.wx / 2 && Math.abs(this.y - mouseY) < this.wy / 2) {
                context.fillStyle = "white";
                context.font = "10px Verdana";
                stroke(0, 0, 0);
                strokeWeight(1);
                if (metalOreMines[this.metalOreMine].x < width - 170 && metalOreMines[this.metalOreMine].y > 50) {
                    rect(metalOreMines[this.metalOreMine].x, metalOreMines[this.metalOreMine].y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, metalOreMines[this.metalOreMine].x, metalOreMines[this.metalOreMine].y - 40, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, metalOreMines[this.metalOreMine].x, metalOreMines[this.metalOreMine].y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, metalOreMines[this.metalOreMine].x, metalOreMines[this.metalOreMine].y - 20, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, metalOreMines[this.metalOreMine].x, metalOreMines[this.metalOreMine].y - 10, 170);
                } else if (metalOreMines[this.metalOreMine].x > width - 170 && metalOreMines[this.metalOreMine].y < 50) {
                    rect(metalOreMines[this.metalOreMine].x - 170, metalOreMines[this.metalOreMine].y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, metalOreMines[this.metalOreMine].x - 170, metalOreMines[this.metalOreMine].y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, metalOreMines[this.metalOreMine].x - 170, metalOreMines[this.metalOreMine].y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, metalOreMines[this.metalOreMine].x - 170, metalOreMines[this.metalOreMine].y + 30, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, metalOreMines[this.metalOreMine].x - 170, metalOreMines[this.metalOreMine].y + 40, 170);
                } else if (metalOreMines[this.metalOreMine].x > width - 170) {
                    rect(metalOreMines[this.metalOreMine].x - 170, metalOreMines[this.metalOreMine].y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, metalOreMines[this.metalOreMine].x - 170, metalOreMines[this.metalOreMine].y - 40, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, metalOreMines[this.metalOreMine].x - 170, metalOreMines[this.metalOreMine].y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, metalOreMines[this.metalOreMine].x - 170, metalOreMines[this.metalOreMine].y - 20, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, metalOreMines[this.metalOreMine].x - 170, metalOreMines[this.metalOreMine].y - 10, 170);
                } else if (metalOreMines[this.metalOreMine].y < 50) {
                    rect(metalOreMines[this.metalOreMine].x, metalOreMines[this.metalOreMine].y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, metalOreMines[this.metalOreMine].x, metalOreMines[this.metalOreMine].y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, metalOreMines[this.metalOreMine].x, metalOreMines[this.metalOreMine].y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, metalOreMines[this.metalOreMine].x, metalOreMines[this.metalOreMine].y + 30, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, metalOreMines[this.metalOreMine].x, metalOreMines[this.metalOreMine].y + 40, 170);
                }
                context.fillStyle = "white";
            }
        }
    }

    consumeFuel() {
        // consume energy and produce ore
        if (this.active && gridOnline) {
            metalOre += 0.35849386099993391529794307832473 * this.level;
            this.consumption = this.maxConsumption;
            this.currentMaxProduction = this.maxProduction;
        } else {
            this.consumption = 0;
            this.currentMaxProduction = 0;
        }
    }
}
