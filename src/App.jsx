import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Exchange from "./pages/Exchange";
import Navbar from "./components/Navbar";

function App(){
    return(
        <Router>
            <div className="bg-[#0d0d2b] min-h-screen text-white">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/exchange" element={<Exchange />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;