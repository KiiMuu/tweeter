import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user';

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        trim: true, 
        unique: true,
        index: true,
    },
    email: { 
        type: String, 
        required: true, 
        trim: true, 
        unique: true,
        index: true,
    },
    password: { 
        type: String, 
        required: true,
    },
    profilePic: { 
        type: String, 
    },
    coverPhoto: { 
        type: String 
    },
}, {
    timestamps: true,
});

const User = model<IUser>('User', UserSchema);

export default User;