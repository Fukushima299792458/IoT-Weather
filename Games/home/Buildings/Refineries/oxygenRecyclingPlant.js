class OxygenRecyclingPlant {
    constructor(x, y) {
        this.oxygenRecyclingPlant = oxygenRecyclingPlants.length;
        this.preview = true;
        this.encroached = false;
        this.x = x;
        this.y = y;
        this.r = 5;
        this.level;
        this.maxConsumption;
        this.consumption;
        this.maxProduction = 0.35 * this.level;
        this.currentMaxProduction = 0;
        this.active = false;
        this.materials = [
            // aluminium
            5,
            // silicone
            4,
            // carbon
            3,
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

        this.maxProduction = 0.7 * this.level;
        this.maxConsumption = 2.35345531220889474 * this.level;

        context.fillStyle = "rgb(200, 200, 200)";

        if (!this.active) {
            context.fillStyle = "rgb(255, 60, 60)";
        } else if (!(mHrs > 6 && mHrs < 15)) {
            context.fillStyle = "rgb(150, 150, 150)";
        } else if (weather == "storm") {
            context.fillStyle = "rgb(143, 56, 155)";
        }

        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
    
    displayStats() {
        // display specific stats at a specific angle dependent on location reletively to edges if mouse is over oxygen recycler
        if (!this.preview) {
            if (Math.abs(this.x - mouseX) < this.r && Math.abs(this.y - mouseY) < this.r) {
                context.fillStyle = "white";
                context.font = "10px Verdana";
                stroke(0, 0, 0);
                strokeWeight(1);
                if (oxygenRecyclingPlants[this.oxygenRecyclingPlant].x < width - 170 && oxygenRecyclingPlants[this.oxygenRecyclingPlant].y > 50) {
                    rect(oxygenRecyclingPlants[this.oxygenRecyclingPlant].x, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y - 40, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y - 20, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y - 10, 170);
                } else if (oxygenRecyclingPlants[this.oxygenRecyclingPlant].x > width - 170 && oxygenRecyclingPlants[this.oxygenRecyclingPlant].y < 50) {
                    rect(oxygenRecyclingPlants[this.oxygenRecyclingPlant].x - 170, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x - 170, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x - 170, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x - 170, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y + 30, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x - 170, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y + 40, 170);
                } else if (oxygenRecyclingPlants[this.oxygenRecyclingPlant].x > width - 170) {
                    rect(oxygenRecyclingPlants[this.oxygenRecyclingPlant].x - 170, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y - 50, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x - 170, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y - 40, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x - 170, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y - 30, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x - 170, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y - 20, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x - 170, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y - 10, 170);
                } else if (oxygenRecyclingPlants[this.oxygenRecyclingPlant].y < 50) {
                    rect(oxygenRecyclingPlants[this.oxygenRecyclingPlant].x, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y, 170, 50);
                    context.fillStyle = "black";
                    context.fillText(`Level: ${this.level}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y + 10, 170);
                    context.fillText(`Maximum Capacity: ${this.maxProduction}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y + 20, 170);
                    context.fillText(`Current Production: ${this.currentMaxProduction}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y + 30, 170);
                    context.fillText(`Consumption: ${Math.round(this.consumption)}/${Math.round(this.maxConsumption)}`, oxygenRecyclingPlants[this.oxygenRecyclingPlant].x, oxygenRecyclingPlants[this.oxygenRecyclingPlant].y + 40, 170);
                }
                context.fillStyle = "white";
            }
        }
    }

    consumeFuel() {
        // consumes energy and carbonDioxide to produce recycled oxygen
        if (this.active && gridOnline) {
            if (carbonDioxide > 0.9627789236835 * this.level) {
                oxygen += 0.7 * this.level;
                carbonDioxide -= 0.9627789236835 * this.level;
                this.currentMaxProduction = this.maxProduction;
                this.consumption = this.maxConsumption;
            }
        } else {
            this.currentMaxProduction = 0;
            this.consumption = 0;
        }
    }
}
