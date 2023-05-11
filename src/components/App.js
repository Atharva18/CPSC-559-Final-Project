import './auth.css'
import FileUtils from "../abis/FileUtils.json";
import { ethers } from "ethers";
import UserAuthentication from "../abis/UserAuthentication.json";
import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './Login'
import Navbar from "./Navbar";
import Register from './Register'

function App() {

  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAuthContract, setUserAuthContract] = useState(null);
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
        let address = await signer.getAddress();  
        setAccount(address);
        console.log("Account "+ account)
        console.log("Address "+ address)
        let contractAddress = "0xBD0e35E2933a1d5194477b477a7b92559323c933";
        var FileUtilsContract = await new ethers.Contract(
          contractAddress,
          FileUtils.abi,
          signer
        );

        let userAuthContractAddress = "0xA6aF88e5e01d4B72a1cD72802096f8bf58c70390";
        var userContract = await new ethers.Contract(
          userAuthContractAddress,
          UserAuthentication.abi,
          signer
        );
          
        setUserAuthContract(userContract);
        console.log(userContract);
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

  useEffect(() => {
    if (userAuthContract) {
      setAuthState(true);
    }
  }, [userAuthContract]);


  return (
    <div>
      <Navbar loggedIn={authState}/>
      <Routes>
        <Route path="/dashboard" element={<Dashboard 
        contract={contract} 
        account={account}
        />} />
        <Route path="/" element={<div className='App'><Login userAuthContract={userAuthContract} /></div>} />
        <Route path="/register" element={<div className='App'><Register userAuthContract={userAuthContract} /></div>} />
      </Routes>
    </div>
  );
}


export default App;
