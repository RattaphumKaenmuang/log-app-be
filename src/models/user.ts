import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    code: string;
    prefix: string;
    firstname: string;
    lastname: string;
    level: string;
    isActive: boolean;
    isDel: boolean;
}

const UserSchema = new Schema({
    username:   { type: String, required: true },
    password:   { type: String, required: true },
    code:       { type: String, required: true },
    prefix:     { type: String, required: true },
    firstname:  { type: String, required: true },
    lastname:   { type: String, required: true },
    level:      { type: String, required: true },
    isActive:   { type: Boolean, required: true },
    isDel:      { type: Boolean, required: true }
})

export default mongoose.model<IUser>('User', UserSchema);