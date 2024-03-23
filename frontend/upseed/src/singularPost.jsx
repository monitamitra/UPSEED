// SingularPostPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard';


function SingularPostPage({idea, ideaPic}) {
    const likesString = localStorage.getItem("postLikes");
    const numberLikes = JSON.parse(likesString);
    const moneyCollectedString = localStorage.getItem("moneyCollected");
    const numbermoneyCollected = JSON.parse(moneyCollectedString);
    const ideaString = localStorage.getItem("postIdea");
    const ideaParsed = JSON.parse(ideaString);
    const ideaPicString = localStorage.getItem("ideaPic");
    const ideaPicParsed = JSON.parse(ideaPicString);
    const commentsString = localStorage.getItem("comments");
    const comments = JSON.parse(commentsString);
    const currentUserString = localStorage.getItem("user");
    const currentUser = JSON.parse(currentUserString);
    const postIdString = localStorage.getItem(postId);
    const postId = JSON.parse(postIDString);

    
    const [money, setMoney] = useState(0);
    const[commentText, setCommentText] = useState(0);
    

    const increaseLikes = async (postId) => {
        numberLikes++;
        try{
            const response = await fetch(`http://localhost:5555/users/:${currentUser._id}/editPost/:${postId}`,{
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        "numLikes": numberLikes, 
                        "moneyCollected": numbermoneyCollected,
                        "idea": ideaParsed,
                        "ideaPic": ideaPicParsed,
                        "comments": comments
    
                    })
            });
           
        } catch{
            console.error("Error!!!");
        }
    }

        const increaseMoney = async (postId) => {
            numbermoneyCollected += money;
            try{
                const respone = await fetch(`http://localhost:5555/users/:${currentUser._id}/editPost/:${postId}`,{
                    method: "PUT",
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                            "numLikes": numberLikes, 
                            "moneyCollected": numbermoneyCollected,
                            "idea": ideaParsed,
                            "ideaPic": ideaPicParsed,
                            "comments": comments
        
                        })
                });
               
            } catch{
                console.error("Error!!!");
            }
        }

            const addComment = async (postId) => {
               comments.push([commentText]);

                try{
                    const respone = await fetch(`http://localhost:5555/users/:${currentUser._id}/editPost/:${postId}`,{
                        method: "PUT",
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                "numLikes": numberLikes, 
                                "moneyCollected": numbermoneyCollected,
                                "idea": ideaParsed,
                                "ideaPic": ideaPicParsed,
                                "comments": comments
            
                            })
                    });
                   
                } catch{
                    console.error("Error!!!");
                }
            }


                const deletePost = async (postId) => {
            
                     try{
                         const respone = await fetch(`http://localhost:5555/users/:${currentUser._id}/deletePost/:${postId}`,{
                             method: "DELETE",
                             headers:{
                                 'Content-Type': 'application/json',
                             },
                             body: JSON.stringify({
                                     "numLikes": numberLikes, 
                                     "moneyCollected": numbermoneyCollected,
                                     "idea": ideaParsed,
                                     "ideaPic": ideaPicParsed,
                                     "comments": comments
                 
                                 })
                         });
                        
                     } catch{
                         console.error("Error!!!");
                     }
                }
    

      

  return (
    <div>
      {/* Render the details of the singular post */}
      <PostCard idea ={idea} ideaPic={ideaPic} />
        <button onClick = {()=> increaseLikes(PostCard.id)}>Like</button>
        <input  onChange = {(e)=>{setMoney(e.target.value)}}> input money amount</input>
        <button onClick = {()=> increaseMoney(PostCard.id)}>add</button>
        <input onChange = {(e)=>{setCommentText(e.target.value)}}>Add a comment...</input>
        <button onClick = {()=>addComment(PostCard.id)}>Submit</button>
        <button onClick = {()=> deletePost(PostCard.id)}>Delete</button>
    </div>
  );
}

export default SingularPostPage;