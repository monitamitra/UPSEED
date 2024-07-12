/* UserProfile */
import React, {useState, useEffect} from 'react';
import CreatePostForm from './createPostForm';
import PostCard from '../PostCard';
import './UserProfile.css';

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
            <div className = "user-profile-container">
                <div className = "profile-pic">
            {currentUser.profilePic && <img src={currentUser.profilePic} alt="Profile" />}
            </div>

            <div className = "user-info">
            <h1>User Profile</h1>
            <p> <strong>Display Name: </strong> {currentUser.displayName}</p>
            <p> <strong>UserName: </strong> {currentUser.username}</p>
            <p><strong>StartUp Name: </strong> {currentUser.startupName}</p>
            <p><strong>StartUp Description: </strong> {currentUser.startupDescription}</p>
            </div>
            

            <div className = "create-post-container">
                <CreatePostForm></CreatePostForm>
            </div>

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