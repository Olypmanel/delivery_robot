export const roads = [
    "Post Office-Hospital-2", "Post Office-Market-5", "Market-Farm-100", "Market-Church-70", "Market-Emmy's House-15",
    "Hospital-Zoo-4", "Hospital-Event Hall-10", "Zoo-Sheriff-60", "Emmy's House-Farm-3", "Emmy's House-Church-5",
    "Emmy's House-Cafe-40", "Church-Event Hall-6", "Event Hall-Sheriff-50", "Event Hall-Segun's House-8",
    "Sheriff-Segun's House-6", "Segun's House-John's House-7", "John's House-Cafe-11", "RC-Post Office-2"
];
export const mailRoute = [ // THIS IS MAIL ROUTE OF THE WHOLE VILLAGE
    "RC", "Post Office", "Hospital", "Zoo", "Sheriff", "Event Hall", "Segun's House", "John's House",
    "Cafe", "Emmy's House", "Farm", "Market", "Church", "Market", "Post Office",
];
class KnowWhere { // THIS FUNCTION BUILD GRAPH WHICH WILL REPRESENT OUR VILLAGE
    addVillageEdges(roads) {
        const graph = Object.create(null);
        const addVillageEdges = (from, to, dist) => {
            if (!(from in graph)) graph[from] = { [to]: [Number(dist), Infinity] };
            else graph[from][to] = [Number(dist), Infinity];
        };
        for (const road of roads) {
            const [_, from, to, dist] = road.match(/([\w\s']+?)-([\w\s']+?)-(\d*)/);
            addVillageEdges(from, to, dist ?? 0);
            addVillageEdges(to, from, dist ?? 0);
        }
        return graph;
    };
}
export default KnowWhere;
