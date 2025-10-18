import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import jsonData from "../task3_data.json";
import './Task3.css';

export function Instructions_Task3() {

    return (
        <>
            <h2>Instructions: </h2>
            <p style={{fontSize: 18}}>{jsonData.description}</p>
            <Link  className='task-link' to="/task3/form">Continue</Link>
        </>
    )
}

export function Form_Task3() {
    const width = 500;
    const height = 500;
    const [data, setData] = useState(jsonData.data);

    const [userAnswers, setUserAnswers] = useState(
        jsonData.data.map((item, index) => ({
            id: index,    // Assign a unique id (based on the index)
            choice: { zone: "", stage: "" }   // Initialize choices for each image
        })
        )
    );

    const [index, setIndex] = useState(0);
    const [pressSubmit, setPressSubmit] = useState(false);

    {/* Remove item by id from userAnswers*/ }
    const removeAnswer = (idToRemoveUserAnswer) => {
        setUserAnswers(userAnswers.filter((item) => item.id !== idToRemoveUserAnswer));
    }

    {/* Update item by id frp, userAnswers*/ }
    const updateAnswer = (idToUpdate, question, answer) => {

        setUserAnswers(prevUserAnswers =>
            prevUserAnswers.map(item =>
                item.id === idToUpdate
                    ? { ...item, choice: { ...item.choice, [question]: answer } }
                    : item
            )
        );
    };


    // Handle checkbox change
    const handleChange = (event, question, groupId) => {
        const value = event.target.value;
        updateAnswer(groupId, question, value)
        console.log(userAnswers);
    };

    // Handle Next and Previous navigation
    const handleNavigation = (direction) => {

        


        setIndex(prevIndex => {
            // Allow a user to move foward only if they selected a choice.
        if(direction == 1 && userAnswers[prevIndex].choice.stage === "" || userAnswers[prevIndex].choice.zone === ""){
            return prevIndex;
        }
            const newIndex = prevIndex + direction;
            if (newIndex < 0) return 0;
            if (newIndex >= data.length) return data.length - 1;
            return newIndex;
        });
    };


    // Handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormComplete()){
            setPressSubmit(true);
        console.log('Form Submitted', userAnswers);
        }
        else{
            console.log('Form is incomplete')
        }
    }

    // Check if all answers are filled
    const isFormComplete = () => {
        return userAnswers.length === data.length && userAnswers.every(answer => answer.choice.zone && answer.choice.stage);
    };

    return (
        <>
            <div className="task-container">

                <div className="image-container">
                    <div>
                        <p style={{fontSize:18}}>{data[index][0].view} View</p>
                        <img src={data[index][0].img_url} width={width} height={height} id="nasal_view_image" />
                    </div>
                    <div>
                        <p style={{fontSize:18}}>{data[index][1].view} View</p>
                        <img src={data[index][1].img_url} width={width} height={height} id="temporal_view_image" />
                    </div>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="form-container">

                    <div className="form-group">
                        <label htmlFor="zone">Zone</label>
                        <select
                            id="zone"
                            value={userAnswers[index]?.choice.zone}
                            onChange={(e) => handleChange(e, "zone", index)}
                            className="form-select"
                         required >
                            <option value="">-- Choose a value --</option>
                            <option value="one">1</option>
                            <option value="two">2</option>
                            <option value="three">3</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="stage">Stage</label>
                        <select
                            id="stage"
                            value={userAnswers[index]?.choice.stage}
                            onChange={(e) => handleChange(e, "stage", index)}
                            className="form-select"
                            required
                        >
                            <option value="">-- Choose a value --</option>
                            <option value="one">1</option>
                            <option value="two">2</option>
                            <option value="three">3</option>
                        </select>
                    </div>
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
                    <div className="form-actions">
                        <button 
                         className="task-submit-button"
                            type="submit"
                            disabled={!isFormComplete()}
                            style={{
                                backgroundColor: isFormComplete() ?  'green' : 'grey' ,
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

                {/*Display when task is completed*/}
                {pressSubmit ?
                    <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/">Return Home</Link>
                    : <></>
                }
            </div>
        </>
    )
}


/*

Display to the user 2 images at a time and allow them to select the zone and stage of the condition. 

*/

export default function Task3() {

    return (<>
    <h2>Task 2</h2>
    <Outlet />
    
     </>);
}