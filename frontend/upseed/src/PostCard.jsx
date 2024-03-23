import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ Post }) => {
    const currentUserString = localStorage.getItem("user");
    const currentUser = JSON.parse(currentUserString);
    const navigate = useNavigate();

    const handleClick = (e) => {
        localStorage.setItem("postLikes", Post.numLikes);
        localStorage.setItem("moneyCollected", Post.moneyCollected);
        localStorage.setItem("postIdea", Post.idea);
        localStorage.setItem("ideaPic", Post.ideaPic);
        localStorage.setItem("comments", Post.comments);
        localStorage.setItem("postId", Post._id);
        
        navigate(`/users/${currentUser._id}/posts/${Post._id}`)
    }
  return (
    <div >
      <div>
        <h2>{Post.idea}</h2>
      </div>
     
      <div>
        <div onClick={handleClick}>
        <img src={Post.ideaPic}></img>
        </div>
      </div>

    </div>
  );
}

export default PostCard;