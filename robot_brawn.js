import KnowWhere, { roads } from "./know_where_village.js";
const village = new KnowWhere().addVillageEdges(roads);
class RobotBrawn {
    constructor(location, parcels) {
        this.location = location;
        this.parcels = parcels;
    }
    move(destination) {
        // THE ROBOT MOVE FROM NODE TO NODE. IF THE LOCATION OF THE ROBOT IS EQUAL TO ANY PARCEL'S LOCATION THEN THE ROBOT CARRY THE PERCEL TO EVERY OF ITS JOURNEY UNTILL THIS IS WHAT THE MAP ARRAY METHOD DOES.
        // IF THE ADDRESS OF THE ROBOT IS EQUAL TO THE LOCATION OF THE ROBOT. THEN THE PARCEL HAS GOTTEN TO ITS ADDRESS BEING MEANT TO BE SENT TO, SO IT IIS OFFLOADED. THIS WHAT THE FILTEER ARRAY METHOD DOES.
        if (!village[this.location][destination]) return this;
        const parcels = this.parcels.map(({ location, address }) =>
            location == this.location ? { location: destination, address } : { location, address }
        ).filter(({ address, location }) => address != location);
        return new RobotBrawn(destination, parcels); // RETURN NEW STATE BECAUSE 
    }
    static robotApp(parcelCount = 100) {
        // THIS WHERE THE VILLAGERS REGISTER THEIR PARCELS. THEY STATE THE LOCATION AND THE ADDRESS OF THE PARCEL
        const allVillageNodes = Object.keys(village), parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            const location = allVillageNodes[Math.random() * allVillageNodes.length >> 0];
            let address = allVillageNodes[Math.random() * allVillageNodes.length >> 0];
            // ADDRESS AND LOCATION CAN'T BE THE SAME. for example SEGUN CANNOT SEND PARCEL TO HIMSELF
            while (location == address) address = allVillageNodes[Math.random() * allVillageNodes.length >> 0];
            parcels.push({ location, address });
        }
        return new RobotBrawn("Post Office", parcels);
    };

}
export default RobotBrawn;