import React from "react";

const PostCard = ({ Post }) => {
  return (
    <div >
      <div>
        <h2>{Post.idea}</h2>
      </div>
     
      <div>
        <img src={Post.ideaPic}></img>
      </div>

    </div>
  );
}

export default PostCard;