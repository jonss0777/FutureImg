import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import jsonData from "../task2_data.json";
import './Task2.css';

export function Instructions_Task2() {
    return (
        <>
            <h3>Instructions: </h3>
            <p >{jsonData.description}</p>
            <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/task2/form">Continue</Link>
        </>
    )
}


export function Form_Task2() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [data, setData] = useState(jsonData.data);
    const [index, setIndex] = useState(0);  // To track the current image
    const [pressSubmit, setPressSumbmit] = useState(false);

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


    // Handle checkbox change
    const handleChange = (event) => {
        const { name, checked } = event.target;
        setUserAnswers(prevState => ({
            ...prevState,
            [name]: checked,  // Store the checkbox status
        }));
    };

    // Handle Next and Previous navigation
    const handleNavigation = (direction) => {
        console.log("Index: ", direction)
        setIndex(prevIndex => {
            const newIndex = prevIndex + direction;
            if (newIndex < 0) return 0;
            if (newIndex >= data.length) return data.length - 1;
            return newIndex;
        });

    };

    // Handle Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Submitted', userAnswers);
        // Add your API call logic here
    };


    return (
        <>
            <div className="task-container">
                <div className='image-container'>
                    {/* Left Image (center view) */}
                    <div className="left-image-container">
                        <img
                            src={data[index].views.center.img_url}
                            alt={`center view ${index}`}
                            width={250}
                            height={250}
                            className="center-view"
                        />
                    </div>

                    {/* Right Images (other views) */}
                    <div className="right-image-container">
                        <div className="image-row">
                            <img
                                src={data[index].views.nassal[0].img_url}
                                alt={`nassal view 0`}
                                width={250}
                                height={250}
                                className="other-image"
                            />
                            <img
                                src={data[index].views.nassal[1].img_url}
                                alt={`nassal view 1`}
                                width={250}
                                height={250}
                                className="other-image"
                            />
                        </div>
                        <div className="image-row">
                            <img
                                src={data[index].views.temporal[0].img_url}
                                alt={`temporal view 0`}
                                width={250}
                                height={250}
                                className="other-image"
                            />
                            <img
                                src={data[index].views.temporal[1].img_url}
                                alt={`temporal view 1`}
                                width={250}
                                height={250}
                                className="other-image"
                            />
                        </div>
                    </div>
                </div>


                {/* Form with Checkboxes */}
                <form onSubmit={handleSubmit}>
                    <div className="checkbox-container">
                        <label>
                            1:
                            <input
                                type="checkbox"
                                name="one"
                                checked={userAnswers[index]?.choice === ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            2:
                            <input
                                type="checkbox"
                                name="two"
                                checked={userAnswers[index]?.choice === ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            3:
                            <input
                                type="checkbox"
                                name="three"
                                checked={userAnswers[index]?.choise === ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            4:
                            <input
                                type="checkbox"
                                name="four"
                                checked={userAnswers[index]?.choice === ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            None:
                            <input
                                type="checkbox"
                                name="none"
                                checked={userAnswers[index]?.choice === ""}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

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
                    <button
                        type="submit"
                        disabled={userAnswers.length !== data.length}
                        style={{
                            backgroundColor: userAnswers.length !== data.length ? 'grey' : 'green',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            cursor: userAnswers.length === data.length ? 'not-allowed' : 'pointer',
                            borderRadius: '5px'
                        }}
                    >
                        Submit
                    </button>
                </form>

                {pressSubmit ? 
                    <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/task3">Go to next task</Link>
                :
                 <></>
                }
            </div>
        </>
    );
}


/*
 Display to the user a center image on the left and 4 images on the right at a time. And allow him/she to select the images on the right that he/she believes align with
 the left image.

*/

export default function Task2() {

    return (
        <>
            <Outlet />
        </>
    )
}