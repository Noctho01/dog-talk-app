import { Schema, model } from "./database/db.js";

const canineProfileSchema = new Schema({
    breed: String,
    profilePictureUrl: String 
}, {
    autoCreate: false,
    timestamps: true,
    bufferCommands: false,
});

export const CanineProfile = model('CanineProfiles', canineProfileSchema);