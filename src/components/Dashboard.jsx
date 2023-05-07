import "./Dashboard.css";

import Card from "./Card";
import MainContent from "./MainContent";
import React from "react";
import Sidebar from "./Sidebar";
import upload from "../assets/upload.png"

const Dashboard = (contract, account) => {
  console.log("address",account)
  return (
    <>
      <div className="container">
          {/* <div style={{float:"left", width:"20%"}} > */}
            {/* <Sidebar /> */}
          {/* </div> */}
          {/* <div style={{float:"left", width:"80%"}}> */}
            <MainContent contract={contract.contract} account={account} />
          {/* </div> */}
        </div>
      </>
  );
};



export default Dashboard;
