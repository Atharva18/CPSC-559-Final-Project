import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import React,{useEffect, useState} from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "black",
    },
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const navigate = useNavigate()
  const [authState, setAuthState] = useState(props.loggedIn);
  const [userInfo, setUserInfo] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    setAuthState("token" in localStorage?true:false)

  },[authState])

  const handleLogout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    navigate('/login')
  }
  return (
    <AppBar position="static" style={{backgroundColor:"#EFE628"}}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h5" className={classes.logo}>
          <Link to={props.loggedIn?"/":"/login"} style={{color:"black",textDecoration:"none"}}>
            <b style={{fontFamily:"'Poppins', sans-serif"}}>Decentralized File Storage</b>
          </Link>
        </Typography>


          <div className={classes.navlinks}>
              <Tooltip title="Account">
                {props.loggedIn==true ?
                <>
                <Button color="primary" onClick={handleLogout} sx={{ my: 2, display: 'block',textTransform:"none"}}  style={{color:'black'}}>
                    <b style={{fontFamily:"'Poppins', sans-serif"}}>Logout</b>
                </Button>
                </>
                :
                <>
                <Button color="primary" onClick={()=>navigate('/register')} sx={{ my: 2, display: 'block',textTransform:"none"}}  style={{color:'black'}}>
                    <b style={{fontFamily:"'Poppins', sans-serif"}}>Register</b>
                </Button>
                <Button color="primary" onClick={()=>navigate('/login')} sx={{ my: 2, display: 'block',textTransform:"none" }}  style={{color:'black'}}>
                    <b style={{fontFamily:"'Poppins', sans-serif"}}>Login</b>
                </Button>
                </>
                }
              </Tooltip>

            
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;