import './auth.css'

import { Button, TextField } from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login({userAuthContract}){
    console.log('userAuthContract', userAuthContract)
    const [address, setAddress] = useState('');
    const [pass, setPass] = useState('');
    const  navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/')
    }

    const goToReceiver = async() => {
        console.log(address)
        console.log(pass)
        let checkPass = await userAuthContract.checkPass(address, pass)
        if(checkPass)
            navigate('/dashboard')
        else
            alert('Invalid User')
    }

    return (
    
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
            <TextField id="outlined-basic" 
                label="Account Address" 
                variant="outlined" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x6842A1448d40EE36926E64139F5aa0e10B580190" 
                name="address"
            /> <br />
            <TextField id="outlined-basic" 
                value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                type="password" 
                placeholder="********" 
                name="password"
            /> <br />    
            </form>
            <button className="link-btn" onClick={goToReceiver} style={{color:"black"}}>Login</button>
        </div>
        
    )
}