import React, {useState, useEffect} from 'react';
import CreatePostForm from './createPostForm';
import PostCard from '../PostCard';

function UserProfile() {

    const currentUserString = localStorage.getItem("user");
    const currentUser = JSON.parse(currentUserString);

    console.log(currentUser.displayName);

    const [posts, setPosts] = useState([]);

    const getPosts =  () => {
    
        const response = fetch(`http://localhost:5555/users/${currentUser._id}/posts`)
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.log("error fetching data"));
  
    };
  
    useEffect(() => {
      getPosts();
    }, []);
  
    return (
        <div>
            <h2>User Profile</h2>
            <p>Display Name: {currentUser.displayName}</p>
            <p>Username: {currentUser.username}</p>
            <p>Startup Name: {currentUser.startupName}</p>
            <p>Startup Description: {currentUser.startupDescription}</p>
            {currentUser.profilePic && <img src={currentUser.profilePic} alt="Profile" />}
            <div>
                <CreatePostForm></CreatePostForm>
            </div>
            <div>
                {posts.map((post) => (
                <PostCard key={post.id} Post={post} />
                ))}
            </div>

        </div>
    );
}

export default UserProfile;