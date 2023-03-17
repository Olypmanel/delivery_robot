export const roads = [
    "Alice's House-Bob's House-2.8", "Alice's House-Cabin-6",
    "Alice's House-Post Office-2", "Bob's House-Town Hall-1",
    "Daria's House-Ernie's House-3.5", "Daria's House-Town Hall-6",
    "Ernie's House-Grete's House-1.5", "Grete's House-Farm-1",
    "Grete's House-Shop-3.2", "Marketplace-Farm-100",
    "Marketplace-Post Office-5", "Marketplace-Shop-10",
    "Marketplace-Town Hall-17", "Shop-Town Hall-2",
];
export const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House", "Town Hall",
    "Daria's House", "Ernie's House", "Grete's House", "Shop", "Grete's House",
    "Farm", "Marketplace", "Post Office"
];
class MiddleWareVillage {
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
export default MiddleWareVillage;
