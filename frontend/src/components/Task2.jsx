import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import jsonData from "../task2_data.json";
import './Task2.css';

export function Instructions_Task2() {
    return (
        <>
            <h2>Instructions: </h2>
            <p style={{fontSize: 18}}>{jsonData.description}</p>
            <Link
                className='task-link'
                to="/task2/form"
            >
                Continue
            </Link>
        </>
    );
}

export function Form_Task2() {
    const [data, setData] = useState(jsonData.data);

    const [userAnswers, setUserAnswers] = useState(
        jsonData.data.map((item, index) => ({
            id: index,    // Assign a unique id (based on the index)
            choices: []   // Initialize choices for each image
        })
        )
    );
    const [index, setIndex] = useState(0);  // To track the current image
    const [pressSubmit, setPressSubmit] = useState(false);


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
        if(isFormComplete()){
        console.log('Form Submitted', userAnswers);
            sendDataToAPI();
        } else{
            console.log('For is incomplete')
        }
        // Add your API call logic here
    };


     const sendDataToAPI = async () => {

        // Create a payload of selected answers
        const answers = Object.keys(userAnswers).map(imageId => ({
            imageId: imageId,
            data: userAnswers[imageId],
        }));

        console.log(answers);
    }

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
                            <div >
                        <p style={{fontSize: 18}}><b>{data[index].views.center.view} View </b></p>
                            <img
                                src={data[index].views.center.img_url}
                                alt={`center view ${index}`}
                                width={250}
                                height={250}
                                className="center-view"
                            />
                            </div>
                        </div>

                        {/* Right Images (other views) */}
                        <div className="right-image-container">
                            <div className="image-row">
                                {data[index].views.nassal.map((view, idx) => (
                                    <img
                                        key={`nasal-${idx}`}
                                        src={view.img_url}
                                        alt={`nasal view ${idx}`}
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

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='form-container'>
                        <div className="form-group">
                            {["1", "2", "3", "4", "None"].map(option => (
                                <label key={option}>
                                    <p>{option}:</p>
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
                         <div className="form-actions">
                        <button
                            className="task-submit-button"
                            type="submit"
                            disabled={!isFormComplete()}
                            style={{
                                backgroundColor: isFormComplete() ?  'green' :  'grey',
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
