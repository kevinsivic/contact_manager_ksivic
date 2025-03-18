import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../components/Home";
import {Contacts} from "../components";

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/contacts" element={<Contacts/>}/>
        </Routes>
    </Router>
);
