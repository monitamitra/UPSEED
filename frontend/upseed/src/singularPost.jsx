// SingularPostPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard';
import {useNavigate} from "react-router-dom";
import './singularPost.css';


function SingularPostPage() { 
    let currentUserString = localStorage.getItem("user");
    let currentUser = JSON.parse(currentUserString);
    let postIdString = localStorage.getItem("postId");
    let postID = JSON.parse(postIdString);

    const navigate = useNavigate();
    
    const [money, setMoney] = useState(0);
    const[commentText, setCommentText] = useState("");
    const [likes, setLikes] = useState(0);
    const [post, setPost] = useState({});

    const increaseLikes = async (postId) => {
        let likes = post.numLikes;
        likes++;
        try{
            await fetch(`http://localhost:5555/users/${currentUser._id}/editPost/${postID}`,{
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        "numLikes": likes, 
                        "moneyCollected": post.moneyCollected,
                        "idea": post.idea,
                        "ideaPic": post.ideaPic,
                        "comments": post.comments
                    })
            })
           
        } catch{
            console.error("Error!!!");
        }
    }


        const increaseMoney = async (postId) => {
            let newMoney =  Number(post.moneyCollected) + Number(money);
            try{
                await fetch(`http://localhost:5555/users/${currentUser._id}/editPost/${postID}`,{
                    method: "PUT",
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                            "numLikes": post.numLikes, 
                            "moneyCollected": newMoney,
                            "idea": post.idea,
                            "ideaPic": post.ideaPic,
                            "comments": post.comments
        
                        })
                });

                fetch(`http://localhost:5555/users/${currentUser._id}/posts/${postID}`)
                .then(response => response.json())
                .then(data => setPost(data))
                .catch((error) => console.log(error));
            } catch{
                console.error("Error!!!");
            }
        }

            const addComment = async (postId) => {
                let comments = [...post.comments, commentText];
                try{
                    await fetch(`http://localhost:5555/users/${currentUser._id}/editPost/${postID}`,{
                        method: "PUT",
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                "numLikes": post.numLikes, 
                                "moneyCollected": post.moneyCollected,
                                "idea": post.idea,
                                "ideaPic": post.ideaPic,
                                "comments": comments
            
                            })
                    });

                    fetch(`http://localhost:5555/users/${currentUser._id}/posts/${postID}`)
                    .then(response => response.json())
                    .then(data => setPost(data))
                    .catch((error) => console.log(error));
                   
                } catch{
                    console.error("Error!!!");
                }
            }

            useEffect(() => {
                fetch(`http://localhost:5555/users/${currentUser._id}/posts/${postID}`)
                .then(response => response.json())
                .then(data => setPost(data))
                .catch((error) => console.log(error)) 
        }, [increaseLikes, increaseMoney])
  

  return (
    <div>
        <div className = "post">
      <PostCard Post={post}/>
      </div>
        
        <button className = "like" onClick = {()=> increaseLikes()}>Like</button>
        <input  value={money} onChange = {(e)=>{setMoney(e.target.value)}} />
        <h1 className={"header"}>{post.moneyCollected}</h1>
        <button onClick = {()=> increaseMoney(PostCard.id)}>add</button>
        <input value={commentText} onChange = {(e)=>{setCommentText(e.target.value)}} />
        <button  className = "add" onClick = {()=>addComment(PostCard.id)}>Submit</button>
        {post.comments && post.comments.map((comment, index) => (
    <p key={index}>{comment}</p>
    

  ))}
    </div>
  );
}

export default SingularPostPage;