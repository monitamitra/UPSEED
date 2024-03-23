import React, { useState, useEffect } from "react";
import Head from "next/Head";
import Image from "next/image";
import axios from "axios";
import styles from "../styles.css";

export default function PostList() {
  const [picture, setPicture] = useState([]);

  const getPicture = async () => {
    const response = await axios.get();
    const data = response.data;
    console.log(data);
    setPicture(data);
  };

  useEffect(() => {
    getPicture();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>UpSeed's SproutHub</title> //homepage name
      </Head>

      <h1 className={styles.homepage}>SproutHub</h1>

      <div className={styles.container}>
        {picture.map((picture) => (
          <PostCard key={picture.id} picture={picture} />
        ))}
      </div>
      <main className={styles.main}></main>
    </div>
  );
}
