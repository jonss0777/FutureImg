import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import jsonData from "../task3_data.json";
import './Task3.css';

export function Instructions_Task3() {

    return (
        <>
            <h3>Instructions: </h3>
            <p >{jsonData.description}</p>
            <Link  style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/task3/form">Continue</Link>

        </>
    )
}

export function Form_Task3() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [data, setData] = useState(jsonData.data);
    const [index, setIndex] = useState();


    {/* Add item to userAnswers*/ }
    const addAnswer = (newUserAnswer) => {
        setUserAnswers([...items, newUserAnswer])
    }

    {/* Remove item by id from userAnswers*/ }
    const removeAnswer = (idToRemoveUserAnswer) => {
        setUserAnswers(userAnswers.filter((item) => item.id !== idToRemoveUserAnswer));
    }

    {/* Update item by id frp, userAnswers*/ }
    const updateAnswer = (idToUpdate, newObj) => {
        setUserAnswers(prevUserAnswers =>
            prevUserAnswers.map(item =>
                item.id === idToUpdate
                    ? { ...item, obj: newObj }
                    : item
            )
        );
    };


    // Handle options change
    const handleChange = (event) => {
        console.log(event);
        event.preventDefault();

    }

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

    return (
        <>
            <div div className="task-container">
                <div className="image-container">
                    <img src={data[index]} widht={500} height={500} id="nassal_view_image" />
                    <img src={data[index]} widht={500} height={500} id="temporal_view_image" />
                </div>

                <form onSubmit={handleSubmit}>

                    <p>Zone</p>
                    <select value={userAnswers[index]?.value} onChange={handleChange}>
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                    </select>

                    <p>Stage</p>
                    <select value={userAnswers[index]?.value} onChange={handleChange}>
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                    </select>
                    <br />

                    {/* Navigation Buttons */}
                    <div className="navigation-buttons">
                        <button type="button" onClick={() => handleNavigation(-1)} disabled={index === 0}>
                            Previous
                        </button>
                        <button type="button" onClick={() => handleNavigation(1)} disabled={index === data.length - 1}>
                            Next
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={userAnswers.length === data.length}>
                        Submit
                    </button>

                </form>
            </div>

              {/*Display when task is completed*/}
            <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/">Return Home</Link>

        </>
    )
}


/*

Display to the user 2 images at a time and allow them to select the zone and stage of the condition. 

*/

export default function Task3() {
    const [startedForm, setStartedForm] = useState(false);
    
    const handleStart = () =>{
        setStartedForm(!startedForm)
    }

    return (
        <>
            <Outlet />           
        </>

    )
}