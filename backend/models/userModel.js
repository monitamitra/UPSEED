import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
    {
        displayName: {
            type: String, 
            required: true
        }, 
        username: {
            type: String, 
            required: true
        }, 
        password: {
            type: String, 
            required: true
        }, 
        startupName: {
            type: String, 
            required: true
        }, 
        startupDescription: {
            type: String, 
            required: true
        }, 
        profilePic: {
            type: String, 
        }, 
        posts: [{
            type: Schema.Types.ObjectId,
            ref: 'Post' 
          }]
    }
);

export const User = mongoose.model('User', userSchema);