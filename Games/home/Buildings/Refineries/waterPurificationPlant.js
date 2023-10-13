class WaterPurificationPlant {
    constructor(x, y) {
        this.waterPurificationPlant = waterPurificationPlants.length;
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
            10,
            // silicone
            5,
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
        }

        this.maxConsumption = 4.916078589356041306848 * this.level;

        context.fillStyle = "rgb(80, 80, 255)";

        if (!this.active) {
            context.fillStyle = "rgb(60, 60, 225)";
        } else if (!(mHrs > 6 && mHrs < 15)) {
            context.fillStyle = "rgb(80, 80, 145)";
        } else if (weather == "storm") {
            context.fillStyle = "rgb(143, 56, 155)";
        }

        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
    
    displayStats() {
        // display specific stats at a specific angle dependent on location reletively to edges if mouse is over water recycler
        if (!this.preview) {
            if (Math.abs(this.x - mouseX) < this.r && Math.abs(this.y - mouseY) < this.r) {
                context.fillStyle = "white";
                context.font = "10px Verdana";
                stroke(0, 0, 0);
                strokeWeight(1);
                if (waterPurificationPlants[this.waterPurificationPlant].x < width - 170 && waterPurificationPlants[this.waterPurificationPlant].y > 50) {
                    rect(waterPurificationPlants[this.waterPurificationPlant].x, waterPurificationPlants[this.waterPurificationPlant].y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, waterPurificationPlants[this.waterPurificationPlant].x, waterPurificationPlants[this.waterPurificationPlant].y - 40, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, waterPurificationPlants[this.waterPurificationPlant].x, waterPurificationPlants[this.waterPurificationPlant].y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, waterPurificationPlants[this.waterPurificationPlant].x, waterPurificationPlants[this.waterPurificationPlant].y - 20, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, waterPurificationPlants[this.waterPurificationPlant].x, waterPurificationPlants[this.waterPurificationPlant].y - 10, 170);
                } else if (waterPurificationPlants[this.waterPurificationPlant].x > width - 170 && waterPurificationPlants[this.waterPurificationPlant].y < 50) {
                    rect(waterPurificationPlants[this.waterPurificationPlant].x - 170, waterPurificationPlants[this.waterPurificationPlant].y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, waterPurificationPlants[this.waterPurificationPlant].x - 170, waterPurificationPlants[this.waterPurificationPlant].y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, waterPurificationPlants[this.waterPurificationPlant].x - 170, waterPurificationPlants[this.waterPurificationPlant].y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, waterPurificationPlants[this.waterPurificationPlant].x - 170, waterPurificationPlants[this.waterPurificationPlant].y + 30, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, waterPurificationPlants[this.waterPurificationPlant].x - 170, waterPurificationPlants[this.waterPurificationPlant].y + 40, 170);
                } else if (waterPurificationPlants[this.waterPurificationPlant].x > width - 170) {
                    rect(waterPurificationPlants[this.waterPurificationPlant].x - 170, waterPurificationPlants[this.waterPurificationPlant].y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, waterPurificationPlants[this.waterPurificationPlant].x - 170, waterPurificationPlants[this.waterPurificationPlant].y - 40, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, waterPurificationPlants[this.waterPurificationPlant].x - 170, waterPurificationPlants[this.waterPurificationPlant].y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, waterPurificationPlants[this.waterPurificationPlant].x - 170, waterPurificationPlants[this.waterPurificationPlant].y - 20, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, waterPurificationPlants[this.waterPurificationPlant].x - 170, waterPurificationPlants[this.waterPurificationPlant].y - 10, 170);
                } else if (waterPurificationPlants[this.waterPurificationPlant].y < 50) {
                    rect(waterPurificationPlants[this.waterPurificationPlant].x, waterPurificationPlants[this.waterPurificationPlant].y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, waterPurificationPlants[this.waterPurificationPlant].x, waterPurificationPlants[this.waterPurificationPlant].y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, waterPurificationPlants[this.waterPurificationPlant].x, waterPurificationPlants[this.waterPurificationPlant].y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, waterPurificationPlants[this.waterPurificationPlant].x, waterPurificationPlants[this.waterPurificationPlant].y + 30, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, waterPurificationPlants[this.waterPurificationPlant].x, waterPurificationPlants[this.waterPurificationPlant].y + 40, 170);
                }
                context.fillStyle = "white";
            }
        }
    }

    consumeFuel() {
        // consumes energy and contaminatedWaterIce to produce fresh recycled water
        if (this.active && gridOnline) {
            if (contaminatedWaterIce > 50.061616 * this.level) {
                water += 50.061616 * this.level;
                contaminatedWaterIce -= 50.061616 * this.level;
                this.currentMaxProduction = this.maxProduction;
                this.consumption = this.maxConsumption;
            }
        } else {
            this.currentMaxProduction = 0;
            this.consumption = 0;
        }
    }
}
