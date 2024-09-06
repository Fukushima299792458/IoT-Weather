/*
// I am committed to being a person of integrity.
// This project is submitted as part of the assessment for Year 8 IST.
// This is all my own work. I have referenced any work used from other
// sources and have not plagiarised the work of others. // Phoenix Wulf
*/



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
    [
    `Note: you only have enough materials to build what is in the totorial until you make more. (space to continue)`, 
    `Congratulations! You have successfully landed all 12 colonists on mars. (space to continue)`, 
    `Your mission is to survive and thrive on the surface of this alien world. (space to continue)`, 
    `Your other objective will be to earn research points for the benifit of all humanity. (space to continue)`, 
    `First of all you are going to need a power source for your growing colony. (space to continue)`,
    `Press 'b'→'e'→'n' to build a nuclear powerplant.`, 
    `You can use shipments of nuclear Fuel at first but try to save it till the next shipment. (space to continue)`, 
    `If you want LATER you can press 'b'→'e'→'s' to build a solar farm to strech out your nuclear fuel`, 
    `Now that you have power you are going to need somewhere for your colonists to live. (space to continue)`, 
    `Press 'b'→'q'→'f' to build family quarters (hold shift to build more than one at a time). (space for more)`, 
    `For all your colonists you will need 3-5 family quarters or one level 3-5 family quarter. (space for more)`, 
    `To level up or upgrade a building hover over it and press '↑'/up arrow. (space to continue)`, 
    `Your also going to need mines to take minerals and resources from martian regolith. (space to continue)`, 
    `Press 'b'→'m'→'m' to build a metal ore mine. (space to continue)`, 
    `You will also need somewhere to refine this regolith and make it useful. (space to continue)`, 
    `Press 'b'→'r'→'s' to build a smelter (also makes enough water and oxygen for hundreds of people). (space to continue)`, 
    `You will need a lot of water to hydrate your colonists AND run a nuclear power plant. (space to continue)`, 
    `It will be very useful to recyle air and water. (space to continue)`, 
    `Press 'b'→'r'→'w' and 'b'→'r'→'o' for water and oxygen recyling plants respectively. (space to continue)`, 
    `Also, press 'b'→'r'→'c' to build a computer factory. (space to continue)`, 
    `Now that you have energy, quarters, mining and refining, and oxygen and water you need food. (space to continue)`, 
    `Press 'b'→'p'→'p' to build a potato plantation, this will feed 20 people. (space to continue)`, 
    `Now that you can survive on mars it is time to thrive. (space to continue)`, 
    `Press 'b'→'l'→'s' to build a standard laboratory for your colonists to do research in. (space to continue)`, 
    `For all your colonists you will need 6-10 standard laboratories or one level 6-10 standard laboratory. (space for more)`, 
    `Now just continue to build, expand and research waiting for the next shipment from earth. (space to continue)`, 
    `Note: 1 day ingame = 1 minute irl`, 
    `Note: colonists die without: oxygen for 1 day, water for 3 days, (space for more)`, 
    `accomodation for 7 days/1 week, food 42 days/6 weeks or by random chance every hour. (space to continue)`, 
    `Note: shipments come every 26 earth months aprox. 3 months till you can send research points to earth, (space for more)`, 
    `9 months till they get them, 5 months till they send you supplies (and potentially extra colonists), (space for more)`, 
    `9 months till you get supplies from earth (and potentially extra colonists) and rinse and repeat . . . (space to continue)`, 
    `Note: females who sleep in family quarters with a male have a chance of becoming pregnant. (space to continue)`, 
    `Note: build 'transport Facilities' to make rockets and send samples to earth for great reward every 26 months! (space to clear)`, 
    ``], [
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

let saveGameIndex = JSON.parse(localStorage.getItem('saveGameIndex'));
let saveGame = JSON.parse(localStorage.getItem(saveGameIndex[saveGameIndex[1]]));
let timeConsume;
if (saveGame != null) {
    timeConsume = saveGame[1];
    messages = [
        [``], [
        `WARNING! TOTAL GRID FALIURE AND SHUTDOWN. (space to continue)`, 
        `ALL SYNTHETIC LIFE SUPPORT SYSTEMS RUNNING ON GRID POWER WILL STOP OPERATING. (space to continue)`,
        `please contact tech support we can begin fixing this issue with 12 to 18 buisness months, (space to continue)`, 
        `wait times are currently at a low of four days with a latency of 22 minutes 34 seconds thank you for your patients. (space to clear)`, 
        ``], [
        `breaker triggered, all grid powered synthetic life support has shutdown. (space to clear)`, 
        ``]];
    eYrs = saveGame[1][0];
    eWks = saveGame[1][1];
    eDays = saveGame[1][2];
    eHrs = saveGame[1][3];
    eMins = saveGame[1][4];

    // time passed since landing on mars as measured in martian time (adapted martian calender units)
    mYrs = saveGame[1][5];
    mMons = saveGame[1][6];
    mWks = saveGame[1][7];
    mDays = saveGame[1][8];
    mHrs = saveGame[1][9];
    mMins = saveGame[1][10];
    cycleTime = saveGame[1][11];

    // POINT SYSTEM FOR THE GAME THAT KEEPS TRACK OF THE PLAYERS CURRENTLY POSSESED RESEARCH POINTS (EXCLUDING ONES BEING SENT TO EARTH)
    researchPoints = saveGame[1][12];

    // variables to keep track of the different materials 
    metalOre = saveGame[1][13];
    aluminium = saveGame[1][14];
    silicone = saveGame[1][15];
    carbon = saveGame[1][16];
    computerParts = saveGame[1][17];
    rocketFuel = saveGame[1][18];

    // variables to keep track of products mostly considerd watse to be recycled
    contaminatedWaterIce = saveGame[1][19];
    carbonDioxide = saveGame[1][20];

    // variables to keep track of consumables used by and directly keeping the colonists alive
    air = saveGame[1][21];
    oxygen = saveGame[1][22];
    water = saveGame[1][23];
    food = saveGame[1][24];
    nuclearFuel = saveGame[1][25];
    gridOnline = saveGame[1][26];

    maxPowerOutput = saveGame[1][27];
    totalPowerCapacity = saveGame[1][28];
    totalPowerOutput = saveGame[1][29];
    grossPowerConsumption = saveGame[1][30];
    totalPowerConsumption = saveGame[1][31];
    maxPowerConsumption = saveGame[1][32];
} else {

}

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

    // play and loop background space music
    let audio = document.createElement("AUDIO");

    if (audio.canPlayType("audio/mpeg")) {
        audio.setAttribute("src","spaceMusic.mp3");
    } else {
        audio.setAttribute("src","horse.ogg");
    }

    
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
    if (!messages[0][0] == ``) {
        for (let i = 0; i < 12; i++) {
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
    } else {
        for (let i = 0; i < saveGame[0][0][0].length; i++) {
            solarFarms.push(new buildingsClass[0][0]);
            solarFarms[solarFarms.length - 1].preview = saveGame[0][0][0][solarFarms.length - 1].preview;
            solarFarms[solarFarms.length - 1].encroached = saveGame[0][0][0][solarFarms.length - 1].encroached;
            solarFarms[solarFarms.length - 1].x = saveGame[0][0][0][solarFarms.length - 1].x;
            solarFarms[solarFarms.length - 1].y = saveGame[0][0][0][solarFarms.length - 1].y;
            solarFarms[solarFarms.length - 1].wx = saveGame[0][0][0][solarFarms.length - 1].wx;
            solarFarms[solarFarms.length - 1].wy = saveGame[0][0][0][solarFarms.length - 1].wy;
            solarFarms[solarFarms.length - 1].level = saveGame[0][0][0][solarFarms.length - 1].level;
            solarFarms[solarFarms.length - 1].maxPower = saveGame[0][0][0][solarFarms.length - 1].maxPower;
            solarFarms[solarFarms.length - 1].currentMaxPower = saveGame[0][0][0][solarFarms.length - 1].currentMaxPower;
            solarFarms[solarFarms.length - 1].power = saveGame[0][0][0][solarFarms.length - 1].power;
            solarFarms[solarFarms.length - 1].nuclearFuel = saveGame[0][0][0][solarFarms.length - 1].nuclearFuel;
            solarFarms[solarFarms.length - 1].water = saveGame[0][0][0][solarFarms.length - 1].water;
            solarFarms[solarFarms.length - 1].active = saveGame[0][0][0][solarFarms.length - 1].active;

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
        for (let i = 0; i < saveGame[0][0][1].length; i++) {
            nuclearPowerPlants.push(new buildingsClass[0][1]);
            nuclearPowerPlants[nuclearPowerPlants.length - 1].preview = saveGame[0][0][1][nuclearPowerPlants.length - 1].preview;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].encroached = saveGame[0][0][1][nuclearPowerPlants.length - 1].encroached;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].x = saveGame[0][0][1][nuclearPowerPlants.length - 1].x;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].y = saveGame[0][0][1][nuclearPowerPlants.length - 1].y;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].r = saveGame[0][0][1][nuclearPowerPlants.length - 1].r;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].level = saveGame[0][0][1][nuclearPowerPlants.length - 1].level;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].maxPower = saveGame[0][0][1][nuclearPowerPlants.length - 1].maxPower;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].currentMaxPower = saveGame[0][0][1][nuclearPowerPlants.length - 1].currentMaxPower;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].power = saveGame[0][0][1][nuclearPowerPlants.length - 1].power;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].nuclearFuel = saveGame[0][0][1][nuclearPowerPlants.length - 1].nuclearFuel;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].water = saveGame[0][0][1][nuclearPowerPlants.length - 1].water;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].active = saveGame[0][0][1][nuclearPowerPlants.length - 1].active;

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
        for (let i = 0; i < saveGame[0][1][0].length; i++) {
            people.push(new buildingsClass[1][0]);
            people[people.length - 1].preview = saveGame[0][1][0][people.length - 1].preview;
            people[people.length - 1].encroached = saveGame[0][1][0][people.length - 1].encroached;
            people[people.length - 1].x = saveGame[0][1][0][people.length - 1].x;
            people[people.length - 1].y = saveGame[0][1][0][people.length - 1].y;
            people[people.length - 1].r = saveGame[0][1][0][people.length - 1].r;
            // keep track of vitals and a
            people[people.length - 1].oxygen = saveGame[0][1][0][people.length - 1].oxygen;
            people[people.length - 1].water = saveGame[0][1][0][people.length - 1].water;
            people[people.length - 1].accomodation = saveGame[0][1][0][people.length - 1].accomodation;
            people[people.length - 1].food = saveGame[0][1][0][people.length - 1].food;
            people[people.length - 1].age = saveGame[0][1][0][people.length - 1].age;
            // randomly select sex
            people[people.length - 1].sex = saveGame[0][1][0][people.length - 1].sex;
            // keep track of where person is going
            people[people.length - 1].destinationX = saveGame[0][1][0][people.length - 1].destinationX;
            people[people.length - 1].destinationY = saveGame[0][1][0][people.length - 1].destinationY;
            people[people.length - 1].speed = saveGame[0][1][0][people.length - 1].speed;
            // keep track of the current task
            people[people.length - 1].task = saveGame[0][1][0][people.length - 1].task;
            // set all properties to keep track of house
            people[people.length - 1].accomodationX = saveGame[0][1][0][people.length - 1].accomodationX;
            people[people.length - 1].accomodationY = saveGame[0][1][0][people.length - 1].accomodationY;
            people[people.length - 1].accomodationType = saveGame[0][1][0][people.length - 1].accomodationType;
            people[people.length - 1].accomodationId = saveGame[0][1][0][people.length - 1].accomodationId;
            // set all properties to keep track of laboratory
            people[people.length - 1].laboratoryX = saveGame[0][1][0][people.length - 1].laboratoryX;
            people[people.length - 1].laboratoryY = saveGame[0][1][0][people.length - 1].laboratoryY;
            people[people.length - 1].laboratoryType = saveGame[0][1][0][people.length - 1].laboratoryType;
            people[people.length - 1].laboratoryId = saveGame[0][1][0][people.length - 1].laboratoryId;
            // set status i.e. sex, age/child and name
            people[people.length - 1].idle = saveGame[0][1][0][people.length - 1].idle;
            people[people.length - 1].child = saveGame[0][1][0][people.length - 1].child;
            // randomly select name based on sex
            people[people.length - 1].name = saveGame[0][1][0][people.length - 1].name;
            people[people.length - 1].sleep = saveGame[0][1][0][people.length - 1].sleep;
            people[people.length - 1].pregnant = saveGame[0][1][0][people.length - 1].pregnant;
            people[people.length - 1].maternity = saveGame[0][1][0][people.length - 1].maternity;

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
        for (let i = 0; i < saveGame[0][2][0].length; i++) {
            familyQuarters.push(new buildingsClass[2][0]);
            familyQuarters[familyQuarters.length - 1].preview = saveGame[0][2][0][familyQuarters.length - 1].preview;
            familyQuarters[familyQuarters.length - 1].encroached = saveGame[0][2][0][familyQuarters.length - 1].encroached;
            familyQuarters[familyQuarters.length - 1].x = saveGame[0][2][0][familyQuarters.length - 1].x;
            familyQuarters[familyQuarters.length - 1].y = saveGame[0][2][0][familyQuarters.length - 1].y;
            familyQuarters[familyQuarters.length - 1].r = saveGame[0][2][0][familyQuarters.length - 1].r;
            familyQuarters[familyQuarters.length - 1].level = saveGame[0][2][0][familyQuarters.length - 1].level;
            familyQuarters[familyQuarters.length - 1].consumption = saveGame[0][2][0][familyQuarters.length - 1].consumption;
            familyQuarters[familyQuarters.length - 1].maxConsumption = saveGame[0][2][0][familyQuarters.length - 1].maxConsumption;
            familyQuarters[familyQuarters.length - 1].maxOccupancy = saveGame[0][2][0][familyQuarters.length - 1].maxOccupancy;
            familyQuarters[familyQuarters.length - 1].currentMaxConsumption = saveGame[0][2][0][familyQuarters.length - 1].currentMaxOccupancy;
            familyQuarters[familyQuarters.length - 1].occupancy = saveGame[0][2][0][familyQuarters.length - 1].occupancy;
            familyQuarters[familyQuarters.length - 1].fertile = saveGame[0][2][0][familyQuarters.length - 1].fertile;


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
        for (let i = 0; i < saveGame[0][3][0].length; i++) {
            standardLaboratories.push(new buildingsClass[3][0]);
            standardLaboratories[standardLaboratories.length - 1].preview = saveGame[0][3][0][standardLaboratories.length - 1].preview;
            standardLaboratories[standardLaboratories.length - 1].encroached = saveGame[0][3][0][standardLaboratories.length - 1].encroached;
            standardLaboratories[standardLaboratories.length - 1].x = saveGame[0][3][0][standardLaboratories.length - 1].x;
            standardLaboratories[standardLaboratories.length - 1].y = saveGame[0][3][0][standardLaboratories.length - 1].y;
            standardLaboratories[standardLaboratories.length - 1].wx = saveGame[0][3][0][standardLaboratories.length - 1].r;
            standardLaboratories[standardLaboratories.length - 1].level = saveGame[0][3][0][standardLaboratories.length - 1].level;
            standardLaboratories[standardLaboratories.length - 1].consumption = saveGame[0][3][0][standardLaboratories.length - 1].consumption;
            standardLaboratories[standardLaboratories.length - 1].maxConsumption = saveGame[0][3][0][standardLaboratories.length - 1].maxConsumption;
            standardLaboratories[standardLaboratories.length - 1].maxOccupancy = saveGame[0][3][0][standardLaboratories.length - 1].maxOccupancy;
            standardLaboratories[standardLaboratories.length - 1].currentMaxOccupancy = saveGame[0][3][0][standardLaboratories.length - 1].currentMaxOccupancy;
            standardLaboratories[standardLaboratories.length - 1].occupancy = saveGame[0][3][0][standardLaboratories.length - 1].occupancy;

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
        for (let i = 0; i < saveGame[0][4][0].length; i++) {
            potatoFarms.push(new buildingsClass[4][0]);
            potatoFarms[potatoFarms.length - 1].preview = saveGame[0][4][0][potatoFarms.length - 1].preview;
            potatoFarms[potatoFarms.length - 1].encroached = saveGame[0][4][0][potatoFarms.length - 1].encroached;
            potatoFarms[potatoFarms.length - 1].x = saveGame[0][4][0][potatoFarms.length - 1].x;
            potatoFarms[potatoFarms.length - 1].y = saveGame[0][4][0][potatoFarms.length - 1].y;
            potatoFarms[potatoFarms.length - 1].wx = saveGame[0][4][0][potatoFarms.length - 1].wx;
            potatoFarms[potatoFarms.length - 1].wy = saveGame[0][4][0][potatoFarms.length - 1].wy;
            potatoFarms[potatoFarms.length - 1].level = saveGame[0][4][0][potatoFarms.length - 1].level;
            potatoFarms[potatoFarms.length - 1].maxConsumption = saveGame[0][4][0][potatoFarms.length - 1].maxConsumption;
            potatoFarms[potatoFarms.length - 1].consumption = saveGame[0][4][0][potatoFarms.length - 1].consumption;
            potatoFarms[potatoFarms.length - 1].maxProduction = saveGame[0][4][0][potatoFarms.length - 1].maxProduction;
            potatoFarms[potatoFarms.length - 1].currentMaxProduction = saveGame[0][4][0][potatoFarms.length - 1].currentMaxProduction;
            potatoFarms[potatoFarms.length - 1].active = saveGame[0][4][0][potatoFarms.length - 1].active;
            potatoFarms[potatoFarms.length - 1].water = saveGame[0][4][0][potatoFarms.length - 1].water;
            potatoFarms[potatoFarms.length - 1].food = saveGame[0][4][0][potatoFarms.length - 1].food;

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
        for (let i = 0; i < saveGame[0][5][0].length; i++) {
            metalOreMines.push(new buildingsClass[5][0]);
            metalOreMines[metalOreMines.length - 1].preview = saveGame[0][5][0][metalOreMines.length - 1].preview;
            metalOreMines[metalOreMines.length - 1].encroached = saveGame[0][5][0][metalOreMines.length - 1].encroached;
            metalOreMines[metalOreMines.length - 1].x = saveGame[0][5][0][metalOreMines.length - 1].x;
            metalOreMines[metalOreMines.length - 1].y = saveGame[0][5][0][metalOreMines.length - 1].y;
            metalOreMines[metalOreMines.length - 1].wx = saveGame[0][5][0][metalOreMines.length - 1].wx;
            metalOreMines[metalOreMines.length - 1].wy = saveGame[0][5][0][metalOreMines.length - 1].wy;
            metalOreMines[metalOreMines.length - 1].level = saveGame[0][5][0][metalOreMines.length - 1].level;
            metalOreMines[metalOreMines.length - 1].maxConsumption = saveGame[0][5][0][metalOreMines.length - 1].maxConsumption;
            metalOreMines[metalOreMines.length - 1].consumption = saveGame[0][5][0][metalOreMines.length - 1].consumption;
            metalOreMines[metalOreMines.length - 1].maxProduction = saveGame[0][5][0][metalOreMines.length - 1].maxProduction;
            metalOreMines[metalOreMines.length - 1].currentMaxProduction = saveGame[0][5][0][metalOreMines.length - 1].currentMaxProduction;
            metalOreMines[metalOreMines.length - 1].active = saveGame[0][5][0][metalOreMines.length - 1].active;

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
        for (let i = 0; i < saveGame[0][6][0].length; i++) {
            smelters.push(new buildingsClass[6][0]);
            smelters[smelters.length - 1].preview = saveGame[0][6][0][smelters.length - 1].preview;
            smelters[smelters.length - 1].encroached = saveGame[0][6][0][smelters.length - 1].encroached;
            smelters[smelters.length - 1].x = saveGame[0][6][0][smelters.length - 1].x;
            smelters[smelters.length - 1].y = saveGame[0][6][0][smelters.length - 1].y;
            smelters[smelters.length - 1].wx = saveGame[0][6][0][smelters.length - 1].wx;
            smelters[smelters.length - 1].wy = saveGame[0][6][0][smelters.length - 1].wy;
            smelters[smelters.length - 1].level = saveGame[0][6][0][smelters.length - 1].level;
            smelters[smelters.length - 1].maxConsumption = saveGame[0][6][0][smelters.length - 1].maxConsumption;
            smelters[smelters.length - 1].consumption = saveGame[0][6][0][smelters.length - 1].consumption;
            smelters[smelters.length - 1].maxProduction = saveGame[0][6][0][smelters.length - 1].maxProduction;
            smelters[smelters.length - 1].currentMaxProduction = saveGame[0][6][0][smelters.length - 1].currentMaxProduction;
            smelters[smelters.length - 1].active = saveGame[0][6][0][smelters.length - 1].active;

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
        for (let i = 0; i < saveGame[0][6][1].length; i++) {
            waterPurificationPlants.push(new buildingsClass[6][1]);
            waterPurificationPlants[waterPurificationPlants.length - 1].preview = saveGame[0][6][1][waterPurificationPlants.length - 1].preview;
            waterPurificationPlants[waterPurificationPlants.length - 1].encroached = saveGame[0][6][1][waterPurificationPlants.length - 1].encroached;
            waterPurificationPlants[waterPurificationPlants.length - 1].x = saveGame[0][6][1][waterPurificationPlants.length - 1].x;
            waterPurificationPlants[waterPurificationPlants.length - 1].y = saveGame[0][6][1][waterPurificationPlants.length - 1].y;
            waterPurificationPlants[waterPurificationPlants.length - 1].wx = saveGame[0][6][1][waterPurificationPlants.length - 1].wx;
            waterPurificationPlants[waterPurificationPlants.length - 1].wy = saveGame[0][6][1][waterPurificationPlants.length - 1].wy;
            waterPurificationPlants[waterPurificationPlants.length - 1].level = saveGame[0][6][1][waterPurificationPlants.length - 1].level;
            waterPurificationPlants[waterPurificationPlants.length - 1].maxConsumption = saveGame[0][6][1][waterPurificationPlants.length - 1].maxConsumption;
            waterPurificationPlants[waterPurificationPlants.length - 1].consumption = saveGame[0][6][1][waterPurificationPlants.length - 1].consumption;
            waterPurificationPlants[waterPurificationPlants.length - 1].maxProduction = saveGame[0][6][1][waterPurificationPlants.length - 1].maxProduction;
            waterPurificationPlants[waterPurificationPlants.length - 1].currentMaxProduction = saveGame[0][6][1][waterPurificationPlants.length - 1].currentMaxProduction;
            waterPurificationPlants[waterPurificationPlants.length - 1].active = saveGame[0][6][1][waterPurificationPlants.length - 1].active;

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
        for (let i = 0; i < saveGame[0][6][2].length; i++) {
            oxygenRecyclingPlants.push(new buildingsClass[6][2]);
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].preview = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].preview;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].encroached = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].encroached;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].x = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].x;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].y = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].y;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].wx = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].wx;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].wy = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].wy;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].level = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].level;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].maxConsumption = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].maxConsumption;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].consumption = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].consumption;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].maxProduction = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].maxProduction;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].currentMaxProduction = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].currentMaxProduction;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].active = saveGame[0][6][2][oxygenRecyclingPlants.length - 1].active;

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
        for (let i = 0; i < saveGame[0][6][3].length; i++) {
            computerFactories.push(new buildingsClass[6][3]);
            computerFactories[computerFactories.length - 1].preview = saveGame[0][6][3][computerFactories.length - 1].preview;
            computerFactories[computerFactories.length - 1].encroached = saveGame[0][6][3][computerFactories.length - 1].encroached;
            computerFactories[computerFactories.length - 1].x = saveGame[0][6][3][computerFactories.length - 1].x;
            computerFactories[computerFactories.length - 1].y = saveGame[0][6][3][computerFactories.length - 1].y;
            computerFactories[computerFactories.length - 1].wx = saveGame[0][6][3][computerFactories.length - 1].wx;
            computerFactories[computerFactories.length - 1].wy = saveGame[0][6][3][computerFactories.length - 1].wy;
            computerFactories[computerFactories.length - 1].level = saveGame[0][6][3][computerFactories.length - 1].level;
            computerFactories[computerFactories.length - 1].maxConsumption = saveGame[0][6][3][computerFactories.length - 1].maxConsumption;
            computerFactories[computerFactories.length - 1].consumption = saveGame[0][6][3][computerFactories.length - 1].consumption;
            computerFactories[computerFactories.length - 1].maxProduction = saveGame[0][6][3][computerFactories.length - 1].maxProduction;
            computerFactories[computerFactories.length - 1].currentMaxProduction = saveGame[0][6][3][computerFactories.length - 1].currentMaxProduction;
            computerFactories[computerFactories.length - 1].active = saveGame[0][6][3][computerFactories.length - 1].active;

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
        for (let i = 0; i < saveGame[0][7][0].length; i++) {
            fuelRefineries.push(new buildingsClass[7][0]);
            fuelRefineries[fuelRefineries.length - 1].preview = saveGame[0][7][0][fuelRefineries.length - 1].preview;
            fuelRefineries[fuelRefineries.length - 1].encroached = saveGame[0][7][0][fuelRefineries.length - 1].encroached;
            fuelRefineries[fuelRefineries.length - 1].x = saveGame[0][7][0][fuelRefineries.length - 1].x;
            fuelRefineries[fuelRefineries.length - 1].y = saveGame[0][7][0][fuelRefineries.length - 1].y;
            fuelRefineries[fuelRefineries.length - 1].wx = saveGame[0][7][0][fuelRefineries.length - 1].wx;
            fuelRefineries[fuelRefineries.length - 1].wy = saveGame[0][7][0][fuelRefineries.length - 1].wy;
            fuelRefineries[fuelRefineries.length - 1].level = saveGame[0][7][0][fuelRefineries.length - 1].level;
            fuelRefineries[fuelRefineries.length - 1].maxPower = saveGame[0][7][0][fuelRefineries.length - 1].maxPower;
            fuelRefineries[fuelRefineries.length - 1].power = saveGame[0][7][0][fuelRefineries.length - 1].power;
            fuelRefineries[fuelRefineries.length - 1].production = saveGame[0][7][0][fuelRefineries.length - 1].production;
            fuelRefineries[fuelRefineries.length - 1].active = saveGame[0][7][0][fuelRefineries.length - 1].active;

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
        for (let i = 0; i < saveGame[0][7][1].length; i++) {
            launchPads.push(new buildingsClass[7][1]);
            launchPads[launchPads.length - 1].preview = saveGame[0][7][1][launchPads.length - 1].preview;
            launchPads[launchPads.length - 1].encroached = saveGame[0][7][1][launchPads.length - 1].encroached;
            launchPads[launchPads.length - 1].x = saveGame[0][7][1][launchPads.length - 1].x;
            launchPads[launchPads.length - 1].y = saveGame[0][7][1][launchPads.length - 1].y;
            launchPads[launchPads.length - 1].wx = saveGame[0][7][1][launchPads.length - 1].wx;
            launchPads[launchPads.length - 1].wy = saveGame[0][7][1][launchPads.length - 1].wy;
            launchPads[launchPads.length - 1].level = saveGame[0][7][1][launchPads.length - 1].level;
            launchPads[launchPads.length - 1].maxFuel = saveGame[0][7][1][launchPads.length - 1].maxFuel;
            launchPads[launchPads.length - 1].rocketFuel = saveGame[0][7][1][launchPads.length - 1].rocketFuel;
            launchPads[launchPads.length - 1].maxPower = saveGame[0][7][1][launchPads.length - 1].maxPower;
            launchPads[launchPads.length - 1].power = saveGame[0][7][1][launchPads.length - 1].power;
            launchPads[launchPads.length - 1].active = saveGame[0][7][1][launchPads.length - 1].active;

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
        for (let i = 0; i < saveGame[0][7][2].length; i++) {
            rockets.push(new buildingsClass[7][2]);
            rockets[rockets.length - 1].preview = saveGame[0][7][2][rockets.length - 1].preview;
            rockets[rockets.length - 1].encroached = saveGame[0][7][2][rockets.length - 1].encroached;
            rockets[rockets.length - 1].x = saveGame[0][7][2][rockets.length - 1].x;
            rockets[rockets.length - 1].y = saveGame[0][7][2][rockets.length - 1].y;
            rockets[rockets.length - 1].wx = saveGame[0][7][2][rockets.length - 1].wx;
            rockets[rockets.length - 1].wy = saveGame[0][7][2][rockets.length - 1].wy;
            rockets[rockets.length - 1].level = saveGame[0][7][2][rockets.length - 1].level;
            rockets[rockets.length - 1].active = saveGame[0][7][2][rockets.length - 1].active;
            rockets[rockets.length - 1].launchPad = saveGame[0][7][2][rockets.length - 1].launchPad;

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
    saveGame = [buildings, timeConsume];
    localStorage.setItem(saveGameIndex[saveGameIndex[1]], JSON.stringify(saveGame))
}

function draw() {
    saveGame = [buildings, timeConsume];
    localStorage.setItem(saveGameIndex[saveGameIndex[1]], JSON.stringify(saveGame))
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
    
    context.textAlign = "center";

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
        if (building.includes("SolarFarm l") && aluminium >= 5 && silicone >= 15 && !solarFarms[solarFarms.length - 1].encroached) {
            aluminium -= 5;
            silicone -= 15;
            gridOnline = true;
            solarFarms[solarFarms.length - 1].preview = false;
            solarFarms[solarFarms.length - 1].level = Number(building.substring(building.length - 1));
            powerPlants = [solarFarms, nuclearPowerPlants];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && aluminium >= 5 && silicone >= 15) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("NuclearPowerPlant l") && silicone >= 35 && aluminium >= 8 && carbon >= 3 && computerParts >= 10 && !nuclearPowerPlants[nuclearPowerPlants.length - 1].encroached) {
            silicone -= 35;
            carbon -= 3;
            aluminium -= 8;
            computerParts -= 10;
            gridOnline = true;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].preview = false;
            nuclearPowerPlants[nuclearPowerPlants.length - 1].level = Number(building.substring(building.length - 1));
            powerPlants = [solarFarms, nuclearPowerPlants];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && silicone >= 35 && aluminium >= 8 && carbon >= 3 && computerParts >= 10) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("FamilyQuarter l1") && aluminium >= 8 && silicone >= 8 && carbon >= 4 && !familyQuarters[familyQuarters.length - 1].encroached) {
            aluminium -= 8;
            silicone -= 8;
            carbon -= 4;
            familyQuarters[familyQuarters.length - 1].preview = false;
            familyQuarters[familyQuarters.length - 1].level = Number(building.substring(building.length - 1));
            quarters = [familyQuarters];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && aluminium >= 8 && silicone >= 8 && carbon >= 4) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("StandardLaboratory l") && silicone >= 20 && carbon >= 20 && computerParts >= 20 && !standardLaboratories[standardLaboratories.length - 1].encroached) {
            silicone -= 20;
            carbon -= 20;
            computerParts -= 20;
            standardLaboratories[standardLaboratories.length - 1].preview = false;
            standardLaboratories[standardLaboratories.length - 1].level = Number(building.substring(building.length - 1));
            laboratories = [standardLaboratories];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && silicone >= 20 && carbon >= 20 && computerParts >= 20) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("PotatoFarm l1") && silicone >= 10 && aluminium >= 5 && computerParts >= 1 && !potatoFarms[potatoFarms.length - 1].encroached) {
            silicone -= 10;
            aluminium -= 5;
            computerParts -= 1;
            potatoFarms[potatoFarms.length - 1].preview = false;
            potatoFarms[potatoFarms.length - 1].level = Number(building.substring(building.length - 1));
            plantations = [potatoFarms];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && silicone >= 10 && aluminium >= 5 && computerParts >= 1) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("MetalOreMine l") && aluminium >= 4 && computerParts >= 1 && !metalOreMines[metalOreMines.length - 1].encroached) {
            aluminium -= 4;
            computerParts -= 1;
            metalOreMines[metalOreMines.length - 1].preview = false;
            metalOreMines[metalOreMines.length - 1].level = Number(building.substring(building.length - 1));
            mines = [metalOreMines];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && aluminium >= 4 && computerParts >= 1) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("Smelter l1") && carbon >= 8 && aluminium >= 4 && silicone >= 1 && !smelters[smelters.length - 1].encroached) {
            carbon -= 8;
            aluminium -= 4;
            silicone -= 1;
            smelters[smelters.length - 1].preview = false;
            smelters[smelters.length - 1].level = Number(building.substring(building.length - 1));
            refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && carbon >= 8 && aluminium >= 4 && silicone >= 1) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("WaterPurificationPlant l") && aluminium >= 10 && silicone >= 5 && !waterPurificationPlants[waterPurificationPlants.length - 1].encroached) {
            aluminium -= 10;
            silicone -= 5;
            waterPurificationPlants[waterPurificationPlants.length - 1].preview = false;
            waterPurificationPlants[waterPurificationPlants.length - 1].level = Number(building.substring(building.length - 1));
            refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && aluminium >= 10 && silicone >= 5) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("OxygenRecyclingPlant l") && carbon >= 4 && silicone >= 3 && aluminium >= 5 && !oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].encroached) {
            aluminium -= 5;
            silicone -= 3;
            carbon -= 4;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].preview = false;
            oxygenRecyclingPlants[oxygenRecyclingPlants.length - 1].level = Number(building.substring(building.length - 1));
            refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && carbon >= 4 && silicone >= 3 && aluminium >= 5) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("ComputerFactory l") && aluminium >= 4 && silicone >= 6 && carbon >= 5 && computerParts >= 12 && !computerFactories[computerFactories.length - 1].encroached) {
            aluminium -= 4;
            silicone -= 6;
            carbon -= 5;
            computerParts -= 12;
            computerFactories[computerFactories.length - 1].preview = false;
            computerFactories[computerFactories.length - 1].level = Number(building.substring(building.length - 1));
            refineries = [smelters, waterPurificationPlants, oxygenRecyclingPlants, computerFactories];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && aluminium >= 4 && silicone >= 6 && carbon >= 5 && computerParts >= 12) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("FuelRefinery l") && aluminium >= 20 && silicone >= 15 && !fuelRefineries[fuelRefineries.length - 1].encroached) {
            aluminium -= 20;
            silicone -= 15;
            fuelRefineries[fuelRefineries.length - 1].preview = false;
            fuelRefineries[fuelRefineries.length - 1].level = Number(building.substring(building.length - 1));
            transportFacilities = [fuelRefineries, launchPads, rockets];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && aluminium >= 20 && silicone >= 15) {
                buildPreview(buildingCategory, buildingType);
            } else {
                building = false;
            }
        } else if (building.includes("LaunchPad l") && aluminium >= 5 && !launchPads[launchPads.length - 1].encroached) {
            aluminium -= 5;
            launchPads[launchPads.length - 1].preview = false;
            launchPads[launchPads.length - 1].level = Number(building.substring(building.length - 1));
            transportFacilities = [fuelRefineries, launchPads, rockets];
            buildings = [powerPlants, beings, quarters, laboratories, plantations, mines, refineries, transportFacilities];
            if (keyIsDown(SHIFT) && aluminium >= 5) {
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
                    if (buildings[a][b][c].maxConsumption && buildings[a][b][c].consumption && !buildings[a][b][c].preview) {
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
                    if (buildings[a][b][c].maxConsumption && buildings[a][b][c].consumption && !buildings[a][b][c].preview) {
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
        // up arrow pressed
        for (let a = 0; a < buildings.length; a++) {
            for (let b = 0; b < buildings[a].length; b++) {
                for (let c = 0; c < buildings[a][b].length; c++) {
                    if (buildings[a][b][c].r && a != 1) {
                        if (Math.sqrt(Math.pow(buildings[a][b][c].x - mouseX, 2) + Math.pow(buildings[a][b][c].y - mouseY, 2)) < buildings[a][b][c].r && !buildings[a][b][c].preview) {
                            if (buildings[a][b][c].preview) {
                                building.replace(Number(building.substring(building.length - 1)), Number(building.substring(building.length - 1)) + 1);
                            } else if (aluminium >= buildings[a][b][c].materials[0] && silicone >= buildings[a][b][c].materials[1] &&  carbon >= buildings[a][b][c].materials[2] && computerParts >= buildings[a][b][c].materials[3]) {
                                aluminium -= buildings[a][b][c].materials[0];
                                silicone -= buildings[a][b][c].materials[1];
                                carbon -= buildings[a][b][c].materials[2];
                                computerParts -= buildings[a][b][c].materials[3];
                                buildings[a][b][c].level += 1;
                                for (let d = 0; d < buildings.length; d++) {
                                    for (let e = 0; e < buildings[d].length; e++) {
                                        for (let f = 0; f < buildings[d][e].length; f++) {
                                           if (Math.sqrt(Math.pow(buildings[d][e][f].x - buildings[a][b][c].x, 2) + Math.pow(buildings[d][e][f].y - buildings[a][b][c].y, 2)) < buildings[d][e][f].r + buildings[a][b][c].r && !buildings[a][b][c].preview && !buildings[d][e][f].preview && buildings[a][b][c] != buildings[d][e][f] && d != 1) {
                                                buildings[a][b][c].level -= 1;
                                                aluminium += buildings[a][b][c].materials[0];
                                                silicone += buildings[a][b][c].materials[1];
                                                carbon += buildings[a][b][c].materials[2];
                                                computerParts += buildings[a][b][c].materials[3];
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
                            } else if (aluminium >= buildings[a][b][c].materials[0] && silicone >= buildings[a][b][c].materials[1] &&  carbon >= buildings[a][b][c].materials[2] && computerParts >= buildings[a][b][c].materials[3]) {
                                aluminium -= buildings[a][b][c].materials[0];
                                silicone -= buildings[a][b][c].materials[1];
                                carbon -= buildings[a][b][c].materials[2];
                                computerParts -= buildings[a][b][c].materials[3];
                                buildings[a][b][c].level += 1;
                                for (let d = 0; d < buildings.length; d++) {
                                    for (let e = 0; e < buildings[d].length; e++) {
                                        for (let f = 0; f < buildings[d][e].length; f++) {
                                           if (Math.abs(buildings[a][b][c].x - buildings[d][e][f].x) < buildings[a][b][c].wx / 2 + buildings[d][e][f].wx / 2 && Math.abs(buildings[a][b][c].y - buildings[d][e][f].y) < buildings[a][b][c].wy / 2 + buildings[d][e][f].wy / 2 && !buildings[a][b][c].preview && !buildings[d][e][f].preview && buildings[a][b][c] != buildings[d][e][f]  && d != 1) {
                                                buildings[a][b][c].level -= 1;
                                                aluminium += buildings[a][b][c].materials[0];
                                                silicone += buildings[a][b][c].materials[1];
                                                carbon += buildings[a][b][c].materials[2];
                                                computerParts += buildings[a][b][c].materials[3];
                                               break;
                                           }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
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
        if (building == "Refineries" && aluminium >= 4 && silicone >= 6 && carbon >= 5 && computerParts >= 12) {
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
        if (building == "Quarters" && aluminium >= 8 && silicone >= 8 && carbon >= 4) {
            building = "FamilyQuarter l1";
            buildingCategory = 2;
            buildingType = 0;
            buildPreview(buildingCategory, buildingType);
        } else if (building == "TransportFacilities" && aluminium >= 20 && silicone >= 15) {
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
        } else if (building == "TransportFacilities" && aluminium >= 5) {
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
        } else if (building == "Mines" && aluminium >= 4 && computerParts >= 1) {
            building = "MetalOreMine l1";
            buildingCategory = 5;
            buildingType = 0;
            buildPreview(buildingCategory, buildingType);
        }
        case 78:
        // n key pressed
        if (building == "Energy" && silicone >= 35 && aluminium >= 8 && carbon >= 3 && computerParts >= 10) {
            building = "NuclearPowerPlant l1";
            buildingCategory = 0;
            buildingType = 1;
            buildPreview(buildingCategory, buildingType);
        }
        break;
        case 79:
        // o key pressed
        if (building == "Refineries" && carbon >= 4 && silicone >= 3 && aluminium >= 5) {
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
        } else if (building == "Plantations" && silicone >= 10 && aluminium >= 5 && computerParts >= 1) {
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
            processGrid();
            for (let a = 0; a < powerPlants.length; a++) {
                for (let b = 0; b < powerPlants[a].length; b++) {
                    powerPlants[a][b].consumeFuel();
                }
            }
        }
        break;
        case 83:
        // s key pressed
        if (building == "Laboratories" && silicone >= 20 && carbon >= 20 && computerParts >= 20) {
            building = "StandardLaboratory l1";
            buildingCategory = 3;
            buildingType = 0;
            buildPreview(buildingCategory, buildingType);
        } else if (building == "Refineries" && carbon >= 8 && aluminium >= 4 && silicone >= 1) {
            building = "Smelter l1";
            buildingCategory = 6;
            buildingType = 0;
            buildPreview(buildingCategory, buildingType);
        } else if (building == "Energy" && aluminium >= 5 && silicone >= 15) {
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
        if (building == "Refineries" && aluminium >= 10 && silicone >= 5) {
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
    for (let a = 0; a < buildings.length; a++) {
        for (let b = 0; b < buildings[a].length; b++) {
            for (let c = 0; c < buildings[a][b].length; c++) {
                buildings[a][b][c].consumeFuel();
            }
        }
    }
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
                    people[people.length].age = 25;
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
    timeConsume = [eYrs, eWks, eDays, eHrs, eMins, mYrs, mMons, mWks, mDays, mHrs, mMins, cycleTime, researchPoints, metalOre, aluminium, silicone, carbon, computerParts, rocketFuel, contaminatedWaterIce, carbonDioxide, air, oxygen, water, food, nuclearFuel, gridOnline, maxPowerOutput, totalPowerCapacity, totalPowerOutput, grossPowerConsumption, totalPowerConsumption, maxPowerConsumption];
}

// set the intervals for consume and tic to occur regularly simultaneously with everything else
let consum = setInterval(consume, 2500);
let tic = setInterval(clock, 41.67);
