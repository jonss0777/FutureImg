import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import jsonData from "../task2_data.json";
import './Task2.css';

export function Instructions_Task2() {
    return (
        <>
            <h3>Instructions: </h3>
            <p>{jsonData.description}</p>
            <Link
                style={{
                    backgroundColor: "black",
                    borderRadius: 20,
                    padding: 15,
                    marginBottom: 10
                }}
                to="/task2/form"
            >
                Continue
            </Link>
        </>
    );
}

export function Form_Task2() {
    const [userAnswers, setUserAnswers] = useState(
    jsonData.data.map((item, index) => ({
        id: index,    // Assign a unique id (based on the index)
        choices: []   // Initialize choices for each image
    }))
);
    const [data, setData] = useState(jsonData.data);
    const [index, setIndex] = useState(0);  // To track the current image
    const [pressSubmit, setPressSubmit] = useState(false);


    {/* Add item to userAnswers*/ }
    const addAnswer = (newUserAnswer) => {
        setUserAnswers([...userAnswers, newUserAnswer])
    }

    // Update choices for a given index
    const updateAnswer = (groupId, choice) => {
        setUserAnswers(prevUserAnswers =>
            prevUserAnswers.map((item) =>
                item.id === groupId
                    ? { ...item, choices: item.choices.includes(choice) ? item.choices.filter(c => c !== choice) : [...item.choices, choice] }
                    : item
            )
        );
    };

    // Handle checkbox change (add/remove choice)
    const handleChange = (event, groupId) => {
        const name = event.target.name;
        console.log(name);
        updateAnswer(groupId, name);  
        
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
        event.preventDefault();
        console.log('Form Submitted', userAnswers);
        // Add your API call logic here
    };

    // Check if all choices have been selected for the current image
    const isFormComplete = () => {
        
        return userAnswers.every(answer => answer.choices.length > 0); // Ensure choices exist for all answers
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
                            {data[index].views.nassal.map((view, idx) => (
                                <img
                                    key={`nassal-${idx}`}
                                    src={view.img_url}
                                    alt={`nassal view ${idx}`}
                                    width={250}
                                    height={250}
                                    className="other-image"
                                />
                            ))}
                        </div>
                        <div className="image-row">
                            {data[index].views.temporal.map((view, idx) => (
                                <img
                                    key={`temporal-${idx}`}
                                    src={view.img_url}
                                    alt={`temporal view ${idx}`}
                                    width={250}
                                    height={250}
                                    className="other-image"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form with Checkboxes */}
                <form onSubmit={handleSubmit}>
                    <div className="checkbox-container">
                        {["1", "2", "3", "4", "None"].map(option => (
                            <label key={option}>
                                {option}:
                                <input
                                    type="checkbox"
                                    name={option}
                                    checked={userAnswers[index]?.choices.includes(option)}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </label>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="navigation-buttons">
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => handleNavigation(-1)}
                                disabled={index === 0}
                            >
                                Previous
                            </button>
                        )}
                        {index < data.length - 1 && (
                            <button
                                type="button"
                                onClick={() => handleNavigation(1)}
                                disabled={index === data.length - 1}
                            >
                                Next
                            </button>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={() => { setPressSubmit(true);
                            console.log(userAnswers);
                         }}
                        className="task-submit-button"
                        type="submit"
                        disabled={!isFormComplete()}
                        style={{
                            backgroundColor: !isFormComplete() ? 'grey' : 'green',
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
                </form>

                {pressSubmit && (
                    <Link
                        style={{
                            backgroundColor: "black",
                            borderRadius: 20,
                            padding: 15,
                            marginBottom: 10
                        }}
                        to="/task3/instructions"
                    >
                        Go to next task
                    </Link>
                )}
            </div>
        </>
    );
}

/*
 Display to the user a center image on the left and 4 images on the right at a time.
 Allow him/her to select the images on the right that align with the left image.
*/

export default function Task2() {
    return <Outlet />;
}
