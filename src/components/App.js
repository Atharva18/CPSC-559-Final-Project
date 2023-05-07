import './auth.css'
import FileUtils from "../abis/FileUtils.json";
import { ethers } from "ethers";
import UserAuth from "../abis/UserAuthentication.json";
import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from './Dashboard';
import Login from './Login'
import Navbar from "./Navbar";
import Register from './Register'
var address;
function App() {

  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [authState, setAuthState] = useState();

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        address = await signer.getAddress();  
        setAccount(address);
        console.log("Account "+ account)
        console.log("Address "+ address)
        let contractAddress = "0xba93F6A3512538c0E04A715A8ece68570Ccc65D4";
        var FileUtilsContract = new ethers.Contract(
          contractAddress,
          FileUtils.abi,
          signer
        );
    
        setContract(FileUtilsContract);
        setProvider(provider);
    

    //   await FileUtilsContract.add("0x6842A1448d40EE36926E64139F5aa0e10B580190", "url", "name", "comment");
    //   var dataArray = await FileUtilsContract.getFilesForUser("0x6842A1448d40EE36926E64139F5aa0e10B580190");
    //   console.log(dataArray);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  },[authState])
  return (
    <div>
      <Navbar loggedIn={authState}/>
      <Routes>
        <Route path="/" element={<Dashboard 
        contract={contract} 
        account={address}
        />} />
        <Route path="/login" element={<div className='App'><Login /></div>} />
        <Route path="/register" element={<div className='App'><Register /></div>} />
      </Routes>
    </div>
  );
}


export default App;
