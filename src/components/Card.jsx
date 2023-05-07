import { Box, Button } from '@mui/material';
import React,{ useState } from 'react';

import axios from "axios";

function Card(props) {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [selectedFile,setSelectedFile] = useState(null);
  const [uploadClicked, setUploadClicked] = useState(false)
  const [uploadFailed,setUploadFailed] = useState(false)
  const [uploadSuccess,setUploadSuccess] = useState(false)

    const handleDownload =() => {
        fetch('url').then(response => {
            response.blob()
            .then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'downloads.txt';
                alink.click();
            })
            .catch(()=>{
              console.log('download ')
            })
        })
    }
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        
    }
    const handleUpload = async () => {
      console.log("handleUpload", selectedFile)
        if (!selectedFile) {
          console.log('Please select a file.');
          return;
        }
        console.log(fileName)
        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log("formData",formData)
        try {
          axios.defaults.baseURL = "https://api.pinata.cloud";
          const resFile = await axios({
            method: "post",
            url: "/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `7618958d16a21146d20a`,
              pinata_secret_api_key: `79a0f5e0c6837ac2bc017cb2cd5e8feeeb077d2f649b4ea5421904e695978ecf`,
              "Content-Type": "multipart/form-data",
            },
          });
          setUploadSuccess(true)
          setUploadClicked(true)
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          console.log(ImgHash)
      } catch (error) {
        console.log(error);
        setUploadFailed(true)
      }
      }
    const handleAction=(action)=> {
        if (action=="download")
        {
            return handleDownload();
        }
    }
  return (
    <div className="card">
        {/* <img src={props.src}/> */}
        {props.action=="upload" && 
        <><Box >
        <h2>Upload File</h2><br />
        <input type="file" onChange={handleFileInput}/><br />
        <div style={{justifyContent:"center", textAlign:"center"}}><br />
          <Button onClick={handleUpload} disabled={(!selectedFile) || (selectedFile && uploadClicked)} variant='contained'>Upload</Button>
          {uploadSuccess && <div style={{color:"green"}}><b>File uploaded successfully</b></div>}
          {uploadFailed && <div style={{color:"red"}}><b>Upload Failed</b></div>}
        </div>
        </Box></>
        }
        {props.action=="download" && <>
        <Box>
        <h2>Download File</h2><br />
        <Button onClick={()=> handleAction(props.action)} variant='contained'>{props.name}</Button>
        </Box>
        </>}    
        {props.action=="delete" && 
<>
<Box>
<h2>Delete File</h2><br />
<Button onClick={()=> handleAction(props.action)} variant='contained'>{props.name}</Button>
</Box>
</>
}
{props.action=="share" && 
<>
<Box>
<h2>Share File</h2><br />
<Button onClick={()=> handleAction(props.action)} variant='contained'>{props.name}</Button>
</Box>
</>
}
        </div>
        )
         }

         

export default Card