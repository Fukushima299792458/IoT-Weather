let canvas;
let context;

let displayBox;

let x;
let y;
let width;
let height;

let weather;

let peopleNum = 1;
let r = 3;
let strok = 1.5;
let sped = 10;
let factor = "people";
// localStorage.clear();
let people = [];

let audio = document.createElement("AUDIO");

if (audio.canPlayType("audio/mpeg")) {
    audio.setAttribute("src","spaceMusic.mp3");
} else {
    audio.setAttribute("src","horse.ogg");
}

audio.loop = true;
let save;
if (localStorage.getItem('save')) {
    save = JSON.parse(localStorage.getItem('save'));
}
if (save != null) {
    peopleNum = save[0];
    r = save[1];
    strok = save[2];
    sped = save[3];
    factor = save[4];
} else {
    save = [peopleNum, r, strok, sped, factor];
    localStorage.setItem("save", JSON.stringify(save));
}



function setup() {
    // making and defining different parts and functions of the canvas
    canvas = createCanvas(innerWidth, innerHeight - 10.1/3);

    width = canvas.width;
    height = canvas.height;

    canvas.id("canvas");
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');

    // set martian looking background colour
    background(255, 255, 255);

    // detect mouse clicks and mouse movement to track mouse
    document.getElementById("canvas").addEventListener('mousemove', mousemove);

    // play and loop background space music
    let audio = document.createElement("AUDIO");

    if (audio.canPlayType("audio/mpeg")) {
        audio.setAttribute("src","spaceMusic.mp3");
    } else {
        audio.setAttribute("src","horse.ogg");
    }

    // create starter colonists
    for (let i = 0; i < peopleNum; i++) {
        people.push(new Person);
    }
}

function draw() {
    if (people.length - 1 > peopleNum) {
        for (let a = 0; a < people.length - 1 - peopleNum; a++) {
            for (let b = 0; b < people.length; b++) {
                if (b > people[a].person) {
                    people[b].person -= 1;
                }
            }
            people.splice(this.person, 1);
        }
    } else if (people.length - 1 < peopleNum) {
        for (let i = 0; i < peopleNum - people.length; i++) {
            people.push(new Person);
        }
    }
    // display all the "buildings"
    for (let i = 0; i < people.length; i++) {
        people[i].display();
    }
    save = [peopleNum, r, strok, sped, factor];
    localStorage.setItem("save", JSON.stringify(save));
}

// track mouse location on mouse move
function mousemove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}


// track all key press events to see what is being pressed to allow the user to interact
document.addEventListener('keydown', function(e) {
    background(255, 255, 255);
    switch (e.keyCode) {
        case 38:
        // up arrow pressed
        if (factor == "people") {
            peopleNum += 1;
        } else if (factor == "radius") {
            r += 0.1;
        } else if (factor == "speed" || factor == "ran") {
            sped += sped * 100.1;
        } else if (factor == "stroke") {
            strok += 1;
        }
        break;
        case 40:
        // down arrow pressed
        if (factor == "people") {
            if (peopleNum > 0) {
                peopleNum -= 1;
            }
        } else if (factor == "radius") {
            if (r > 0) {
                r -= 0.1;
            }
        } else if (factor == "speed" || factor == "ran") {
            if (sped/3 > 0) {
                sped /= 2;
            }
        } else if (factor == "stroke") {
            if (strok > 0) {
                strok -= 1;
            }
        }
        break;
        case 80:
        // p key pressed
        factor = "people";
        break;
        case 82:
        // r key pressed
        factor = "radius";
        case 83:
        // s key pressed
        factor = "speed";
        break;
        case 84:
        // t key pressed
        factor = "stroke";
        break;
        case 222:
        // '
        factor = "ran";
        break;
    }
});
