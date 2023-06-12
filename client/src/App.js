import "./App.css";
import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
//import { Routes,Route } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/:username" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
