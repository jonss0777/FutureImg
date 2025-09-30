import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import jsonData from "../task3_data.json";

export function Instructions_Task3() {

    return (
        <>
            <h3>{jsonData.description} </h3>
        </>
    )
}

export function Form_Task3() {
    const [input, setInput] = useState({});
    const [data, setData] = useState(jsonData.data);
    const [index, setIndex] = useState();

    const handleChange = () => {

    }

    const handleSubmit = () => {

    }


    return (
        <>
            <div>
                <img src={jsonData.data[index]} widht={500} height={500} id="center_view_image"/>

                <img src={jsonData.data[index]} widht={500} height={500} id="center_view_image"/>
            </div>

            <form onSubmit={() => { }}>

                <p>Zone</p>
                <select value={input} onChange={handleChange}>
                    <option value="one">1</option>
                    <option value="two">2</option>
                    <option value="three">3</option>
                </select>

                <p>Stage</p>
                <select value={input} onChange={handleChange}>
                    <option value="one">1</option>
                    <option value="two">2</option>
                    <option value="three">3</option>
                </select>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}


/*

Display to the user 2 images at a time and allow them to select the zone and stage of the condition. 

*/

export default function Task3() {
    const [data, updateData] = useState()
    const [count, updateCount] = useState()
    return (
        <>
            <h1>Task3</h1>
            <Outlet />
            <Link style={{backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10}}  to="/task3/instructions">Instructions</Link>
        <Link style={{backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10}}  to="/task3/form">Form</Link>
         
            {/*Display when task is completed*/}
            <Link style={{backgroundColor: "black", borderRadius: 20, padding: 15, marginBottom: 10}} to="/">Return Home</Link>
        </>

    )
}