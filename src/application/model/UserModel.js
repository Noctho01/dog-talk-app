import { Schema, model, Types } from "./database/db.js";

const userSchema = new Schema({
    email: String,
    pwdHash: String,
    particularKeyHash: String,
    canineProfile: {
        breed: String,
        profilePictureUrl: String,
        roomName: String
    }
}, {
    autoCreate: true,
    timestamps: true,
    bufferCommands: false,
    versionKey: '_somethingElse'
});

export const UserModel = model('Users', userSchema);