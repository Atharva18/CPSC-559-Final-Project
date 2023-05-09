import "./Dashboard.css";

import Box from '@mui/material/Box';
import Card from "./Card";
import Grid from '@mui/material/Grid';
import React from 'react'
import Table from "./Table";
import upload from "../assets/upload.png"

function MainContent({contract, account}) {
  return (
    <div className="main">
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={2} align = "center" style={{justifyContent:"center"}}>
        <Grid item xs={8}>
            <Table contract={contract} account={account} />
        </Grid>
        {/* <Grid item xs={6}>
        <Card name="Upload file" src={upload} action="upload"/>
        </Grid>
        <Grid item xs={6}>
        <Card name="Download file" src={upload} action="download"/>
        </Grid>
        <Grid item xs={6}>
        <Card name="Share file" src={upload} action="share"/>
        </Grid>
        <Grid item xs={6}>
        <Card name="Delete file" src={upload} action="delete"/>
        </Grid> */}
      </Grid>
    </Box>

    </div>
  )
}

export default MainContent