import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import jsonData from "../task3_data.json";
import './Task3.css';

export function Instructions_Task3() {

    return (
        <>
            <h3>Instructions: </h3>
            <p >{jsonData.description}</p>
            <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/task3/form">Continue</Link>

        </>
    )
}

export function Form_Task3() {
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

        // setUserAnswers(prevUserAnswers =>
        //     prevUserAnswers.map(item =>
        //         item.id === idToUpdate
        //             ? { ...item, choice: {..., answer }
        //             : item
        //     )
        // );
    };


    // Handle checkbox change
    const handleChange = (event, question,groupId) => {
        
        const value = event.target.value;
        // Check if answerId already exists
        if (!userAnswers.find(answer => answer.id === groupId)) {
            addAnswer({ id: groupId, choice: { [question]:value} })
        }
        else {
            //console.log(userAnswers);
            updateAnswer(groupId, question , { [question]:value})
        }
        console.log(userAnswers);
    };

    // Handle Next and Previous navigation
    const handleNavigation = (direction) => {
        setIndex(prevIndex => {
            const newIndex = prevIndex + direction;
            if (newIndex < 0) return 0;
            if (newIndex >= data.length) return data.length - 1;
            return newIndex;
        });
    };


    // Handle submit
    const handleSubmit = (event) => {
        console.log(event);
        event.preventDefault();
    }

    // Check if all answers are filled
    const isFormComplete = () => {
        return userAnswers.length === data.length && userAnswers.every(answer => answer.zone && answer.stage);
    };

    return (
        <>
            <div div className="task-container">
                <div className="image-container">
                    <img src={data[index]} width={500} height={500} id="nassal_view_image" />
                    <img src={data[index]} width={500} height={500} id="temporal_view_image" />
                </div>

                <form onSubmit={handleSubmit}>

                    <p>Zone</p>
                    <select value={userAnswers[index]?.choice.zone} onChange={(e) => { handleChange(e, "zone", index) }}>
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                    </select>

                    <p>Stage</p>
                    <select value={userAnswers[index]?.choice.stage} onChange={(e) => { handleChange(e, "stage", index) }}>
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                    </select>
                    <br />

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
                    <button  className="task-submit-button"
                        type="submit"
                        disabled={!isFormComplete()}
                        style={{
                            backgroundColor: !isFormComplete ? 'grey' : 'green',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            cursor: !isFormComplete ? 'not-allowed' : 'pointer',
                            borderRadius: '5px',
                            marginTop: '5px',
                            marginBottom: '5px'
                        }}
                    >
                        Submit
                    </button>

                </form>
            </div>

            {/*Display when task is completed*/}
            { isFormComplete() ?
                <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/">Return Home</Link>
                : <></>
            }
        </>
    )
}


/*

Display to the user 2 images at a time and allow them to select the zone and stage of the condition. 

*/

export default function Task3() {

    return (
        <>
            <Outlet />
        </>

    )
}