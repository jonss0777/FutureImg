import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import Task1, { Instructions_Task1, Form_Task1 } from './components/Task1'
import Task2, { Instructions_Task2, Form_Task2 } from './components/Task2'
import Task3, { Instructions_Task3, Form_Task3 } from './components/Task3'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [activeTab, setActiveTab] = useState('home');  // Default tab is 'home'
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };


  return (
    <BrowserRouter>
      <nav>
        <div className="left">
          <Link
            to="/"
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => handleTabClick('home')}
          >
            Home
          </Link>
        </div>
        <div className="right">
          <Link
            to="/login"
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => handleTabClick('login')}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={activeTab === 'register' ? 'active' : ''}
            onClick={() => handleTabClick('register')}
          >
            Register
          </Link>
        </div>
      </nav>
      <Routes>

        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="/task1" element={<Task1 />}>
          <Route path="instructions" element={<Instructions_Task1 />}></Route>
          <Route path="form" element={<Form_Task1 />}></Route>

        </Route>
        <Route path="/task2" element={<Task2 />}>
          <Route path="instructions" element={<Instructions_Task2 />}> </Route>
          <Route path="form" element={<Form_Task2 />}></Route>

        </Route>
        <Route path="/task3" element={<Task3 />}>
          <Route path="instructions" element={<Instructions_Task3 />}> </Route>
          <Route path="form" element={<Form_Task3 />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
