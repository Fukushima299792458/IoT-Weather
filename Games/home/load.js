/*
// I am committed to being a person of integrity.
// This project is submitted as part of the assessment for Year 8 IST.
// This is all my own work. I have referenced any work used from other
// sources and have not plagiarised the work of others. // Phoenix Wulf
*/

let saveGameIndex = [];
if (localStorage.getItem('saveGameIndex')) {
    saveGameIndex = JSON.parse(localStorage.getItem('saveGameIndex'));
} else {
    saveGameIndex = [`saveGameIndex`, 0];
    localStorage.setItem('saveGameIndex', JSON.stringify(saveGameIndex));
}

let selected = 0;

let canvas;
let context;

let displayBox;

let x;
let y;
let width;
let height;

let weather;

// two arrays with the 100 most popular names for boys and girls for random name generation later

let gNam = ['Olivia', 'Emma', 'Charlotte', 'Amelia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Evelyn', 'Harper', 'Luna', 'Camila', 'Gianna', 'Elizabeth', 'Eleanor', 'Ella', 'Abigail', 'Sofia', 'Avery', 'Scarlett', 'Emily', 'Aria', 'Penelope', 'Chloe', 'Layla', 'Mila', 'Nora', 'Hazel', 'Madison', 'Ellie', 'Lily', 'Nova', 'Isla', 'Grace', 'Violet', 'Aurora', 'Riley', 'Zoey', 'Willow', 'Emilia', 'Stella', 'Zoe', 'Victoria', 'Hannah', 'Addison', 'Leah', 'Lucy', 'Eliana', 'Ivy', 'Everly', 'Lillian', 'Paisley', 'Elena', 'Naomi', 'Maya', 'Natalie', 'Kinsley', 'Delilah', 'Claire', 'Audrey', 'Aaliyah', 'Ruby', 'Brooklyn', 'Alice', 'Aubrey', 'Autumn', 'Leilani', 'Savannah', 'Valentina', 'Kennedy', 'Madelyn', 'Josephine', 'Bella', 'Skylar', 'Genesis', 'Sophie', 'Hailey', 'Sadie', 'Natalia', 'Quinn', 'Caroline', 'Allison', 'Gabriella', 'Anna', 'Serenity', 'Nevaeh', 'Cora', 'Ariana', 'Emery', 'Lydia', 'Jade', 'Sarah', 'Eva', 'Adeline', 'Madeline', 'Piper', 'Rylee', 'Athena', 'Peyton', 'Everleigh'];
let bNam = ['Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Theodore', 'Jack', 'Levi', 'Alexander', 'Jackson', 'Mateo', 'Daniel', 'Michael', 'Mason', 'Sebastian', 'Ethan', 'Logan', 'Owen', 'Samuel', 'Jacob', 'Asher', 'Aiden', 'John', 'Joseph', 'Wyatt', 'David', 'Leo', 'Luke', 'Julian', 'Hudson', 'Grayson', 'Matthew', 'Ezra', 'Gabriel', 'Carter', 'Isaac', 'Jayden', 'Luca', 'Anthony', 'Dylan', 'Lincoln', 'Thomas', 'Maverick', 'Elias', 'Josiah', 'Charles', 'Caleb', 'Christopher', 'Ezekiel', 'Miles', 'Jaxon', 'Isaiah', 'Andrew', 'Joshua', 'Nathan', 'Nolan', 'Adrian', 'Cameron', 'Santiago', 'Eli', 'Aaron', 'Ryan', 'Angel', 'Cooper', 'Waylon', 'Easton', 'Kai', 'Christian', 'Landon', 'Colton', 'Roman', 'Axel', 'Brooks', 'Jonathan', 'Robert', 'Jameson', 'Ian', 'Everett', 'Greyson', 'Wesley', 'Jeremiah', 'Hunter', 'Leonardo', 'Jordan', 'Jose', 'Bennett', 'Silas', 'Nicholas', 'Parker', 'Beau', 'Weston', 'Austin', 'Connor', 'Carson', 'Dominic', 'Xavier'];

//Tutorial messages
let messages = [
    [``], [
    `WARNING! TOTAL GRID FALIURE AND SHUTDOWN. (space to continue)`, 
    `ALL SYNTHETIC LIFE SUPPORT SYSTEMS RUNNING ON GRID POWER WILL STOP OPERATING. (space to continue)`,
    `please contact tech support we can begin fixing this issue with 12 to 18 buisness months, (space to continue)`, 
    `wait times are currently at a low of four days with a latency of 22 minutes 34 seconds thank you for your patients. (space to clear)`, 
    ``], [
    `breaker triggered, all grid powered synthetic life support has shutdown. (space to clear)`, 
    ``]];

// variables to keep track of totorial and animate it
let messageCategory = 0;
let message = 0;
let messageLetterNum = 0;


// variable to keep track of building stage and status
let building;

let buildingCategory;
let buildingType;

// arrays to contain avariety of classes instead of needing to rewrite the whole thing for each case

let buildings = [];
let buildingsClass = [
    // powerPlants
    [SolarFarm, NuclearPowerPlant],
    // beings
    [Person],
    // quarters
    [FamilyQuarter],
    // laboratories
    [StandardLaboratory],
    // plantations
    [PotatoFarm],
    // mines
    [MetalOreMine],
    // refineries
    [Smelter, WaterPurificationPlant, OxygenRecyclingPlant, ComputerFactory],
    // transportFacilities
    [FuelRefinery, LaunchPad, Rocket]
];


// variable to keep track of power grid functioning
let gridOnline;
let maxPowerOutput;
let totalPowerCapacity;
let totalPowerOutput;
let grossPowerConsumption;
let totalPowerConsumption;
let maxPowerConsumption;


// arrays for/to keep trakc of powerplants
let powerPlants = [];
let nuclearPowerPlants = [];
let solarFarms = [];

// arrays for/to keep trakc of being/s
let beings = [];
let people = [];

// arrays for/to keep trakc of quarter/s
let quarters = [];
let familyQuarters = [];

// arrays for/to keep trakc of laboratory/ies
let laboratories = [];
let standardLaboratories = [];

// arrays for/to keep trakc of plantation/s
let plantations = [];
let potatoFarms = [];

// arrays for/to keep trakc of mine/s
let mines = [];
let metalOreMines = [];

// arrays for/to keep trakc of refineries
let refineries = [];
let smelters = [];
let waterPurificationPlants = [];
let oxygenRecyclingPlants = [];
let computerFactories = [];

// arrays for/to keep trakc of all of the transport/rocket facilities
let transportFacilities = [];
let fuelRefineries = [];
let launchPads = [];
let rockets = [];

// variables to keep track of colonists and colonits' status
let colonists;
let actvScientists;
let idle;
let children;
let maternity;

// keeps track of location reletive to earth in terms of the hohmann transfer
let cycleTime = 0;

// POINT SYSTEM FOR THE GAME THAT KEEPS TRACK OF THE PLAYERS CURRENTLY POSSESED RESEARCH POINTS (EXCLUDING ONES BEING SENT TO EARTH)
let researchPoints = 0;

// variables to keep track of the different materials 
let metalOre = 0;
let aluminium = 80;
let silicone = 300;
let carbon = 240;
let computerParts = 230;
let rocketFuel = 100;

// variables to keep track of products mostly considerd watse to be recycled
let contaminatedWaterIce = 0;
let carbonDioxide = 0;

// variables to keep track of consumables used by and directly keeping the colonists alive
let air;
let oxygen = 80.64;
let water = 18999880.186272;
let food = 1000;
let nuclearFuel = 158.3323165536;

// time passed since landing on mars as measured in earth time (standardised gregorian calender units)
let eYrs = 0;
let eWks = 0;
let eDays = 0;
let eHrs = 0;
let eMins = 0;

// time passed since landing on mars as measured in martian time (adapted martian calender units)
let mYrs = 0;
let mMons = 0;
let mWks = 0;
let mDays = 0;
let mHrs = 0;
let mMins = 0;


let audio = document.createElement("AUDIO");

if (audio.canPlayType("audio/mpeg")) {
    audio.setAttribute("src","spaceMusic.mp3");
} else {
    audio.setAttribute("src","horse.ogg");
}

audio.loop = true;

function setup() {
    // making and defining different parts and functions of the canvas
    canvas = createCanvas(innerWidth, innerHeight - 4);

    width = canvas.width;
    height = canvas.height;

    canvas.id("canvas");
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');

    // set martian looking background colour
    background(253, 166, 0);

    // detect mouse clicks and mouse movement to track mouse
    document.getElementById("canvas").addEventListener("click", build);
    document.getElementById("canvas").addEventListener('mousemove', mousemove);

    
    //embeding all arrays as desired
    powerPlants = [solarFarms, nuclearPowerPlants];
    beings = [people];
    quarters = [familyQuarters];
    laboratories = [standardLaboratories];
    plantations = [potatoFarms];
    mines = [metalOreMines];
    refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
    transportFacilities = [fuelRefineries, launchPads, rockets];
    buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
    

    // create starter colonists
    for (let i = 0; i < 120; i++) {
        people.push(new buildingsClass[1][0]);
        people[i].age = 25;
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
}

function draw() {
    // reset the background colour to the desired colour and clear past frames
    background(253, 166, 0);
    // change background colour based on weather conditions
    document.body.style.backgroundColor = "rgb(253, 166, 0)";



    if (!(mHrs > 6 && mHrs < 15)) {
        // make background darker if night
        background(170, 100, 0);
        document.body.style.backgroundColor = "rgb(170, 100, 0)";
    } else if (weather == "storm") {
        // make background "marsier" and redder
        background(255, 170, 0);
        document.body.style.backgroundColor = "rgb(255, 170, 0)";
    }


    // ensure arrays are still properly embeded
    powerPlants = [solarFarms, nuclearPowerPlants];
    beings = [people];
    quarters = [familyQuarters];
    laboratories = [standardLaboratories];
    plantations = [potatoFarms];
    mines = [metalOreMines];
    refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
    transportFacilities = [fuelRefineries, launchPads, rockets];
    buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];


    // set air based on oxygen
    air = oxygen * 0.005;


    // calculate how many colonists there are and what their status is/ what they are doing
    colonists = 0;
    idle = 0;
    children = 0;
    maternity = 0;
    actvScientists = 0;
    for (let a = 0; a < people.length; a++) {
        colonists += 1;
        if (people[a].idle) {
            idle += 1;
            if (people[a].child) {
                children += 1;
            } else {
                maternity += 1;
            }
        } else {
            actvScientists += 1;
        }
    }


    // display all the "buildings"
    for (let a = 0; a < buildings.length; a++) {
        for (let b = 0; b < buildings[a].length; b++) {
            for (let c = 0; c < buildings[a][b].length; c++) {
                buildings[a][b][c].display();
            }
        }
    }

    // display stats seperately and later to make sure the stats display ontop of all the other buildings
    for (let a = 0; a < buildings.length; a++) {
        for (let b = 0; b < buildings[a].length; b++) {
            for (let c = 0; c < buildings[a][b].length; c++) {
                buildings[a][b][c].displayStats();
            }
        }
    }


    // display the total and major stats for the palyer with expanded wiew on hover
    context.fillStyle = "black";
    context.font = `${height / 25}px Verdana`;
    stroke(0, 0, 0);

    if (mouseY < height / 15) {
        if (mouseX < 3 * width / 11) {
            context.fillText(`Total Pwr Consump: ${Math.round(totalPowerConsumption)} Kw`, 0, 2 * height / 25, 1 * width / 4);
            context.fillText(`Total Pwr O/P: ${Math.round(totalPowerOutput)} Kw`, 0, 3 * height / 25, 1 * width / 4);
            context.fillText(`Total Pwr Cap: ${totalPowerCapacity} Kw`, 0, 4 * height / 25, 1 * width / 4);
            context.fillText(`Max Pwr Cap: ${maxPowerOutput} Kw`, 0, 5 * height / 25, 1 * width / 4);
            context.fillText(`|`, width / 4, 1 * height / 25);
            context.fillText(`|`, width / 4, 2 * height / 25);
            context.fillText(`|`, width / 4, 3 * height / 25);
            context.fillText(`|`, width / 4, 4 * height / 25);
            context.fillText(`|`, width / 4, 5 * height / 25);
        } else if (mouseX < 5 * width / 11) {
            context.fillText(`Actv Scientists: ${actvScientists}`, 3 * width / 11, 2 * height / 25, 1 * width / 6);
            context.fillText(`Idle: ${idle}`, 3 * width / 11, 3 * height / 25, 1 * width / 6);
            context.fillText(`Children: ${children}`, 3 * width / 11, 4 * height / 25, 1 * width / 6);
            context.fillText(`Maternity: ${maternity}`, 3 * width / 11, 5 * height / 25, 1 * width / 6);
            context.fillText(`|`, 5 * width / 11, 1 * height / 25);
            context.fillText(`|`, 5 * width / 11, 2 * height / 25);
            context.fillText(`|`, 5 * width / 11, 3 * height / 25);
            context.fillText(`|`, 5 * width / 11, 4 * height / 25);
            context.fillText(`|`, 5 * width / 11, 5 * height / 25);
        } else if (mouseX < 13 * width / 19) {
            context.fillText(`Metal Ore: ${Math.round(metalOre)} mt`, 9 * width / 19, 2 * height / 25, 4 * width / 19);
            context.fillText(`Aluminium: ${Math.round(aluminium)} mt`, 9 * width / 19, 3 * height / 25, 4 * width / 19);
            context.fillText(`Silicone: ${Math.round(silicone)} mt`, 9 * width / 19, 4 * height / 25, 4 * width / 19);
            context.fillText(`Carbon: ${Math.round(carbon)} mt`, 9 * width / 19, 5 * height / 25, 4 * width / 19);
            context.fillText(`Computer Parts: ${computerParts}`, 9 * width / 19, 6 * height / 25, 4 * width / 19);
            context.fillText(`|`, 13 * width / 19, 1 * height / 25);
            context.fillText(`|`, 13 * width / 19, 2 * height / 25);
            context.fillText(`|`, 13 * width / 19, 3 * height / 25);
            context.fillText(`|`, 13 * width / 19, 4 * height / 25);
            context.fillText(`|`, 13 * width / 19, 5 * height / 25);
            context.fillText(`|`, 13 * width / 19, 6 * height / 25); 
        } else {
            context.textAlign = "end";
            context.fillText(`Air: ${Math.round(air)} mt`, width, 2 * height / 25, 5 * width / 19);
            context.fillText(`Oxygen: ${Math.round(oxygen)} kg`, width, 3 * height / 25, 5 * width / 19);
            context.fillText(`Water: ${Math.round(water)} mt`, width, 4 * height / 25, 5 * width / 19);
            context.fillText(`Food: ${Math.round(food)} kg`, width, 5 * height / 25, 5 * width / 19);
            context.fillText(`Nuclear Fuel: ${Math.round(nuclearFuel)} kg`, width, 6 * height / 25, 5 * width / 19);
            context.fillText(`Contaminated Water Ice: ${Math.round(contaminatedWaterIce)} mt`, width, 7 * height / 25, 5 * width / 19);
            context.fillText(`Carbon Dioxide: ${Math.round(carbonDioxide)} kg`, width, 8 * height / 25, 5 * width / 19);
            context.fillText(`Rocket Fuel: ${rocketFuel} mt`, width, 9 * height / 25, 5 * width / 19);
            context.textAlign = "start";
            context.fillText(`|`, 13 * width / 19, 1 * height / 25);
            context.fillText(`|`, 13 * width / 19, 2 * height / 25);
            context.fillText(`|`, 13 * width / 19, 3 * height / 25);
            context.fillText(`|`, 13 * width / 19, 4 * height / 25);
            context.fillText(`|`, 13 * width / 19, 5 * height / 25);
            context.fillText(`|`, 13 * width / 19, 6 * height / 25);
            context.fillText(`|`, 13 * width / 19, 6.99 * height / 25);
            context.fillText(`|`, 13 * width / 19, 7.99 * height / 25);
            context.fillText(`|`, 13 * width / 19, 8.98 * height / 25);
        }
    }
    // diplay most important information at the top
    context.fillText(`Power: ${Math.round(totalPowerConsumption)}/${totalPowerCapacity} Kw`, 0, height / 25, 1 * width / 4);
    context.fillText(`Colonists: ${colonists}`, 3 * width / 11, 1 * height / 25, 2 * width / 5);
    context.fillText(`Materials (ore/Al/Si): ${Math.round(metalOre)}/${Math.round(aluminium)}/${Math.round(silicone)} mt`, 9 * width / 19, 1 * height / 25, 4 * width / 19);
    
    // give consumables special treatment because right up agaist other side
    context.textAlign = "end";
    context.fillText(`Consumables: ${Math.round(oxygen)}/${Math.round(water)}/${Math.round(food)}`, width, 1 * height / 25, 5 * width / 19);
    
    // put both earth and mars time down in the cornerto help the player keep track of time passed and time of day but hide if the build menu is obstructing it
    if (!building) {
        context.fillText(`Earth Time (yr/wks/days/hrs:mins): ${eYrs}/${eWks}/${eDays}/${eHrs}:${eMins}`, width - 5, height - (4 + height / 25), width);
        // max 18/42/1/15/36
        context.fillText(`Mars Time (yr/mon/wks/days/hrs:mins): ${mYrs}/${mMons}/${mWks}/${mDays}/${mHrs}:${mMins}`, width - 5, height - 4, width);
    }

    // the "choose your own adventure" is calculated and displayed here based on past actions and can be reset with a click
    context.font = `${height / 23}px Verdana`;
    context.textAlign = "start";
    if (!building) {
        context.fillText(`Press 'b' to build`, 0, height - 4);
    } else if (building == "Building") {
        context.fillText(`'e'='energy' 'q'='quarters' 'm'=mines 'r'='refineries' 'p'='plantations' 'l'='laboratories' 't'='transportFacilities'`, 0, height - 4, width);
    } else if (building == "Energy") {
        context.fillText(`'n'='nuclear PWR plnt' 35 Si, 8 Al, 3 C, 10 CP 's'='solr Frm' 15 Si, 5 Al`, 0, height - 4, width);
    } else if (building == "Quarters") {
        context.fillText(`'f'='family qtr' 8 Si, 8 Al, 4 C`, 0, height - 4, width);
    } else if (building == "Mines") {
        context.fillText(`'m'='metal ore mine' 4 Al, 1 CP`, 0, height - 4, width);
    } else if (building == "Refineries") {
        context.fillText(`'s'='smelter' 8 C, 4 Al, 1 Si 'w'='water REC plnt' 10 Al, 5 Si 'o'='oxygen REC plnt' 5 Al, 4 C, 3 Si 'c'='CMP FAC' 4 Al, 6 Si, 5 C, 12 CP`, 0, height - 4, width);
    } else if (building == "Plantations") {
        context.fillText(`'p'='potato plantation' 10 Si, 5 Al, 1 CP`, 0, height - 4, width);
    } else if (building == "Laboratories") {
        context.fillText(`'s'='standard laboratory' 20 Si, 20 C, 20 CP`, 0, height - 4, width);
    } else if (building == "TransportFacilities") {
        context.fillText(`'f'='fuel refinery' 20 Al, 15 Si 'l'='launchpad' 5 Al`, 0, height - 4, width);
    }

    // DISPLAY THE ALL IMPORTANT RESEARCH POINTS IN THE BOTTOM LEFT CORNER WITH THE BUILDING MENU
    context.fillText(`Research Points: ${researchPoints.toFixed(1)}`, 0, height - 8 - height / 20);
    

    context.fillStyle = "#ffffff50";
    rect(0, height/2 - 25, width, 35);

    context.textAlign = "center";
    context.font = `25px Verdana`;
    context.fillStyle = "#000000";

    localStorage.setItem('saveGameIndex', JSON.stringify(saveGameIndex));

    // context.fillText(`Create New Savegame | Enter`, width/1.8, height/2, width/1.2);
    if (selected >= 1) {
        context.fillText(`${selected - 1}/${saveGameIndex.length - 2} Create New Savegame | Enter`, width/2, height/2, width);
    } else {
        context.fillText(`${selected}/${saveGameIndex.length - 2} Create New Savegame | Enter`, width/2, height/2, width);
    }
    if (selected > 1) {
        context.fillStyle = "#000000"
        context.fillText(`${saveGameIndex[selected]} | Enter/delete`, width/2, height/2 + 35, width);
        context.fillStyle = "#ffffff50";
        rect(0, height/2 + 10, width, 35);
    }
    // run the totorial animation frame by frame based on time passed as measured by the tick function
    context.font = `${height / 20}px Verdana`;
    messageLetterNum += 1;
    context.fillText(messages[messageCategory][message].substring(0, messageLetterNum), width / 2, 8 * height / 10, width - 20); 

    context.fillStyle = "white";
    context.textAlign = "start";   

    // make sure the grid is working and calulate all its functions
    processGrid();
}

// preview buildings so the player can pick their location easily
function buildPreview(a, b) {
    if (!isBuildPreview()) {
        buildings[a][b].push(new buildingsClass[a][b]);
        solarFarms = buildings[0][0];
        nuclearPowerPlants = buildings[0][1];
        people = buildings[1][0];
        familyQuarters = buildings[2][0];
        standardLaboratories = buildings[3][0];
        potatoFarms = buildings[4][0];
        metalOreMines = buildings[5][0];
        smelters = buildings[6][0];
        waterPurificationPlants = buildings[6][1];
        oxygenRecyclingPlants = buildings[6][2];
        computerFactories = buildings[6][3];
        fuelRefineries = buildings[7][0];
        launchPads = buildings[7][1];
        powerPlants = [solarFarms, nuclearPowerPlants];
        beings = [people]
        quarters = [familyQuarters];
        laboratories = [standardLaboratories];
        plantations = [potatoFarms];
        mines = [metalOreMines];
        refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
        buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
    }
}

// check if there is already a building being built/previewed
function isBuildPreview() {
    for (let a = 0; a < buildings.length; a++) {
        for (let b = 0; b < buildings[a].length; b++) {
            for (let c = 0; c < buildings[a][b].length; c++) {
                if (buildings[a][b][c].preview) {
                    return true;
                }
            }
        }
    }
}

// make the structure permenent in its current location if it is not overlapping another building (calculated in the individual objects)
function build() {
    // if building is actually running/true
    if (building) {
        if (building.includes("SolarFarm l") && !solarFarms[solarFarms.length - 1].encroached) {
            gridOnline = true;
            solarFarms[solarFarms.length - 1].preview = false;
            solarFarms[solarFarms.length - 1].level = Number(building.substring(building.length - 1));
            powerPlants = [solarFarms, nuclearPowerPlants];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("NuclearPowerPlant l") && !nuclearPowerPlants[nuclearPowerPlants.length - 1].encroached) {
            gridOnline = true;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].preview = false;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].level = Number(building.substring(building.length - 1));
            powerPlants = [solarFarms, nuclearPowerPlants];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("FamilyQuarter l1") && !familyQuarters[familyQuarters.length - 1].encroached) {
            familyQuarters[familyQuarters.length - 1].preview = false;
            familyQuarters[familyQuarters.length - 1].level = Number(building.substring(building.length - 1));
            quarters = [familyQuarters];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("StandardLaboratory l") && !standardLaboratories[standardLaboratories.length - 1].encroached) {
            standardLaboratories[standardLaboratories.length - 1].preview = false;
            standardLaboratories[standardLaboratories.length - 1].level = Number(building.substring(building.length - 1));
            laboratories = [standardLaboratories];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("PotatoFarm l1") && !potatoFarms[potatoFarms.length - 1].encroached) {
            potatoFarms[potatoFarms.length - 1].preview = false;
            potatoFarms[potatoFarms.length - 1].level = Number(building.substring(building.length - 1));
            plantations = [potatoFarms];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("MetalOreMine l") && !metalOreMines[metalOreMines.length - 1].encroached) {
            metalOreMines[metalOreMines.length - 1].preview = false;
            metalOreMines[metalOreMines.length - 1].level = Number(building.substring(building.length - 1));
            mines = [metalOreMines];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("Smelter l1") && !smelters[smelters.length - 1].encroached) {
            smelters[smelters.length - 1].preview = false;
            smelters[smelters.length - 1].level = Number(building.substring(building.length - 1));
            refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("WaterPurificationPlant l") && !waterPurificationPlants[waterPurificationPlants.length - 1].encroached) {
            waterPurificationPlants[waterPurificationPlants.length - 1].preview = false;
            waterPurificationPlants[waterPurificationPlants.length - 1].level = Number(building.substring(building.length - 1));
            refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("OxygenRecyclingPlant l") && !oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].encroached) {
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].preview = false;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].level = Number(building.substring(building.length - 1));
            refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("ComputerFactory l") && !computerFactories[computerFactories.length - 1].encroached) {
            computerFactories[computerFactories.length - 1].preview = false;
            computerFactories[computerFactories.length - 1].level = Number(building.substring(building.length - 1));
            refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("FuelRefinery l") && !fuelRefineries[fuelRefineries.length - 1].encroached) {
            fuelRefineries[fuelRefineries.length - 1].preview = false;
            fuelRefineries[fuelRefineries.length - 1].level = Number(building.substring(building.length - 1));
            transportFacilities = [fuelRefineries, launchPads, rockets];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("LaunchPad l") && !launchPads[launchPads.length - 1].encroached) {
            launchPads[launchPads.length - 1].preview = false;
            launchPads[launchPads.length - 1].level = Number(building.substring(building.length - 1));
            transportFacilities = [fuelRefineries, launchPads, rockets];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT)) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (!isBuildPreview()) {
            building = false;
        }
    }

    // see if you are clicking on a building so just change weather it is active
    for (let a = 0; a < buildings.length; a++) {
        for (let b = 0; b < buildings[a].length; b++) {
            for (let c = 0; c < buildings[a][b].length; c++) {
                if (buildings[a][b][c].r) {
                    if (Math.sqrt(Math.pow(buildings[a][b][c].x - mouseX, 2) + Math.pow(buildings[a][b][c].y - mouseY, 2)) < buildings[a][b][c].r && !buildings[a][b][c].preview) {
                        if (buildings[a][b][c].active == false) {
                            buildings[a][b][c].active = true;
                        } else if (buildings[a][b][c].active == true && !buildings[a][b][c].preview) {
                            buildings[a][b][c].active = false;
                        }
                    }
                } else if (buildings[a][b][c].wx) {
                    if (Math.abs(buildings[a][b][c].x - mouseX) < buildings[a][b][c].wx / 2 && Math.abs(buildings[a][b][c].y - mouseY) < buildings[a][b][c].wy / 2 && !buildings[a][b][c].preview) {
                        if (buildings[a][b][c].active == false) {
                            buildings[a][b][c].active = true;
                        } else if (buildings[a][b][c].active == true && !buildings[a][b][c].preview) {
                            buildings[a][b][c].active = false;
                        }
                    }
                }
            }
        }
    }
}

function processGrid() {
    // run a slightly different function if grid is active rather than offline - turns all things off or checks how much energy is needed to be produced
    if (gridOnline) {
        buildings[0] = powerPlants;
        maxPowerOutput = 0;
        totalPowerOutput = 0;
        totalPowerCapacity = 0;
        totalPowerConsumption = 0;
        maxPowerConsumption = 0;
        for (let a = 0; a < buildings.length; a++) {
            for (let b = 0; b < buildings[a].length; b++) {
                for (let c = 0; c < buildings[a][b].length; c++) {
                    if (buildings[a][b][c].maxConsumption && buildings[a][b][c] && !buildings[a][b][c].preview) {
                        buildings[a][b][c].currentMaxConsumption = buildings[a][b][c].maxConsumption;
                        maxPowerConsumption += buildings[a][b][c].maxConsumption;
                        totalPowerConsumption += buildings[a][b][c].consumption;
                    }
                }
            }
        }

        for (let a = 0; a < powerPlants.length; a++) {
            for (let b = 0; b < powerPlants[a].length; b++) {
                if (powerPlants[a][b].currentMaxPower < totalPowerConsumption - totalPowerOutput) {
                    powerPlants[a][b].power = powerPlants[a][b].currentMaxPower;
                } else {
                    powerPlants[a][b].power = totalPowerConsumption - totalPowerOutput;
                }
                totalPowerOutput += powerPlants[a][b].power;
                totalPowerCapacity += powerPlants[a][b].currentMaxPower;
                maxPowerOutput += powerPlants[a][b].maxPower;
            }
        }
    } else {
        buildings[0] = powerPlants;
        maxPowerOutput = 0;
        totalPowerOutput = 0;
        totalPowerCapacity = 0;
        totalPowerConsumption = 0;
        maxPowerConsumption = 0;
        for (let a = 0; a < buildings.length; a++) {
            for (let b = 0; b < buildings[a].length; b++) {
                for (let c = 0; c < buildings[a][b].length; c++) {
                    if (buildings[a][b][c].maxConsumption && buildings[a][b][c] && !buildings[a][b][c].preview) {
                        buildings[a][b][c].currentMaxConsumption = 0;
                        buildings[a][b][c].consumption = 0;
                        maxPowerConsumption += buildings[a][b][c].maxConsumption;
                        totalPowerConsumption += buildings[a][b][c].consumption;
                    }
                }
            }
        }

        for (let a = 0; a > powerPlants.length; a++) {
            for (let b = 0; b < powerPlants[a].length; b++) {
                powerPlants[a][b].power = 0;
                powerPlants[a][b].currentMaxPower = 0;
                totalPowerOutput += powerPlants[a][b].power;
                totalPowerCapacity += powerPlants[a][b].currentMaxPower;
                maxPowerOutput += powerPlants[a][b].maxPower;
            }
        }
    }
    if (totalPowerOutput > maxPowerOutput) {
        // notifies the user that the grid has failed using the "totorial" display animation/function
        gridOnline = false;
        messageCategory = 1;
    } else if (totalPowerConsumption > totalPowerCapacity) {
        // notifies the user that the grid has failed in a catestrophic and fundemental level using the "totorial" display animation/function (also contains comedic disclaimer and information to get it fixed)
        gridOnline = false;
        messageCategory = 2;
    }

}

// track mouse location on mouse move
function mousemove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}


// track all key press events to see what is being pressed to allow the user to interact
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 13:
        // enter key pressed
        if (selected == 0) {
            var prom = prompt(`Enter New Savegame Name: `);
            if (prom == "saveGameIndex") {
                prom = false;
            }
            for (let i = 0; i < saveGameIndex.length - 1; i++) {
                if (prom == saveGameIndex[i]) {
                    prom = false;
                }
            };
            if (prom == false) {
                var prom = prompt(`Enter New Savegame Name(ALREADY USED or invalid): `);
            } else {
                saveGameIndex.push(prom);
                localStorage.setItem('saveGameIndex', JSON.stringify(saveGameIndex));
                selected = saveGameIndex.length - 1;
                saveGameIndex[1] = selected;
                localStorage.setItem('saveGameIndex', JSON.stringify(saveGameIndex));
                window.open('index.html');
                audio.muted = true;
            }
        } else {
            localStorage.setItem('saveGameIndex', JSON.stringify(saveGameIndex));
            // selected = saveGameIndex.length - 1;
            saveGameIndex[1] = selected;
            localStorage.setItem('saveGameIndex', JSON.stringify(saveGameIndex));
            window.open('index.html');
            audio.muted = true;
        }
        break;
        case 32:
        // spacebar pressed
        // move to next totorial line/segment
        messageLetterNum = 0;
        if (messages[messageCategory][message + 1]) {
            message += 1;
        } else {
            message = messages[messageCategory].length - 1
        }
        break;
        case 38:
        // up key pressed
        for (let a = 0; a < buildings.length; a++) {
            for (let b = 0; b < buildings[a].length; b++) {
                for (let c = 0; c < buildings[a][b].length; c++) {
                    if (buildings[a][b][c].r && a != 1) {
                        if (Math.sqrt(Math.pow(buildings[a][b][c].x - mouseX, 2) + Math.pow(buildings[a][b][c].y - mouseY, 2)) < buildings[a][b][c].r && !buildings[a][b][c].preview) {
                            if (buildings[a][b][c].preview) {
                                building.replace(Number(building.substring(building.length - 1)), Number(building.substring(building.length - 1)) + 1);
                            } else {
                                buildings[a][b][c].level += 1;
                                for (let d = 0; d < buildings.length; d++) {
                                    for (let e = 0; e < buildings[d].length; e++) {
                                        for (let f = 0; f < buildings[d][e].length; f++) {
                                           if (Math.sqrt(Math.pow(buildings[d][e][f].x - buildings[a][b][c].x, 2) + Math.pow(buildings[d][e][f].y - buildings[a][b][c].y, 2)) < buildings[d][e][f].r + buildings[a][b][c].r && !buildings[a][b][c].preview && !buildings[d][e][f].preview && buildings[a][b][c] != buildings[d][e][f] && d != 1) {
                                               buildings[a][b][c].level -= 1;
                                               break;
                                           }
                                        }
                                    }
                                }
                            }
                        }
                    } else if (buildings[a][b][c].wx) {
                        if (Math.abs(buildings[a][b][c].x - mouseX) < buildings[a][b][c].wx / 2 && Math.abs(buildings[a][b][c].y - mouseY) < buildings[a][b][c].wy / 2 && !buildings[a][b][c].preview) {
                            if (buildings[a][b][c].preview) {
                                building.replace(Number(building.substring(building.length - 1)), Number(building.substring(building.length - 1)) + 1);
                            } else {
                                buildings[a][b][c].level += 1;
                                for (let d = 0; d < buildings.length; d++) {
                                    for (let e = 0; e < buildings[d].length; e++) {
                                        for (let f = 0; f < buildings[d][e].length; f++) {
                                           if (Math.abs(buildings[a][b][c].x - buildings[d][e][f].x) < buildings[a][b][c].wx / 2 + buildings[d][e][f].wx / 2 && Math.abs(buildings[a][b][c].y - buildings[d][e][f].y) < buildings[a][b][c].wy / 2 + buildings[d][e][f].wy / 2 && !buildings[a][b][c].preview && !buildings[d][e][f].preview && buildings[a][b][c] != buildings[d][e][f]  && d != 1) {
                                               buildings[a][b][c].level -= 1;
                                               break;
                                           }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    gridOnline = true;
                    processGrid();
                    for (let a = 0; a < powerPlants.length; a++) {
                        for (let b = 0; b < powerPlants[a].length; b++) {
                            powerPlants[a][b].consumeFuel();
                        }
                    }
                }
            }
            gridOnline = true;
            processGrid();
            for (let a = 0; a < powerPlants.length; a++) {
                for (let b = 0; b < powerPlants[a].length; b++) {
                    powerPlants[a][b].consumeFuel();
                }
            }
            processGrid();
        }
        break;
        case 40:
        // down key pressed
        if (selected >= saveGameIndex.length - 2) {
            selected = 0;
        } else if (selected == 0) {
            selected += 2;
        } else {
            selected += 1;
        }
        break;
        case 46:
        // delete key pressed
        localStorage.removeItem(saveGameIndex.splice(selected, 1));
        if (selected > saveGameIndex.length - 1) {
            if (selected == 2) {
                selected -= 1;
            }
            selected -= 1;
        }
        break;
        case 66:
        // b key pressed
        if (!building) {
            building = "Building";
        }
        break;
        case 67:
        // c key pressed
        if (building == "Refineries") {
            building = "ComputerFactory l1";
            buildingCategory = 6;
            buildingType = 3;
            buildPreview(buildingCategory, buildingType);
        }
        case 69:
        // e key pressed
        if (building == "Building") {
            building = "Energy";
        }
        case 70:
        // f key pressed
        if (building == "Quarters") {
            building = "FamilyQuarter l1";
            buildingCategory = 2;
            buildingType = 0;
            buildPreview(buildingCategory, buildingType);
        } else if (building == "TransportFacilities") {
            building = "FuelRefinery l1";
            buildingCategory = 7;
            buildingType = 0;
            buildPreview(buildingCategory, buildingType);
        }
        break;
        case 76:
        // l key pressed
        if (building == "Building") {
            building = "Laboratories";
        } else if (building == "TransportFacilities") {
            building = "LaunchPad l1";
            buildingCategory = 7;
            buildingType = 1;
            buildPreview(buildingCategory, buildingType);
        }
        break; 
        case 77:
        // m key pressed
        if (building == "Building") {
            building = "Mines";
        } else if (building == "Mines") {
            building = "MetalOreMine l1";
            buildingCategory = 5;
            buildingType = 0;
            buildPreview(buildingCategory, buildingType);
        }
        case 78:
        // n key pressed
        if (building == "Energy") {
            building = "NuclearPowerPlant l1";
            buildingCategory = 0;
            buildingType = 1;
            buildPreview(buildingCategory, buildingType);
        }
        break;
        case 79:
        // o key pressed
        if (building == "Refineries") {
            building = "OxygenRecyclingPlant l1";
            buildingCategory = 6;
            buildingType = 2;
            buildPreview(buildingCategory, buildingType);
        }
        break;
        case 80:
        // p key pressed
        if (building == "Building") {
            building = "Plantations";
        } else if (building == "Plantations") {
            building = "PotatoFarm l1";
            buildingCategory = 4;
            buildingType = 0;
            buildPreview(buildingCategory, buildingType);
        }
        break;
        case 81:
        // q key pressed
        if (building == "Building") {
            building = "Quarters";
        }
        break;
        case 82:
        // r key pressed
        if (building == "Building") {
            building = "Refineries";
        } else if (!building) {
            gridOnline = true;
            processGrid()
            for (let a = 0; a < powerPlants.length; a++) {
                for (let b = 0; b < powerPlants[a].length; b++) {
                    powerPlants[a][b].consumeFuel();
                }
            }
        }
        break;
        case 83:
        // s key pressed
        if (building == "Laboratories") {
            building = "StandardLaboratory l1";
            buildingCategory = 3;
            buildingType = 0;
            buildPreview(buildingCategory, buildingType);
        } else if (building == "Refineries") {
            building = "Smelter l1";
            buildingCategory = 6;
            buildingType = 0;
            buildPreview(buildingCategory, buildingType);
        } else if (building == "Energy") {
            building = "SolarFarm l1";
            buildingCategory = 0;
            buildingType = 0;
            buildPreview(buildingCategory, buildingType);
        }
        break;
        case 84:
        // t key pressed
        if (building == "Building") {
            building = "TransportFacilities"
        }
        case 87:
        // w key pressed
        if (building == "Refineries") {
            building = "WaterPurificationPlant l1";
            buildingCategory = 6;
            buildingType = 1;
            buildPreview(buildingCategory, buildingType);
        }

    break;
    }
});


// make sure all relevent buildings consume fuel or make appropreate updates every ingame hour
function consume() {
    for (let a = 0; a < powerPlants.length; a++) {
        for (let b = 0; b < powerPlants[a].length; b++) {
            powerPlants[a][b].consumeFuel();
        }
    }
    nuclearFuel += 158.3323165536;
}

// keep track of individual minutes ingame and keep track of time
function clock() {
    // keep track of earth time
    eMins += 1;
    mMins += 1;
    if (eMins > 59) {
        eMins = 0;
        eHrs += 1;
        audio.play();
        if (eHrs > 23) {
            eHrs = 0;
            eDays += 1;
            if (eDays > 6) {
                eDays = 0;
                eWks += 1;
                if (eWks > 51) {
                    eWks = 0;
                    eYrs += 1;
                }
            }

            cycleTime += 1;
            if (cycleTime > 791) {
                // reset cycle time
                cycleTime = 0;
            }
            if (cycleTime == 517) {
                // earth sends rocket with fixed amount of supplies
                ePow = maxPowerConsumption;
                senColonists = colonists / 2;
            } else if (cycleTime == 365) {
                // earth gets research points/ smaples
                // no result from perspective of player
            } else if (cycleTime == 91) {
                // can send research points to earth if has rocket and not storm
                sentPoints = 0;
                if (rockets && !weather == "storm") {
                    for (let i = 0; i < rockets.length; i++) {
                        if (launchPads[rockets[i].launchPad] > rockets[i].maxFuel && researchPoints > rockets[i].capacity) {
                            sentPoints += rockets[i].capacity;
                            researchPoints -= rockets[i].capacity;
                            rocketFuel -= rockets[i].maxFuel;
                        }
                    }
                }
            } else if (cycleTime == 0) {
                // you recieve supplies from earth
                for (let i = 0; i < senColonists; i++) {
                    people.push(new buildingsClass[1][0]);
                    people[i].age = 25;
                    powerPlants = [solarFarms, nuclearPowerPlants];
                    beings = [people];
                    quarters = [familyQuarters];
                    laboratories = [standardLaboratories];
                    plantations = [potatoFarms];
                    mines = [metalOreMines];
                    refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
                    buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
                }
                nuclearFuel += 0.791661582768 * ePow;
                oxygen += 6.72 * senColonists;
                water += 0.109992 * senColonists;
                food += 40.669608 * senColonists;
                researchPoints += sentPoints * 10;
            }
        }
    }

    // keep trackX of generally more complex 24 hr 37 min martian days but better general
    if (mMins > 59) {
        mMins = 0;
        mHrs += 1;
    }
    if (mHrs > 23 && mMins > 36) {
        mHrs = 0;
        mMins = 0;
        mDays += 1;
        if (mDays > 6) {
            mDays = 0;
            mWks += 1;
            if (mWks > 3) {
                mWks = 0;
                mMons += 1;
                if (mMons > 23) {
                    mMons = 0;
                    mYrs += 1;
                    // random chance of a storm for a few months
                    if (Math.random < 0.333) {
                        weather = "storm";
                        setTimeout(function() {weather;}, 5040000)
                    }
                }
            }
        }
    }
    // get people to do science or wonder around using their internal function (see person.js science())
    for (let i = 0; i < people.length; i++) {
        people[i].science();
    }
}

// set the intervals for consume and tic to occur regularly simultaneously with everything else
let consum = setInterval(consume, 2500);
let tic = setInterval(clock, 41.67);
