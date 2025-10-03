import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import jsonData from "../task1_data.json";
import './Task1.css';

export function Instructions_Task1() {
    return (
        <>
            <h3>Instructions: </h3>
            <p >{jsonData.description}</p>
            <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/task1/form">Continue</Link>
        </>
    )
}

export function Form_Task1() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [data, setData] = useState(jsonData.data);
    const [index, setIndex] = useState(0);
    const [pressSubmit, setPressSumbmit] = useState(false);


    {/* Add item to userAnswers*/ }
    const addAnswer = (newUserAnswer) => {
        setUserAnswers([...userAnswers, newUserAnswer])
    }

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
        // Check if answerId already exists
        if (!userAnswers.find(answer => answer.id === groupId)) {
            addAnswer({ id: groupId, choice: value })
        }
        else {
            //console.log(userAnswers);
            updateAnswer(groupId, value)
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        console.log("Submit form")
        console.log("Answers:")
        console.log(userAnswers)

        event.preventDefault();

        // Create a payload of selected answers
        // const answers = Object.keys(selectedAnswers).map(imageId => ({
        //     imageId: imageId,
        //     answer: selectedAnswers[imageId],
        // }));

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

    return (
        <>

            <div className="task-container">
                <div className="image-container">
                    {/* <div className=""> */}
                    <img
                        src={data[index].img_url}
                        alt={`Group ${index} image`}
                        width={500}
                        height={500}
                        className="group_image"
                    />
                    {/* </div> */}
                </div>

                {/* Form with Radio buttons */}
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                <input
                                    type="radio"
                                    name={`group-${index}`}
                                    value="T"
                                    checked={userAnswers[index]?.choice === 'T'}
                                    onChange={(e) => handleChange(e, index)}
                                /> True
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
                                /> False
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
                        <button onClick={() => { setPressSumbmit(true); }} className="task-submit-button"
                            type="submit"
                            disabled={userAnswers.length !== data.length}
                            style={{
                                backgroundColor: userAnswers.length !== data.length ? 'grey' : 'green',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                cursor: userAnswers.length !== data.length ? 'not-allowed' : 'pointer',
                                borderRadius: '5px',
                                marginTop: '5px',
                                marginBottom: '5px'
                            }}
                        >
                            Submit
                        </button>
                    </form>

                    {pressSubmit ?
                        <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/task2/instructions">Go to next task</Link>
                        :
                        <></>}
                </div>

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