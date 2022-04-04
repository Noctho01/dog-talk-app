import { Schema, model, Types } from "./database/db.js";

const userSchema = new Schema({
    email: String,
    pwdHash: String,
    particularKeyHash: String,
    canineProfileId: Types.ObjectId
}, {
    autoCreate: true,
    timestamps: true,
    bufferCommands: false,
});

export const UserModel = model('Users', userSchema);