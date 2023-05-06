import "./Dashboard.css";

import Card from "./Card";
import MainContent from "./MainContent";
import React from "react";
import Sidebar from "./Sidebar";
import upload from "../assets/upload.png"

const Dashboard = () => {
  return (
    <>
      <div className="container">
          {/* <div style={{float:"left", width:"20%"}} > */}
            {/* <Sidebar /> */}
          {/* </div> */}
          {/* <div style={{float:"left", width:"80%"}}> */}
            <MainContent />
          {/* </div> */}
        </div>
      </>
  );
};



export default Dashboard;
