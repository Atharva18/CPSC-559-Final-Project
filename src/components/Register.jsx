import './auth.css'

import { Button, TextField } from '@mui/material';
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Register({userAuthContract}){
    const location = useLocation();
    //console.log(location.state)
    const [contract, setContract] = useState();
    const [address, setAddress] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const  navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(address);
    }

    const handleRegister = async(e) =>{
       console.log('userAuthContract', userAuthContract);
       console.log(address)
       console.log(pass);
       //console.log(contract);
       //await contract.addUser(address, pass);

    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>   
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
            <Button type="submit" onClick= {handleRegister}>Register</Button>
        </form>
        <button className="link-btn" onClick={() => navigate('/')}  style={{color:"black"}}>Already have an account? Login here.</button>
    </div>
    )
}