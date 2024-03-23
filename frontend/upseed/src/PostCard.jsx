import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ Post }) => {
    const currentUserString = localStorage.getItem("user");
    const currentUser = JSON.parse(currentUserString);
    const navigate = useNavigate();

    const handleClick = (e) => {
        localStorage.setItem("postLikes", JSON.stringify(Post.numLikes));
        localStorage.setItem("moneyCollected", JSON.stringify(Post.moneyCollected));
        localStorage.setItem("postIdea", JSON.stringify(Post.idea));
        localStorage.setItem("ideaPic", JSON.stringify(Post.ideaPic));
        localStorage.setItem("comments", JSON.stringify(Post.comments));
        localStorage.setItem("postId", JSON.stringify(Post._id));
        navigate(`/users/${currentUser._id}/posts/${Post._id}`)
    }
  return (
    <div >
      <div>
        <h2>{Post.numLikes}</h2>
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