import { Schema, model } from "./database/db.js";

const userSchema = new Schema({
    email: String,
    pwdHash: String,
    particularKeyHash: String
}, {
    autoCreate: true,
    timestamps: true,
    bufferCommands: false,
});

export const UserModel = model('Users', userSchema);