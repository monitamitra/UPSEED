import React, { useState } from 'react';

function CreatePostForm() {
    const [numLikes, setNumLikes] = useState(0);
    const [moneyCollected, setMoneyCollected] = useState(0);
    const [idea, setIdea] = useState('');
    const [ideaPic, setIdeaPic] = useState('');
    const [comments, setComments] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { numLikes, moneyCollected, idea, ideaPic, comments };

        try {
            const response = await fetch('http://localhost:5555/"/users/:id/createPost"', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error creating post:", error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={idea} onChange={(e) => setIdea(e.target.value)} required />
            <input type="text" value={ideaPic} onChange={(e) => setIdeaPic(e.target.value)} required />
            <input type="number" value={moneyCollected} onChange={(e) => setMoneyCollected(parseFloat(e.target.value))} required />
            <input type="text" value={ideaPic} onChange={(e) => setIdeaPic(e.target.value)}></input>
            <button type="submit">Create Post</button>
        </form>
    );
}

export default CreatePostForm;
