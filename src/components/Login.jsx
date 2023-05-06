import './auth.css'

import { Button, TextField } from '@mui/material';
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Login(props){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const  navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        localStorage.setItem('token','ahaha')
        navigate('/')
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
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
                <Button type="submit">Log In</Button>
            </form>
            <button className="link-btn" onClick={() => navigate('/register')} style={{color:"black"}}>Don't have an account? Register here.</button>
        </div>
    )
}