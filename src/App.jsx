import { useState } from 'react'

import './App.css'
import TimeLine from './components/timeLine/timeLine'
import Header from './components/header/header'
import Calender from './components/calender/calender'
import Groups from './components/groups/groups'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <h1>BCIT Project Term Assistant</h1>
          <Header/>
          <div>
            <Routes>
              <Route path="/" element={<TimeLine />} />
              <Route path="/calender" element={<Calender />} />
              <Route path="/groups" element={<Groups />} />

            </Routes>
          </div>
        </div>
      </Router>
      
    </>
  )
}



export default App
