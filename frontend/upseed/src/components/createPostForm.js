/*createPostForm.js*/
import React, { useState } from 'react';
import './createPostForm.css';

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
        <form onSubmit={handleSubmit} className="form-container"> 
            <div className="form-container"> 
            <label className="form-label" htmlFor="idea">Sprout Your Ideas Here: (required)</label>
            <br/>
            <input className = "form-input" type="text" value={idea} onChange={(e) => setIdea(e.target.value)} 
            required />
            

            <div>
            <label className="form-label" htmlFor="setIdeaPic">Post Startup Links: (required)</label>
            <br/>
            <input className = "form-input" type="text" value={ideaPic} onChange={(e) => setIdeaPic(e.target.value)} required />
            </div>

            <div>
            <label className="form-label" htmlFor="setIdeaPic">Set Pic:</label>
            <br/>
            <input className = "form-input" type="text" value={ideaPic} onChange={(e) => setIdeaPic(e.target.value)}
            style = {{height: '50px', width: '100px'}}
            ></input>
            </div>
            <br/>

            <div>
            <label className="form-label" htmlFor="moneycollected">Set Your Money Goal: </label>
            <br/>
            <input className = "form-input" type="number" value={moneyCollected} onChange={(e) => setMoneyCollected(parseFloat(e.target.value))} 
            style = {{height: '50px', width: '80px'}}
            required />
            </div>
            <br/>
            <button type="submit" className="form-submit">Create Post</button>
            </div>
        </form>
    );
}

export default CreatePostForm;
