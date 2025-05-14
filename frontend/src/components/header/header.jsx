import React from 'react'
import './header.css'
import {
    useNavigate
  } from "react-router-dom";

function Header() {
    const navigate = useNavigate()
    const handleTimeLineClick = (e) => {
        navigate('/')
    }
    const handleKanbanClick = (e) => {
        navigate('/kanban')
    }
    return (
        <nav className="NavBar">
            <ul>
                <li onClick={handleTimeLineClick}>Timeline</li>
                <li onClick={handleKanbanClick}>Kanban</li>
            </ul>
        </nav>
    )
}

export default Header