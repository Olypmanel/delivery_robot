import RobotBrawn from "./robot_brawn_or_body.js";
import RobotBrain from "./robot_brain.js";

const runRobot = (state, robot, memory = { route: [], dist: 0 }) => {
    let distance = 0, len = state.parcels.length;
    for (let turn = 0; ; turn++) {
        if (state.parcels == 0) {
            console.log(`\n Done! Moved ${len} parcels in ${turn} turns and in ${distance} Km\n`);
            return (`Done! Moved ${len} parcels in ${turn} turns and in ${distance} Km`);
        }
        if (!memory.route.length) { memory = robot(state); distance += memory.dist; }
        let destination = memory.route.shift();
        console.log(`   Moved from ${state.location} to ${destination}`);
        state = state.move(destination);
    }
};
const parcel = RobotBrawn.generateParcels(100);
const done = [
    ["random robot", runRobot(parcel, RobotBrain.randomRouteRobot)], // implements Math.random function
    ["fixed route robot", runRobot(parcel, RobotBrain.fixedRouteRobot)], // implement fixed mail route
    ['shortest route robot', runRobot(parcel, RobotBrain.shortestRouteRobot)],// implement BFS algorithm
    ["shortest dist robot", runRobot(parcel, RobotBrain.shortestDistanceRobot)], // implement dijkstra algorithm
]
for (let turnsAndDist of done) console.log(turnsAndDist)