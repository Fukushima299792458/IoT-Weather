class Person {
    constructor() {
        // declare the many properties
        this.person = people.length;
        this.preview = false;
        this.encroached = false;
        this.x = width / 2;
        this.y = height / 2;
        this.r = 1;
        // keep track of vitals and age
        this.oxygen = 0;
        this.water = 0;
        this.accomodation = 168;
        this.food = 0;
        this.age = 0;
        // randomly select sex
        this.sex = Math.round(Math.random());
        // keep track of where person is going
        this.destinationX = width / 2;
        this.destinationY = height / 2;
        this.speed;
        // keep track of the current task
        this.task = 0;
        // set all properties to keep track of house
        this.accomodationX;
        this.accomodationY;
        this.accomodationType;
        this.accomodationId = 0 - 1;
        // set all properties to keep track of laboratory
        this.laboratoryX;
        this.laboratoryY;
        this.laboratoryType;
        this.laboratoryId = 0 - 1;
        // set status i.e. sex, age/child and name
        this.idle;
        this.child;
        // randomly select name based on sex
        if (this.sex) {
            this.name = gNam[Math.round(Math.random() * 99)]
        } else {
            this.name = bNam[Math.round(Math.random() * 99)]
        }
        this.sleep = true;
        this.pregnant = false;
        this.maternity = false;
    }

    display() {
        stroke(0, 0, 0);
        strokeWeight(1);

        context.fillStyle = "#ffffff";

        if (!(mHrs > 6 && mHrs < 15)) {
            context.fillStyle = "#909090";
        } else if (weather == "storm") {
            context.fillStyle = "#9f4000";
        }



        // travel to destination at this.speed
        if (this.destinationX > this.x + this.speed) {
            this.x += this.speed;
        } else if (this.destinationX < this.x - this.speed) {
            this.x -= this.speed;
        } else {
            this.x = this.destinationX;
        }
        if (this.destinationY > this.y + this.speed) {
            this.y += this.speed;
        } else if (this.destinationY < this.y - this.speed) {
            this.y -= this.speed;
        } else {
            this.y = this.destinationY;
        }

        if (this.age < 18) {
            this.child = true;
            this.idle = true;
        } else {
            this.child = false;
            if (this.maternity) {
                this.idle = true;
            } else {
                this.idle = false;
            }
        }

        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
    
    displayStats() {
        // display specific stats at a specific angle dependent on location reletively to edges if mouse is over person
        if (Math.sqrt(Math.pow(people[this.person].x - mouseX, 2) + Math.pow(people[this.person].y - mouseY, 2)) < 5) {
            context.fillStyle = "white";
            context.font = "10px Verdana";
            stroke(0, 0, 0);
            strokeWeight(1);
            if (people[this.person].x < width - 170 && people[this.person].y > 50) {
                rect(people[this.person].x, people[this.person].y - 50, 170, 50);
                context.fillStyle = "black";
                context.fillText(`Name: ${this.name}`, people[this.person].x, people[this.person].y - 40, 170);
                context.fillText(`Age: ${Math.round(this.age)}`, people[this.person].x, people[this.person].y - 30, 170);
                if (this.sex) {
                    context.fillText(`Sex: Female`, people[this.person].x, people[this.person].y - 20, 170);
                } else {
                    context.fillText(`Sex: Male`, people[this.person].x, people[this.person].y - 20, 170);
                }
                if (this.child) {
                    context.fillText(`Status: Child`, people[this.person].x, people[this.person].y - 10, 170);
                } else if (this.maternity) {
                    context.fillText(`Status: Maternity`, people[this.person].x, people[this.person].y - 10, 170);
                } else {
                    context.fillText(`Status: Active Scientist`, people[this.person].x, people[this.person].y - 10, 170);
                }
            } else if (people[this.person].x > width - 170 && people[this.person].y < 50) {
                rect(people[this.person].x - 170, people[this.person].y, 170, 50);
                context.fillStyle = "black";
                context.fillText(`Name: ${this.name}`, people[this.person].x - 170, people[this.person].y + 10, 170);
                context.fillText(`Age: ${Math.round(this.age)}`, people[this.person].x - 170, people[this.person].y + 20, 170);
                if (this.sex) {
                    context.fillText(`Sex: Female`, people[this.person].x - 170, people[this.person].y + 30, 170);
                } else {
                    context.fillText(`Sex: Male`, people[this.person].x - 170, people[this.person].y + 30, 170);
                }
                if (this.child) {
                    context.fillText(`Status: Child`, people[this.person].x - 170, people[this.person].y + 40, 170);
                } else if (this.maternity) {
                    context.fillText(`Status: Maternity`, people[this.person].x - 170, people[this.person].y + 40, 170);
                } else {
                    context.fillText(`Status: Active Scientist`, people[this.person].x - 170, people[this.person].y + 40, 170);
                }
            } else if (people[this.person].x > width - 170) {
                rect(people[this.person].x - 170, people[this.person].y - 50, 170, 50);
                context.fillStyle = "black";
                context.fillText(`Name: ${this.name}`, people[this.person].x - 170, people[this.person].y - 40, 170);
                context.fillText(`Age: ${Math.round(this.age)}`, people[this.person].x - 170, people[this.person].y - 30, 170);
                if (this.sex) {
                    context.fillText(`Sex: Female`, people[this.person].x - 170, people[this.person].y - 20, 170);
                } else {
                    context.fillText(`Sex: Male`, people[this.person].x - 170, people[this.person].y - 20, 170);
                }
                if (this.child) {
                    context.fillText(`Status: Child`, people[this.person].x - 170, people[this.person].y - 10, 170);
                } else if (this.maternity) {
                    context.fillText(`Status: Maternity`, people[this.person].x - 170, people[this.person].y - 10, 170);
                } else {
                    context.fillText(`Status: Active Scientist`, people[this.person].x - 170, people[this.person].y - 10, 170);
                }
            } else if (people[this.person].y < 50) {
                rect(people[this.person].x, people[this.person].y, 170, 50);
                context.fillStyle = "black";
                context.fillText(`Name: ${this.name}`, people[this.person].x, people[this.person].y + 10, 170);
                context.fillText(`Age: ${Math.round(this.age)}`, people[this.person].x, people[this.person].y + 20, 170);
                if (this.sex) {
                    context.fillText(`Sex: Female`, people[this.person].x, people[this.person].y + 30, 170);
                } else {
                    context.fillText(`Sex: Male`, people[this.person].x, people[this.person].y + 30, 170);
                }
                if (this.child) {
                    context.fillText(`Status: Child`, people[this.person].x, people[this.person].y + 40, 170);
                } else if (this.maternity) {
                    context.fillText(`Status: Maternity`, people[this.person].x, people[this.person].y + 40, 170);
                } else {
                    context.fillText(`Status: Active Scientist`, people[this.person].x, people[this.person].y + 40, 170);
                }
            }
            context.fillStyle = "white";
        }
    }

    birth() {
        // run random chance to give birth to more or less than one child
        if (Math.random() < 0.8) {
            people.push(new buildingsClass[1][0]);
            if (Math.random() < 0.05) {
                people.push(new buildingsClass[1][0]);
            }
        }
        this.pregnant = false;
        setTimeout(function() {this.maternity = false}, 21840000);
        // ensure everything is still in the right arrays
        powerPlants = [solarFarms, nuclearPowerPlants];
        beings = [people];
        quarters = [familyQuarters];
        laboratories = [standardLaboratories];
        plantations = [potatoFarms];
        mines = [metalOreMines];
        refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
        transportFacilities = [fuelRefineries, launchPads, rockets];
        buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
    }

    science() {
        if (mHrs > 6 && mHrs < 15) {
            this.sleep = false;
        }
        if (this.accomodationId < 0) {
            for (let a = 0; a < quarters.length; a++) {
                for (let b = 0; b < quarters[a].length; b++) {
                    if (this.accomodationId < 0) {
                        if (quarters[a][b].occupancy < quarters[a][b].currentMaxOccupancy && !quarters[a][b].preview) {
                            quarters[a][b].occupancy += 1;
                            this.accomodationX = quarters[a][b].x;
                            this.accomodationY = quarters[a][b].y;
                            this.accomodationType = a;
                            this.accomodationId = b;
                        }
                    }
                }
            }
        }
        // if there are laboratories and you aren't on maternity leave or a child will find a laboratory and do science to earn 
        if (laboratories && !this.maternity && !this.child && gridOnline) {
            if (this.laboratoryId < 0) {
                for (let a = 0; a < laboratories.length; a++) {
                    for (let b = 0; b < laboratories[a].length; b++) {
                        if (this.laboratoryId < 0) {
                            if (laboratories[a][b].occupancy < laboratories[a][b].currentMaxOccupancy && !laboratories[a][b].preview) {
                                laboratories[a][b].occupancy += 1
                                this.laboratoryX = laboratories[a][b].x;
                                this.laboratoryY = laboratories[a][b].y;
                                this.laboratoryType = a;
                                this.laboratoryId = b;
                            }
                        }
                    }
                }
                // randomly generate place to mill around to during the day
                if (mHrs > 6 && mHrs < 15) {
                    if (Math.abs(this.x - this.destinationX) < 10 && Math.abs(this.y - this.destinationY) < 10) {
                        this.destinationX = Math.round(Math.random() * width);
                        this.destinationY = Math.round(Math.random() * height);
                        this.speed = 0.5;
                    }
                } else {
                if (this.accomodationId >= 0) {
                    this.destinationX = this.accomodationX;
                    this.destinationY = this.accomodationY;
                    if (quarters[this.accomodationType][this.accomodationId].fertile && this.sex && this.age > 24 && !this.pregnant && !this.sleep) {
                        if (Math.random() < 0.04) {
                            this.pregnant = true;
                            console.log("pregnant");
                            setTimeout(function() {this.maternity = true}, 15120000);
                            setTimeout(this.birth, 16800000);
                        }
                        this.sleep = true;
                    } else if (this.age > 24 && !this.sex) {
                        quarters[this.accomodationType][this.accomodationId].fertile = true;
                    }
                }
            }
            } else {
                // if day randomly generates place to go to and does some science then returns to the lab and does it all over again
                if (Math.abs(this.x - this.destinationX) < 10 && Math.abs(this.y - this.destinationY) < 10) {
                    if (this.task > 10) {
                        this.task = 0;
                        this.speed = 2;
                        if (Math.abs(this.x - this.laboratoryX) < 10 && Math.abs(this.y - this.laboratoryY) < 10) {
                            researchPoints += 0.01;
                            if (mHrs > 6 && mHrs < 15) {
                                this.destinationX = Math.round(Math.random() * width);
                                this.destinationY = Math.round(Math.random() * height);
                            } else {
                                if (this.accomodationId >= 0) {
                                    this.destinationX = this.accomodationX;
                                    this.destinationY = this.accomodationY;
                                    if (quarters[this.accomodationType][this.accomodationId].fertile && this.sex && this.age > 24 && !this.maternity) {
                                        if (Math.random() < 0.04) {
                                            console.log("pregnant");
                                            this.pregnant = true;
                                            setTimeout(function() {this.maternity = true}, 15120000);
                                            setTimeout(this.birth, 16800000);
                                        }
                                        this.sleep = true;
                                    } else if (this.age > 24 && !this.sex) {
                                        quarters[this.accomodationType][this.accomodationId].fertile = true;
                                    }
                                }
                            }
                        } else if (!(Math.abs(this.x - this.accomodationX) < 10 && Math.abs(this.y - this.accomodationY) < 10) || mHrs > 6 && mHrs < 15) {
                            this.destinationX = this.laboratoryX;
                            this.destinationY = this.laboratoryY; 
                        } 
                    } else {
                        if (mHrs > 14 && mHrs < 19) {
                            this.speed = 2 + (3 / Math.abs(mHrs - 16));
                            this.task += 0.05;
                        }
                        if (Math.abs(this.x - this.laboratoryX) < 10 && Math.abs(this.y - this.laboratoryY) < 10) {
                            this.task += 0.084;
                        } else if (!Math.abs(this.x - this.accomodationX) < 10 && !Math.abs(this.y - this.accomodationY) < 10) {
                            this.task += 0.5;
                        }
                    }
                }
            }
        } else {
            // mill around the map during the day
            if (mHrs > 6 && mHrs < 15) {
                if (Math.abs(this.x - this.destinationX) < 10 && Math.abs(this.y - this.destinationY) < 10) {
                    this.destinationX = Math.round(Math.random() * width);
                    this.destinationY = Math.round(Math.random() * height);
                    this.speed = 0.5;
                }
            } else {
                if (this.accomodationId >= 0) {
                    this.destinationX = this.accomodationX;
                    this.destinationY = this.accomodationY;
                    if (quarters[this.accomodationType][this.accomodationId].fertile && this.sex && this.age > 24 && !this.pregnant && !this.sleep) {
                        console.log("maybe");
                        if (Math.random() < 0.04) {
                            console.log("pregnant");
                            this.pregnant = true;
                            setTimeout(function() {this.maternity = true}, 15120000);
                            setTimeout(this.birth, 16800000);
                        }
                        this.sleep = true;
                    } else if (this.age > 24 && !this.sex) {
                        quarters[this.accomodationType][this.accomodationId].fertile = true;
                    }
                }
            }
        }
    }

    consumeFuel() {
        // fill up vital consumable resevoirs
        if (oxygen > 0.84 - this.oxygen) {
            oxygen -= 0.84 - this.oxygen;
            this.oxygen += 0.84 - this.oxygen;
        }
        if (water > 0.0329976 - this.water) {
            water -= 0.0329976 - this.water;
            this.water += 0.0329976 - this.water;
        }
        if (food > 34.859664 - this.food) {
            food -= 34.859664 - this.food;
            this.food += 34.859664 - this.food;
        }

        // check if person has enough of the vitals otherwise dies
        if (this.oxygen > 0.035) {
            this.oxygen -= 0.035;
            carbonDioxide += 0.014;
        } else {
            console.log("ox");
            if (this.accomodationId >= 0) {
                quarters[this.accomodationType][this.accomodationId].occupancy -= 1;
            }
            if (this.laboratoryId > 0 - 1) {
                laboratories[this.laboratoryType][this.laboratoryId].occupancy -= 1;
            }
            for (let i = 0; i < people.length; i++) {
                if (i > this.person) {
                    people[i].person -= 1;
                }
            }
            people.splice(this.person, 1);
        }
        if (this.water > 0.0004583) {
            this.water -= 0.0004583;
            contaminatedWaterIce += 0.000435385;
        } else {
            console.log("wa");
            if (this.accomodationId >= 0) {
                quarters[this.accomodationType][this.accomodationId].occupancy -= 1;
            }
            if (this.laboratoryId > 0 - 1) {
                laboratories[this.laboratoryType][this.laboratoryId].occupancy -= 1;
            }
            for (let i = 0; i < people.length; i++) {
                if (i > this.person) {
                    people[i].person -= 1;
                }
            }
            people.splice(this.person, 1);
            beings = [people];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
        }
        if (this.accomodationId < 0) {
            for (let a = 0; a < quarters.length; a++) {
                for (let b = 0; b < quarters[a].length; b++) {
                    if (this.accomodationId < 0) {
                        if (quarters[a][b].occupancy < quarters[a][b].currentMaxOccupancy && !quarters[a][b].preview) {
                            quarters[a][b].occupancy += 1;
                            this.accomodationX = quarters[a][b].x;
                            this.accomodationY = quarters[a][b].y;
                            this.accomodationType = a;
                            this.accomodationId = b;
                        }
                    }
                }
            }
            if (this.accomodation < 1) {
                console.log("acc");
                if (!this.accomodationId < 0) {
                    quarters[this.accomodationType][this.accomodationId].occupancy -= 1;
                }
                if (this.laboratoryId > 0 - 1) {
                    laboratories[this.laboratoryType][this.laboratoryId].occupancy -= 1;
                }
                for (let i = 0; i < people.length; i++) {
                    if (i > this.person) {
                        people[i].person -= 1;
                    }
                }
                people.splice(this.person, 1);
                beings = [people];
                buildings[1] = [beings];
            }
            this.accomodation -= 1;
        } else {
            this.accomodation = 168;
            if (quarters[this.accomodationType][this.accomodationId].occupancy > quarters[this.accomodationType][this.accomodationId].currentMaxOccupancy) {
                quarters[this.accomodationType][this.accomodationId].occupancy -= 1;
                this.accomodationId = 0 - 1;
            }
        }
        if (this.food > 0.034583) {
            this.food -= 0.034583;
        } else {
            console.log("foo");
            if (this.accomodationId >= 0) {
                quarters[this.accomodationType][this.accomodationId].occupancy -= 1;
            }
            if (this.laboratoryId > 0 - 1) {
                laboratories[this.laboratoryType][this.laboratoryId].occupancy -= 1;
            }
            for (let i = 0; i < people.length; i++) {
                if (i > this.person) {
                    people[i].person -= 1;
                }
            }
            people.splice(this.person, 1);
            beings = [people];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
        }
        // generate random chance of dieing (of age or other causes) 50% to get to 100 reducing imortals in our game
        this.age += 1 / 876000
        if (Math.random() < 0.000000007) {
            console.log("ran");
            if (this.accomodationId >= 0) {
                quarters[this.accomodationType][this.accomodationId].occupancy -= 1;
            }
            if (this.laboratoryId > 0 - 1) {
                laboratories[this.laboratoryType][this.laboratoryId].occupancy -= 1;
            }
            for (let i = 0; i < people.length; i++) {
                if (i > this.person) {
                    people[i].person -= 1;
                }
            }
            people.splice(this.person, 1);
            beings = [people];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
        }
    }
}
