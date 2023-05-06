import './auth.css'

import { Button, TextField } from '@mui/material';
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Register(props){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const  navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <TextField id="outlined-basic" 
                label="Full Name" 
                variant="outlined" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                type="text"
                name="name"
                placeholder="Full Name"
            /> <br />            
            <TextField id="outlined-basic" 
                label="Email" 
                variant="outlined" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                type="email" 
                placeholder="youremail@gmail.com" 
                name="email"
            /> <br />
            <TextField id="outlined-basic" 
                value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                type="password" 
                placeholder="********" 
                name="password"
            /> <br /> 
            <Button type="submit">Register</Button>
        </form>
        <button className="link-btn" onClick={() => navigate('/login')}  style={{color:"black"}}>Already have an account? Login here.</button>
    </div>
    )
}