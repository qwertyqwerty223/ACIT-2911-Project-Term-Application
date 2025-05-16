import { useState } from "react";

import "./App.css";
import TimeLine from "./pages/timeLine/timeLine";
import Header from "./components/header/header";
import Kanban from "./pages/kanban/kanban";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";



function App() {
  return (
    <>
      <Router>
        <div className="App">
          <h1>BCIT Project Term Assistant</h1>
          <Header />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              
              <Route path="/:projectName/timeline/:tokenId" element={<TimeLine />} />
              <Route path="/:projectName/kanban/:tokenId" element={<Kanban />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
