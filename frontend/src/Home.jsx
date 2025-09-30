import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import './Home.css';

// Hide Tasks until the user is loggin
// Color changes Once the task is completed
// Block the user from completing the task again if it was already completed
export default function Home(){

    return(
        <div className="home-container">
      <h1 className="heading">Diagnosability Validation</h1>
      <ol className="task-list">
        <li>
          <Link className="task-link" to="task1">Start Task 1</Link>
        </li>
        <li>
          <Link className="task-link" to="task2">Start Task 2</Link>
        </li>
        <li>
          <Link className="task-link" to="task3">Start Task 3</Link>
        </li>
      </ol>
    </div>
    )
}


