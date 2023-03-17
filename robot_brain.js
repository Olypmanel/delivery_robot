import MiddleWareVillage, { roads, mailRoute } from "./village.js";
const village = new MiddleWareVillage().addVillageEdges(roads);
console.log(mailRoute);
class Robots {
    static possibleDestinations(state) {
        const destinations = new Set;
        const { location, parcels } = state;
        if (parcels.every(p => p.location == location))
            parcels.forEach(p => destinations.add(p.address));
        else parcels.forEach(p => p.location != location && destinations.add(p.location));
        return destinations;
    }
    static dikjistra(from, to) {
        const graph = new MiddleWareVillage().addVillageEdges(roads);
        const save = [{ at: from, route: [], dist: 0, checked: false }];
        const allRoutes = []; // THIS WILL HOLD ALL POSSIBLE SHORT ROUTES TO THE ROBOT'S DESTINATIION. THE ROBOT WILL LATER CHOOSE THE A ROUTE WITH THE SMALLEST DISTANCE
        for (; ;) {
            let smallestDistNode = null, inf = Infinity;
            for (const item of save)
                if (item.dist < inf && !item.checked) { inf = item.dist; smallestDistNode = item; }
            // FIND THE UNCHECKED SMALLEST DISTANCED NODE 
            if (!smallestDistNode) break;
            const { at, route, dist } = smallestDistNode;
            for (const node in graph[at]) {
                const edgeDist = dist + graph[at][node][0]; // DISTANCE FROM CURRENT NODE TO NEXT NODE
                if (edgeDist < graph[at][node][1] && node != route[route.length - 1]) { //  IF THE (DISTANCE FROM CURRENT NODE TO NEXT NODE) IS LESS THAN INITIAL VALUE (INFINITY) UPDATE THE NEXT NODE WITH EDGE_DIST
                    graph[at][node][1] = edgeDist;
                    save.push({ at: node, route: route.concat(node), dist: edgeDist, checked: false });
                    if (to?.has(node)) allRoutes.push({ dist: edgeDist, route: route.concat(node) });
                }
                smallestDistNode.checked = true;
            }
        }
        return allRoutes;
    }
    static randomRouteRobot(state) {
        const nextRoutes = Object.keys(village[state.location]);
        const destination = nextRoutes[nextRoutes.length * Math.random() >> 0];
        return { dist: village[state.location][destination][0], route: [destination] };
    }
    static fixedRouteRobot() {
        return { dist: 0, route: mailRoute.map(mail => mail) };
    }
    static shortestRouteRobot(state) {
        const queue = [{ at: state.location, route: [], dist: 0 }];
        const destinations = Robots.possibleDestinations(state);
        for (const front of queue) {
            let { at, route, dist } = front;
            for (const node in village[at]) {
                if (destinations.has(node)) return { dist: dist + village[at][node][0], route: route.concat(node) };
                if (queue.every(({ at }) => at != node)) {
                    dist += village[at][node][0];
                    queue.push({ at: node, dist, route: route.concat(node) });
                }
            }
        }
    }

    static shortestDistanceRobot(state) {
        const routes = Robots.dikjistra(state.location, Robots.possibleDestinations(state));
        let shortestDistRoute = null, inf = Infinity, memo = {};
        for (const { dist, route } of routes) {
            if (dist < inf) { shortestDistRoute = { dist, route }; inf = dist; } // GET THE SHORTEST DISTANCE
            else if (dist == inf) { // IF DISTS ARE EQUAL IN ANY THEN GIVE PREFERENCE TO THE SHORTER ROUTE
                if (dist in memo) shortestDistRoute = memo[dist]; // LOOK FOR DIST IN MEMORY
                else {
                    shortestDistRoute = { dist, route };
                    for (const { route } of routes.filter(r => r.dist == dist))
                        if (route.length < shortestDistRoute.route.length) shortestDistRoute = { dist, route };
                    memo[dist] = shortestDistRoute; // SAVE THIS OPERATIION OF DIST
                }
            }
        }
        return shortestDistRoute;
    }


}
export default Robots;