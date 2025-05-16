import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import TimeLine from "./pages/timeLine/timeLine";
import Header from "./components/header/header";
import Kanban from "./pages/kanban/kanban";
import Home from "./pages/home/home";
import "./App.css";



function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// move useLocation‐based logic into a child
function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== "/";

  return (
    <div className="App">
      <h1>BCIT Projects Term Assistant</h1>
      {showHeader && <Header />}
      <div className="AppRoutes">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/:projectName/timeline/:tokenId"
            element={<TimeLine />}
          />
          <Route path="/:projectName/kanban/:tokenId" element={<Kanban />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
