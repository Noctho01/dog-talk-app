import { Schema, model } from "./database/db.js";

const roomSchema = new Schema({
    name: String,
    limit: Number,
    inRoom: [String]
}, {
    autoCreate: true,
    timestamps: true,
    bufferCommands: false,
});

export const RoomModel = model('Rooms', roomSchema);