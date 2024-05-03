import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ Post }) => {
    const currentUserString = localStorage.getItem("user");
    const currentUser = JSON.parse(currentUserString);
    const navigate = useNavigate();

    const handleClick = (e) => {
        localStorage.setItem("postId", JSON.stringify(Post._id));
        navigate(`/users/${currentUser._id}/posts/${Post._id}`)
    }

  return (
    
     
     <div onClick={() => handleClick()} className = "gallery">
        <div >
        <img className = "picturePost" src={Post.ideaPic}></img>
        </div>


    </div>
  );
}

export default PostCard;