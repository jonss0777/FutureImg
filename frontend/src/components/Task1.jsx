import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import jsonData from "../task1_data.json";


export function Instructions_Task1() {
    return (
        <>
            <h3 >{jsonData.description}</h3>
        </>
    )
}

export function Form_Task1() {
    // Initialize selected answers as an empty object
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [data, setData] = useState(jsonData.data);  // Assuming data is a list of images
    const [count, setCount] = useState(0);

    // Handle radio button change
    const handleChange = (event, imageId) => {
        const value = event.target.value;
        setSelectedAnswers(prevState => ({
            ...prevState,
            [imageId]: value,  // Set the answer for the specific image
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Create a payload of selected answers
        const answers = Object.keys(selectedAnswers).map(imageId => ({
            imageId: imageId,
            answer: selectedAnswers[imageId],
        }));

        // API call to submit answers (replace with your API call)
        try {
            const response = await fetch('https://api.example.com/save-answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });

            if (response.ok) {
                console.log('Responses submitted successfully');
            } else {
                console.log('Failed to submit responses');
            }
        } catch (error) {
            console.error('Error submitting responses:', error);
        }
    };

    return (
        <div id="task1-container">
            {/* Render all images and associated radio buttons */}
            {data.map((image, index) => (
                <div key={image.id} className="task-image-section">
                    <img
                        id={`task1-image-${image.id}`}
                        src={image.img_url}
                        alt={`Image ${image.id}`}
                        width={500}
                        height={500}
                    />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                <input
                                    type="radio"
                                    name={`image-${image.id}`}
                                    value="true"
                                    checked={selectedAnswers[image.id] === 'true'}
                                    onChange={(e) => handleChange(e, image.id)}
                                /> True
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="radio"
                                    name={`image-${image.id}`}
                                    value="false"
                                    checked={selectedAnswers[image.id] === 'false'}
                                    onChange={(e) => handleChange(e, image.id)}
                                /> False
                            </label>
                        </div>
                    </form>
                </div>
            ))}

            {/* Submit button for the entire form */}
            <button type="submit" onClick={handleSubmit} className="task-submit-btn">
                Submit All Answers
            </button>
        </div>
    );
}


/*

Design a form to display 200 images. Allow the user to select if they believe the image is real or fake.

*/



export default function Task1() {
    const [data, updateData] = useState()
    const [count, updateCount] = useState()

    return (
        <>
            <h1>Task 1</h1>

            <Outlet />
    
          
            <Link  style={{backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10}} to="/task1/instructions">Instructions</Link>
              <Link style={{backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10}} to="/task1/form">Form</Link>
              {/*Display when task is completed*/}
            <Link style={{backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10}} to="/task2">Go to next task</Link>
           
           
            <Link style={{backgroundColor: "black", borderRadius: 20, padding: 15}}  to="/">Return Home</Link>
        </>

    )
}




