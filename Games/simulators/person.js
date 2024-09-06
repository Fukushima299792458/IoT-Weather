class Person {
    constructor() {
        // declare the many properties
        this.person = people.length;
        this.x = width / 2;
        this.y = height / 2;
        this.r = 5;
        // keep track of where person is going
        this.destinationX = width / 2;
        this.destinationY = height / 2;
    }

    display() {
        stroke(0, 0, 0);
        strokeWeight(strok);

        context.fillStyle = "#ffffff";

        // travel to destination at sped
        if (this.destinationX > this.x + sped) {
            this.x += sped
        } else if (this.destinationX < this.x - sped) {
            this.x -= sped
        } else {
            this.x = this.destinationX;
        }
        if (this.destinationY > this.y + sped) {
            this.y += sped
        } else if (this.destinationY < this.y - sped) {
            this.y -= sped
        } else {
            this.y = this.destinationY;
        }

        if (factor == "ran") {
            if (Math.random() > 1/sped) {
                ellipse(Math.random() * width, Math.random() * height, r * 2, r * 2);
            }
        } else {
            ellipse(this.x, this.y, r * 2, r * 2);
        }
        if (Math.abs(this.x - this.destinationX) < 10 && Math.abs(this.y - this.destinationY) < 10) {
            this.destinationX = Math.round(Math.random() * width);
            this.destinationY = Math.round(Math.random() * height);
        }
    }
}
