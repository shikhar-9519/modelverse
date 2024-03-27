import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import ModelDetails from "./components/ModelDetails";


const App = () => {
  const redirectToHomePage = () => {
    window.location.href = "/";
  }
  return (
       <Router>
       <div className="app">
         <h1 className="cursor-pointer" onClick={redirectToHomePage}>ModelVerse</h1>
         <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/models/:id" element={<ModelDetails/>} />
         </Routes>
       </div>
     </Router>
  );
};

export default App;
