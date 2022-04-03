import { Schema, model } from "./database/db.js";

const canineProfileSchema = new Schema({
    breed: String,
    profilePictureUrl: String,
    roomName: String
}, {
    autoCreate: true,
    timestamps: true,
    bufferCommands: false,
});

export const CanineProfileModel = model('CanineProfiles', canineProfileSchema);