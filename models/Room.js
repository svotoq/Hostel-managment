var mongoose = require('mongoose');


//create Schema
const RoomSchema = new mongoose.Schema({
    storeroom: {
        type: Boolean,
        default: false
    },
    roomNumber: {
        type: String,
        requred: true
    },
    roomSize: {
        type: Number,
        requred: true
    },
    inventory: {
        tables: {
            type: Number
        },
        chairs: {
            type: Number
        },
        fireDetector: {
            exists: {
                type: Boolean
            },
            batteryDate: {
                type: String
            }
        },
        fireEscapePlan: {
            type: Boolean
        },
        trash: {
            type: Boolean
        },
        nightStands: {
            type: Number
        },
        wardrobes: {
            type: Number
        }
    }
});


const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;