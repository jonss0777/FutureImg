import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import jsonData from "../task1_data.json";
import './Task1.css';

export function Instructions_Task1() {
    return (
        <>
            <h2>Instructions: </h2>
            <p style={{fontSize: 18}}>{jsonData.description}</p>
            <Link className='task-link' to="/task1/form">Continue</Link>
        </>
    )
}

export function Form_Task1() {
    const [data, setData] = useState(jsonData.data);

    const [userAnswers, setUserAnswers] = useState(
        jsonData.data.map((item, index) => ({
            id: index,    // Assign a unique id (based on the index)
            choice: ""   // Initialize choices for each image
        })
        )
    ); const [index, setIndex] = useState(0);
    const [pressSubmit, setPressSubmit] = useState(false);

    {/* Remove item by id from userAnswers*/ }
    const removeAnswer = (idToRemoveUserAnswer) => {
        setUserAnswers(userAnswers.filter((item) => item.id !== idToRemoveUserAnswer));
    }

    {/* Update item by id frp, userAnswers*/ }
    const updateAnswer = (idToUpdate, answer) => {

        setUserAnswers(prevUserAnswers =>
            prevUserAnswers.map(item =>
                item.id === idToUpdate
                    ? { ...item, choice: answer }
                    : item
            )
        );
    };

    // Handle radio button change
    const handleChange = (event, groupId) => {
        const value = event.target.value;
        updateAnswer(groupId, value)
    };

    // Handle form submission
    const handleSubmit = async (event) => {

        event.preventDefault();
        if (isFormComplete()) {
            setPressSubmit(true);
            console.log('Form Submitted', userAnswers);
            sendDataToAPI();
        }
        else {
            console.log('Form is incomplete')
        }

    }

    const sendDataToAPI = async () => {

        // Create a payload of selected answers
        const answers = Object.keys(userAnswers).map(imageId => ({
            imageId: imageId,
            data: userAnswers[imageId],
        }));

        console.log(answers);

        // API call to submit answers (replace with your API call)
        // try {
        //     const response = await fetch('https://api.example.com/save-answers', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(answers),
        //     });

        //     if (response.ok) {
        //         console.log('Responses submitted successfully');
        //     } else {
        //         console.log('Failed to submit responses');
        //     }
        // } catch (error) {
        //     console.error('Error submitting responses:', error);
        // }
    };


    // Handle Next and Previous navigation
    const handleNavigation = (direction) => {
        //console.log("userAnswers: ", userAnswers);
        setIndex(prevIndex => {
            const newIndex = prevIndex + direction;
            if (newIndex < 0) return 0;
            if (newIndex >= data.length) return data.length - 1;
            return newIndex;
        });
    };


    // Check if all choices have been selected for the current image
    const isFormComplete = () => {
        return userAnswers.every(answer => (answer.choice == "T" || answer.choice == "F")); // Ensure choices exist for all answers
    };

    return (
        <>

            <div className="task-container">
                <div className="image-container">
                    <div >
                    <p style={{fontSize:18}}><b>{data[index].view} View</b></p>
                    <img
                        src={data[index].img_url}
                        alt={`Group ${index} image`}
                        width={250}
                        height={250}
                        className="group_image"
                    />
                    </div>
                </div>

                {/* Form with Radio buttons */}

                <form onSubmit={handleSubmit} className='form-container'>
                    <div className="form-group">
                        <label>
                            <input 

                                type="radio"
                                name={`group-${index}`}
                                value="T"
                                checked={userAnswers[index]?.choice === 'T'}
                                onChange={(e) => handleChange(e, index)}
                            /> <p style={{paddingLeft: "10px"}}>True</p>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="radio"
                                name={`group-${index}`}
                                value="F"
                                checked={userAnswers[index]?.choice === 'F'}
                                onChange={(e) => handleChange(e, index)}
                            /> <p style={{paddingLeft: "10px"}}>False</p>
                        </label>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="navigation-buttons">
                        {
                            (index > 0) ?
                                <button type="button" onClick={() => handleNavigation(-1)} disabled={index === 0}>
                                    Previous
                                </button> : <></>
                        }

                        {
                            (index !== data.length - 1) ?
                                <button type="button" onClick={() => handleNavigation(1)} disabled={index === data.length - 1}>
                                    Next
                                </button> : <></>
                        }
                    </div>


                    {/* Submit Button */}
                    <div className="form-actions">
                        <button className="task-submit-button"
                            type="submit"
                            disabled={!isFormComplete()}
                            style={{
                                backgroundColor: isFormComplete() ? 'green' : 'grey',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                cursor: !isFormComplete() ? 'not-allowed' : 'pointer',
                                borderRadius: '5px',
                                marginTop: '5px',
                                marginBottom: '5px'
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {pressSubmit ?
                    <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/task2/instructions">Go to next task</Link>
                    :
                    <></>}
            </div>



        </>
    );
}



/*
*
* Design a form to display 200 images. Allow the user to select if they believe the image is real or fake.
*
*/

export default function Task1() {

    return (
        <>
            <Outlet />
        </>
    )
}