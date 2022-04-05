import { Schema, model, Types } from "./database/db.js";

const roomSchema = new Schema({
    name: String,
    limit: Number,
    inRoom: [{_id:Types.ObjectId}]
}, {
    autoCreate: true,
    timestamps: true,
    bufferCommands: false,
    versionKey: '_somethingElse'
});

export const RoomModel = model('Rooms', roomSchema);