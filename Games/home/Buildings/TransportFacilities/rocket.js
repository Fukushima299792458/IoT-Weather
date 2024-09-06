class Rocket {
    constructor(x, y, a) {
        this.rocket = rockets.length;
        this.preview = false;
        this.x = x;
        this.y = y;
        this.r = 5;
        this.level;
        this.active = false;
        this.launchpad = a;
    }

    display() {
        stroke(0, 0, 0);
        strokeWeight(1);

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
        // left here to prevent errors
    }

    consumeFuel() {
        // left here to prevent errors
    }
}
