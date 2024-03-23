import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import cors from "cors";
import { Post } from "./models/postModel.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("HELLO WORLD!");
});

// save a new user
app.post("/createUser", async (request, response) => {
    try {
        const newUser = {
            displayName: request.body.displayName, 
            username: request.body.username, 
            password: request.body.password, 
            startupName: request.body.startupName, 
            startupDescription: request.body.startupDescription, 
            profilePic: request.body.profilePic,
            posts: request.body.posts
        }
        const user = await User.create(newUser);
        return response.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route for getting all users
app.get("/users", async(request, response) => {
    try {
        const users = await User.find({})
        return response.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route for getting one user
app.get("/users/:id", async(request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id);
        return response.status(200).json(user);
    } catch (error) {
        response.status(500).send({message: error.message});
    }
});

// route for updating user
app.put("/users/:id/update", async (request, response) => {
    try {
        const {id} = request.params;
        const result = await User.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({message: "User not found"});
        } 
        return response.status(200).send({message: "User updated successfuly"});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

app.post("/login", async (request, response) => {
    const { username, password } = request.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return response.status(400).json({ message: 'Invalid credentials' });
    }
    // If the user is found, respond with a success message
    return response.status(201).send(user);
  } catch (error) {
    console.log("error!");
  }
})

// route for deleting a user
app.delete("/users/:id/delete", async (request, response) => {
    try {
        const {id} = request.params;
        const result = await User.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({message: "User not found"});
        } 
        return response.status(200).send({message: "User deleted successfuly"});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


// -------------> IDEA POST REQUESTS ----------------->

// route for creating a post
app.post("/users/:id/createPost", async (request, response) => {
    try {
        const newPost = {
            numLikes: request.body.numLikes,
            moneyCollected: request.body.moneyCollected,
            idea: request.body.idea, 
            ideaPic: request.body.ideaPic,
            comments: request.body.comments
        }

        const { id } = request.params;
        const user = await User.findById(id);

        const post = await Post.create(newPost);
        const result = await User.findByIdAndUpdate(id, { $push: { posts: post } });
        const updatedUser = await User.findById(id);

        return response.status(200).json(updatedUser);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route for getting a single post from a user
app.get("/users/:Userid/posts/:Postid", async (request, response) => {
    try {
        const { Postid } = request.params;

        const post = await Post.findById(Postid);
        return response.status(200).json(post);
    } catch (error) {
        response.status(500).send({message: error.message});
    }
});

// route for getting all posts for a user
app.get("/users/:id/posts", async (request, response) => {
    try {
        const {id} = request.params;
        const userPosts = await User.findById(id).populate('posts');
        return response.status(200).json(userPosts.posts); 
    } catch (error) {
        response.status(500).send({message: error.message});
    }
});

// route for getting all posts from all users
app.get("/posts", async(request, response) => {
    try {
        const posts = await Post.find({});
        return response.status(200).json(posts); 
    } catch (error) {
        response.status(500).send({message: error.message});
    }
});

// route for updating a post 
app.put("/users/:Userid/editPost/:Postid", async (request, response) => {
    try {
        const {Postid} = request.params;
        const result = await Post.findByIdAndUpdate(Postid, request.body);
        if (!result) {
            return response.status(404).json({message: "Post not found"});
        } 
        return response.status(200).send({message: "Post updated successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route for deleting the post 
app.delete("/users/:Userid/deletePost/:Postid", async (request, response) => {
    try {
        const {Userid, Postid} = request.params;
        await User.findByIdAndUpdate(Userid, {
            $pull: { posts: Postid }
        });
        const result = await Post.findByIdAndDelete(Postid);
        if (!result) {
            return response.status(404).json({message: "Post not found"});
        } 
        return response.status(200).send({message: "Post deleted successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

mongoose.connect(mongoDBURL).then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`)
    });
    
}).catch((error) => {
    console.log(error);
});
