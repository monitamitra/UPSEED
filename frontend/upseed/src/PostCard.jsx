import React from "react";

const PostCard = ({ Post }) => {
  return (
    <div >
      <div>
        <h2>{Post.idea}</h2>
      </div>
     
      <div>
        <Link to= {`${Post_.id}`}>
        <img src={Post.ideaPic}></img>
        </Link>
      </div>

    </div>
  );
}

export default PostCard;