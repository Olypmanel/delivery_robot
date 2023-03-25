import RobotBrawn from "./robot_brawn.js";
import RobotBrain from "./robot_brain.js";

const runRobot = (RobotBrawn, RobotBrain, memory = { route: [], dist: 0 }) => { // THE ROBOT IN ACTION
    let distance = 0, len = RobotBrawn.parcels.length;
    for (let turn = 0; ; turn++) {
        if (!RobotBrawn.parcels.length) {
            console.log(`\n Done! Moved ${len} parcels in ${turn} turns and in ${distance} Km\n`);
            return (`Done! Moved ${len} parcels in ${turn} turns and in ${distance} Km`);
        }
        if (!memory.route.length) { memory = RobotBrain(RobotBrawn); distance += memory.dist; }
        const destination = memory.route.shift();
        console.log(`   Moved from ${RobotBrawn.location} to ${destination}`);
        RobotBrawn = RobotBrawn.move(destination);
    }
};
const parcel = RobotBrawn.robotApp(Math.random() * 200 >> 0);
const done = [
    ["random route robot", runRobot(parcel, RobotBrain.randomRouteRobot)], // implements Math.random function
    ["fixed route robot", runRobot(parcel, RobotBrain.fixedRouteRobot)], // implement fixed mail route
    ['route generator robot', runRobot(parcel, RobotBrain.RouteGeneratorRobot)],// implement BFS algorithm
    ["shortest route robot", runRobot(parcel, RobotBrain.shortestRouteRobot)], // implement dijkstra algorithm
];
for (const turnsAndDist of done) console.log(turnsAndDist);
