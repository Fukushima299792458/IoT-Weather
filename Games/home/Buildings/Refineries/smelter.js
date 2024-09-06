class Smelter {
    constructor(x, y) {
        this.smelter = smelters.length;
        this.preview = true;
        this.encroached = false;
        this.x = x;
        this.y = y;
        this.r = 5;
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
            1,
            // carbon
            8,
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
        }

        this.maxConsumption = 8.6038526639984139671506338797935 * this.level;

        context.fillStyle = "rgb(100, 100, 100)";

        if (!this.active) {
            context.fillStyle = "rgb(70, 70, 70)";
        } else if (!(mHrs > 6 && mHrs < 15)) {
            context.fillStyle = "rgb(90, 90, 90)";
        } else if (weather == "storm") {
            context.fillStyle = "rgb(153, 66, 0)";
        }

        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
    
    displayStats() {
        // display specific stats at a specific angle dependent on location reletively to edges if mouse is over smelter
        if (!this.preview) {
            if (Math.abs(this.x - mouseX) < this.r && Math.abs(this.y - mouseY) < this.r) {
                context.fillStyle = "white";
                context.font = "10px Verdana";
                stroke(0, 0, 0);
                strokeWeight(1);
                if (smelters[this.smelter].x < width - 170 && smelters[this.smelter].y > 50) {
                    rect(smelters[this.smelter].x, smelters[this.smelter].y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, smelters[this.smelter].x, smelters[this.smelter].y - 40, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, smelters[this.smelter].x, smelters[this.smelter].y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, smelters[this.smelter].x, smelters[this.smelter].y - 20, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, smelters[this.smelter].x, smelters[this.smelter].y - 10, 170);
                } else if (smelters[this.smelter].x > width - 170 && smelters[this.smelter].y < 50) {
                    rect(smelters[this.smelter].x - 170, smelters[this.smelter].y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, smelters[this.smelter].x - 170, smelters[this.smelter].y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, smelters[this.smelter].x - 170, smelters[this.smelter].y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, smelters[this.smelter].x - 170, smelters[this.smelter].y + 30, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, smelters[this.smelter].x - 170, smelters[this.smelter].y + 40, 170);
                } else if (smelters[this.smelter].x > width - 170) {
                    rect(smelters[this.smelter].x - 170, smelters[this.smelter].y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, smelters[this.smelter].x - 170, smelters[this.smelter].y - 40, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, smelters[this.smelter].x - 170, smelters[this.smelter].y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, smelters[this.smelter].x - 170, smelters[this.smelter].y - 20, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, smelters[this.smelter].x - 170, smelters[this.smelter].y - 10, 170);
                } else if (smelters[this.smelter].y < 50) {
                    rect(smelters[this.smelter].x, smelters[this.smelter].y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, smelters[this.smelter].x, smelters[this.smelter].y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, smelters[this.smelter].x, smelters[this.smelter].y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, smelters[this.smelter].x, smelters[this.smelter].y + 30, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, smelters[this.smelter].x, smelters[this.smelter].y + 40, 170);
                }
                context.fillStyle = "white";
            }
        }
    }

    consumeFuel() {
        // consumes energy and ore to produce raw materials (100% accurate)
        if (this.active && gridOnline) {
            if (metalOre > 0.35849386099993391529794307832473 * this.level) {
                contaminatedWaterIce += (0.35849386099993391529794307832473 * this.level) * 0.00141;
                oxygen += (0.35849386099993391529794307832473 * this.level) * 466;
                silicone += (0.35849386099993391529794307832473 * this.level) * 0.277;
                aluminium += (0.35849386099993391529794307832473 * this.level) * 0.081;
                carbon += (0.35849386099993391529794307832473 * this.level) * 0.2;

                metalOre -= 0.35849386099993391529794307832473 * this.level;
                this.currentMaxProduction = this.maxProduction;
                this.consumption = this.maxConsumption;
            }
        } else {
            this.consumption = 0;
            this.currentMaxProduction = 0;
        }
    }
}
