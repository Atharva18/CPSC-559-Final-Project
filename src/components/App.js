import './auth.css'

import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from './Dashboard';
import Login from './Login'
import Navbar from "./Navbar";
import Register from './Register'

function App() {
  const [authState, setAuthState] = useState();


  useEffect(()=>{
    setInterval(() => {
      // const tokenString = localStorage.getItem("token");
      localStorage.getItem("token")!=null?setAuthState(true): setAuthState(false)
    }, 1000);

  },[authState])

  return (
    <div>
      <Navbar loggedIn={authState}/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<div className='App'><Login /></div>} />
        <Route path="/register" element={<div className='App'><Register /></div>} />
      </Routes>
    </div>
  );
}

export default App;
