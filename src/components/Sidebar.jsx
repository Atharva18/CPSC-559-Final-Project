import "./Dashboard.css";

import React from 'react'

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 style={{marginTop:"0px"}}>Sidebar</h2>
      <ul>
        <li>Dashboard</li>
        <li>Settings</li>
        <li>Help</li>
      </ul>
    </div>
  )
}

export default Sidebar