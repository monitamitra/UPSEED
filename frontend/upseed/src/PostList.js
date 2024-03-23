import React, { useState, useEffect } from "react";
// import axios from "axios";
import PostCard from "./PostCard";
//import styles from "../styles.css";


export default function PostList() {
  const [pictures, setPictures] = useState([]);

  const getPictures =  () => {
  
      const response = fetch('http://localhost:5555/posts')
      .then(response => response.json())
      .then(data => setPictures(data))
      .catch(error => console.log("error fetching data"));

  };

  useEffect(() => {
    getPictures();
  }, []);

  return (
    <div>
      <title>UpSeed's SproutHub</title>
      <h1>SproutHub</h1>
      <div>
        {pictures.map((picture) => (
          <PostCard key={picture.id} Post={picture} />
        ))}
      </div>
      <main></main>
    </div>
  );
}
