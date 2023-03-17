import MiddleWareVillage, { roads } from "./village.js";
const village = new MiddleWareVillage().addVillageEdges(roads);
class RobotBrawn {
    constructor(location, parcels) {
        this.location = location;
        this.parcels = parcels;
    }
    move(destination) {
        if (!village[this.location][destination]) return this;
        const parcels = this.parcels.map(({ location, address }) =>
            location == this.location ? { location: destination, address } : { location, address }
        ).filter(({ address, location }) => address != location);
        return new RobotBrawn(destination, parcels);
    }
    static generateParcels(parcelCount = 100) {
        const allVillageNodes = Object.keys(village);
        const parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            const location = allVillageNodes[Math.random() * allVillageNodes.length >> 0];
            let address = allVillageNodes[Math.random() * allVillageNodes.length >> 0];
            while (location == address) address = allVillageNodes[Math.random() * allVillageNodes.length >> 0];
            parcels.push({ location, address });
        }
        return new RobotBrawn("Post Office", parcels);
    };

}
export default RobotBrawn;