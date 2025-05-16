import React from 'react'
import './header.css'
import {
    useNavigate, useLocation
  } from "react-router-dom";

function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    let projectName = location.pathname.split('/')[1]
    let tokenId = location.pathname.split('/')[3]

    const handleHomeClick = () => navigate("/");
    
    const handleTimeLineClick = () => {
        navigate(`/${projectName}/timeline/${tokenId}`)
    }
    const handleKanbanClick = () => {
        navigate(`/${projectName}/kanban/${tokenId}`)
    }
    return (
        <nav className="NavBar">
            <ul>
                <li onClick={handleHomeClick}>Home</li>
                <li onClick={handleTimeLineClick}>Timeline</li>
                <li onClick={handleKanbanClick}>Kanban</li>
            </ul>
        </nav>
    )
}

export default Header