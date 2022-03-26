import { Schema, model } from "./database/db.js";

const userSchema = new Schema({
    email: String,
    pwdHash: String,
    particularKeyHash: String
}, {
    autoCreate: false,
    timestamps: true,
    bufferCommands: false,
});

export const User = model('Users', userSchema);