import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import jsonData from "../task2_data.json";
export function Instructions_Task2() {
    return (
        <>
            <h3>{jsonData.description} </h3>
        </>
    )
}


export function Form_Task2() {
    const [inputs, setInputs] = useState({});
    const [data, setData] = useState(jsonData.data);
    const [index, setIndex] = useState(0);  // To track the current image
    const [allChecked, setAllChecked] = useState(false);  // To track if the submit button should be enabled

    // Handle checkbox change
    const handleChange = (event) => {
        const { name, checked } = event.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: checked,  // Store the checkbox status
        }));
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

    // Handle Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Submitted', inputs);
        // Add your API call logic here
    };

    // Check if all checkboxes are filled to enable submit button
    const allCheckboxesChecked = Object.values(inputs).every(val => val);

    return (
        <>
            <div className="task-container">
                {/* Left Image (center view) */}
                <div className="image-container">
                    <img
                        src={data[index].views.center}
                        alt={`center view ${index}`}
                        width={500}
                        height={500}
                        className="center-view"
                    />
                </div>

                {/* Right Images (other views) */}
                <div className="other-images">
                    <div className="image-row">
                        <img
                            src={data[index].views.nassal[0].img_url}
                            alt={`nassal view 0`}
                            width={500}
                            height={500}
                            className="other-image"
                        />
                        <img
                            src={data[index].views.nassal[1].img_url}
                            alt={`nassal view 1`}
                            width={500}
                            height={500}
                            className="other-image"
                        />
                    </div>
                    <div className="image-row">
                        <img
                            src={data[index].views.temporal[0].img_url}
                            alt={`temporal view 0`}
                            width={500}
                            height={500}
                            className="other-image"
                        />
                        <img
                            src={data[index].views.temporal[1].img_url}
                            alt={`temporal view 1`}
                            width={500}
                            height={500}
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
                            checked={inputs.one || false}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        2:
                        <input
                            type="checkbox"
                            name="two"
                            checked={inputs.two || false}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        3:
                        <input
                            type="checkbox"
                            name="three"
                            checked={inputs.three || false}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        4:
                        <input
                            type="checkbox"
                            name="four"
                            checked={inputs.four || false}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        None:
                        <input
                            type="checkbox"
                            name="none"
                            checked={inputs.none || false}
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
                <button type="submit" disabled={!allCheckboxesChecked}>
                    Submit
                </button>
            </form>
        </>
    );
}


/*
 Display to the user a center image on the left and 4 images on the right at a time. And allow him/she to select the images on the right that he/she believes align with
 the left image.

*/

export default function Task2() {
    const [data, setData] = useState()
    const [count, setCount] = useState()
    return (
        <>
            <h1>Task 2</h1>
            <Outlet />
            <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/task2/instructions">Instructions</Link>
            <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/task2/form">Form</Link>

            {/*Display when task is completed*/}
            <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10 }} to="/task3">Go to next task</Link>
            <Link style={{ backgroundColor: "black", borderRadius: 20, padding: 15 }} to="/">Return Home</Link>
        </>


    )
}