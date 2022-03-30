import { Schema, model } from "./database/db.js";

const canineProfileIdSchema = new Schema({
    canineProfileId: Schema.Types.ObjectId
})

const roomSchema = new Schema({
    name: String,
    limit: Number,
    inRoom: [canineProfileIdSchema]
}, {
    autoCreate: false,
    timestamps: true,
    bufferCommands: false,
});

export const Room = model('Rooms', roomSchema);