import { Box, Button } from '@mui/material';
import React,{ useState } from 'react';

import axios from "axios";

function Card(props) {
    const [selectedFile,setSelectedFile] = useState(null);
  const [uploadClicked, setUploadClicked] = useState(false)
  const [uploadFailed,setUploadFailed] = useState(false)
  const [uploadSuccess,setUploadSuccess] = useState(false)
    const handleDownload =() => {
        fetch('url').then(response => {
            response.blob()
            .then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
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
        
    }
    const handleUpload = async () => {
        if (!selectedFile) {
          console.log('Please select a file.');
          return;
        }
        const formData = new FormData();
     
      // Update the formData object
      formData.append(
        "myFile",
        selectedFile,
        selectedFile.name
      );
        console.log('formData',formData)
        try {
          await axios.post('url', formData).then(response => {
            console.log("File uploaded successfully.",response);
            setUploadSuccess(true)
            setUploadClicked(true)
          });
    
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