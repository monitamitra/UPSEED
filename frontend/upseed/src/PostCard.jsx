import React from "react";

const PostCard = ({ picture: { title, description, image } }) => {
  return (
    <div className="Startup Post">
      <div>
        <h2>{title}</h2>
      </div>
      <div>
        <p>{description}</p>
      </div>
      <div>
        <img src={image} alt={title} />
      </div>
    </div>
  );
}

export default PostCard;