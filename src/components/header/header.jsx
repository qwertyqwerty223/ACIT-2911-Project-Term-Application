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
    const handleCalenderClick = (e) => {
        navigate('/calender')
    }
    const handleGroupsClick = (e) => {
        navigate('/groups')
    }
    return (
        <nav className="NavBar">
            <ul>
                <li onClick={handleTimeLineClick}>Timeline</li>
                <li onClick={handleCalenderClick}>Calender</li>
                <li onClick={handleGroupsClick}>Groups</li>
            </ul>
        </nav>
    )
}

export default Header