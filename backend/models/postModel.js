import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        numLikes: {
            type: Number, 
            required: true
        }, 
        moneyCollected: {
            type: Number, 
            required: true
        }, 
        idea: {
            type: String, 
            required: true
        },
        ideaPic: {
            type: String, 
            required: true
        },
        comments: [{
            type: String,
          }]
    }
);

export const Post = mongoose.model('Post', postSchema);