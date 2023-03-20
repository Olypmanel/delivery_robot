import RobotBrawn from "./robot_brawn.js";
import RobotBrain from "./robot_brain.js";

const runRobot = (robot, RobotBrain, memory = { route: [], dist: 0 }) => {
    let distance = 0, len = robot.parcels.length;
    for (let turn = 0; ; turn++) {
        if (robot.parcels == 0) {
            console.log(`\n Done! Moved ${len} parcels in ${turn} turns and in ${distance} Km\n`);
            return (`Done! Moved ${len} parcels in ${turn} turns and in ${distance} Km`);
        }
        if (!memory.route.length) { memory = RobotBrain(robot); distance += memory.dist; }
        let destination = memory.route.shift();
        console.log(`   Moved from ${robot.location} to ${destination}`);
        robot = robot.move(destination);
    }
};
const parcel = RobotBrawn.generateParcels(Math.random() * 200 >> 0);
const done = [
    ["random route robot", runRobot(parcel, RobotBrain.randomRouteRobot)], // implements Math.random function
    ["fixed route robot", runRobot(parcel, RobotBrain.fixedRouteRobot)], // implement fixed mail route
    ['route generator robot', runRobot(parcel, RobotBrain.RouteGeneratorRobot)],// implement BFS algorithm
    ["shortest route robot", runRobot(parcel, RobotBrain.shortestRouteRobot)], // implement dijkstra algorithm
];
for (let turnsAndDist of done) console.log(turnsAndDist);