import React, { useState, useEffect } from "react";
// import axios from "axios";
import {useNavigate} from "react-router-dom";
import PostCard from "./PostCard";

//import styles from "../styles.css";


export default function PostList() {
  const [pictures, setPictures] = useState([]);
  const navigate = useNavigate();

  const getPictures =  () => {
  
      const response = fetch('http://localhost:5555/posts')
      .then(response => response.json())
      .then(data => setPictures(data))
      .catch(error => console.log("error fetching data"));

     
  };
  const firstThree = pictures.slice(0,3);
  const restOf = pictures.slice(3);

  useEffect(() => {
    getPictures();
  }, []);

  const currentUserString = localStorage.getItem("user");
  const currentUser = JSON.parse(currentUserString);

  const handleClick = (postID) => {
    localStorage.setItem("postId", JSON.stringify(postID));
    navigate(`/users/${currentUser._id}/posts/${postID}`)
};



  return (
    <div>
    <div className="top-images">
      {/* Render the first three images */}
      {firstThree.map((picture, index) => (
        <div tabIndex="0" onClick={() => handleClick(picture._id)}>
           <img key={index} src={picture.ideaPic} alt={`Photo ${index}`} />
            <h4>{picture.numLikes}</h4>
          </div>
      ))}
    </div>
    <div className="other-images">
      {/* Render the rest of the images */}
      {restOf.map((picture, index) => (
        <div>
        <img onclick = {() => {
          navigate("")
        }} key={index + 3} src={picture.ideaPic} alt={`Photo ${index + 3}`} />
        <h5>{picture.numLikes}</h5>
        </div>
      ))}
    </div>
  </div>
);


    // <div>
    //   <title>UpSeed's SproutHub</title>
      
    //   <div>
    //     {pictures.map((picture) => (
    //       <PostCard key={picture.id} Post={picture} />
    //     ))}
    //   </div>
    //   <main></main>
    // </div>
}
