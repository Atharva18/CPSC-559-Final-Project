import { Box, Button } from '@mui/material';
import React,{useEffect, useState} from "react";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import BackupIcon from '@material-ui/icons/Backup';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import MaterialTable from 'material-table'
import Modal from '@mui/material/Modal';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import GetApp from '@material-ui/icons/GetApp';
import Search from '@material-ui/icons/Search';
import Share from '@material-ui/icons/Share';
import AccessTime from '@material-ui/icons/AccessTime';
import Comment from '@material-ui/icons/Comment';
import ViewColumn from '@material-ui/icons/ViewColumn';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import axios from "axios";
import { forwardRef } from 'react';
//import { Web3Storage } from 'web3.storage'

//const client = new Web3Storage({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGU5OUJhNTdDMmRBNDU4MDU3YUZjMTMxMTdmZGVkZjcyQmQ2RTUzMUUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODM0NDA3ODI0MjUsIm5hbWUiOiJUb2tlbiJ9.ciiUnLeIE-vljqyuOcRUKiBdfSG6_2f4OnS3C1GTUDI"});

function Table({contract, account}) {
    const [comment, setComment] = useState("")
    const [commentFileName, setCommentFileName] = useState("")
    const [shareAddress, setShareAddress] = useState("")
    const [shareFileName, setShareFileName] = useState("")
    //const [account, setAccount] = useState(account)
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const [selectedFile,setSelectedFile] = useState(null);
    const [uploadClicked, setUploadClicked] = useState(false)
    const [uploadFailed,setUploadFailed] = useState(false)
    const [uploadSuccess,setUploadSuccess] = useState(false)
    const [openUploadModal, setOpenUploadModal] = useState(false)
    const [openShareModal, setOpenShareModal] = useState(false)
    const [openCommentModal, setOpenCommentModal] = useState(false)
    const [openLogsModal, setOpenLogsModal] = useState(false)
    const [logs, setLogs] = useState(false)
    const [fileColumns] = useState([
        { title: 'File name', field: 'fileName' },
        { title: 'Version', field: 'version' }
    ])
    const [fileData,setFileData] = useState([]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'black',
        border: '2px solid #414145',
        boxShadow: 24,
        p: 4,
        color:'white',
        textAlign:'center'
      };
      
      
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };
    
    const handleDownload = (rowData) => {
        fetch('url').then(response => {
            response.blob()
            .then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                console.log(rowData)
                alink.download = rowData.fileName;
                alink.click();
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const day = now.getDate();
                const hours = now.getHours();
                const minutes = now.getMinutes();
                const seconds = now.getSeconds();

                const currentTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                console.log(currentTimeString);
                contract.log(rowData.fileName, account, currentTimeString )
            })
            .catch(()=>{
              console.log('download')
            })
        })
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const handleTextInput = (e) =>{
        console.log(e.target.value)
        setShareAddress(e.target.value)
    }

    const handleUpload = async () => {
          if (!selectedFile) {
            console.log('Please select a file.');
            return;
          }
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
            const ImgHash = `https://apricot-central-bird-527.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`;
            await contract.add(account, ImgHash, fileName, "NA")
            console.log(ImgHash)
        
        } catch (error) {
          console.log(error);
          setUploadFailed(true)
        }
        }
    
    const handleShare = (rowData) =>{
        setOpenShareModal(true)
        setShareFileName(rowData.fileName);
    }

    const handleDelete = async(rowData) =>{
        try {
            await contract.deleteFile(account, rowData.fileName, rowData.version)
        } catch (error) {
          console.log(error);
        }
    }

    const handleComment = (rowData) =>{
        setOpenCommentModal(true)
        setCommentFileName(rowData.fileName)
        setComment(rowData.comment)
    }

    const closeShareModal = async()=>{
        setOpenShareModal(false)
        setOpenCommentModal(false)
        setOpenLogsModal(false)
    }

    const handleCommentTextInput = async(e)=>{
        setComment(e.target.value)
    }

    const handleCommentInput = async()=>{
        console.log(comment)
        var temp = commentFileName.split('  ')[0];
        console.log(temp)
        await contract.addComment(account, temp, 1, comment)
        setOpenCommentModal(false)
    }

    const handleShareInput = async() =>{
       console.log(shareAddress);
       console.log(shareFileName);
       await contract.add(shareAddress, "url", shareFileName, "NA");
       setOpenShareModal(false);
    }

    const getAllFilesApi = async(event) =>{
        console.log(contract)
        console.log("address",account)
        var dataArray = await contract.getFilesForUser(account);
        setFileData(dataArray.map((data) => ({ fileName: data.name , version: data.version.toString(), bookmark:data.isStarred, comment: data.comment})));
    }
    const handleCloseUploadModal = () =>{
        setOpenUploadModal(false)
        setUploadClicked(false)
        setSelectedFile(null)
        setUploadFailed(false)
        setUploadSuccess(false)   
    }

    const toggleBookmark = async(rowData) => {
        const updatedData = fileData.map((file) => {
            if (file.fileName === rowData.fileName) {
                console.log(file)
                console.log(rowData)
                return {
                    ...file,
                    bookmark: !file.bookmark
                };
            }
            return file;
        });
        await contract.starFile(account,fileName,rowData.version)
        setFileData(updatedData);
    };

   const handleLogs = async(rowData)=>{
        setOpenLogsModal(true);
        const logs = await contract.getLogs(rowData.fileName)
        setLogs(logs)
        console.log(logs[0][0])
    }

    useEffect(()=>{
      //  getAllFilesApi()
    },[])
  return (
    <>
        <MaterialTable
        style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}
            title="Available Files"
            icons={tableIcons}
            columns={fileColumns}
            data={fileData}      
            options={{
                headerStyle: { backgroundColor:"#EFE628", color:"black"},
                actionsColumnIndex:-1
            }}
            actions={[
                {
                    icon: ()=>(
                        <Comment />
                    ),
                    tooltip: 'Comment',
                    onClick: (event,rowData) =>{
                        handleComment(rowData)
                    }
                },
                {
                    icon: ()=>(
                        <SaveAlt />
                    ),
                    tooltip: 'Download File',
                    onClick: (event,rowData) =>{
                        handleDownload(rowData)
                    }
                },
                {
                    icon: ()=>(
                        <Share />
                    ),
                    tooltip: 'Share File',
                    onClick: (event,rowData) =>{
                        handleShare(rowData)
                    }
                },
                {
                    icon: ()=>(
                        <AccessTime />
                    ),
                    tooltip: 'Logs',
                    onClick: (event,rowData) =>{
                        handleLogs(rowData)
                    }
                },
                {
                    icon: ()=>(
                        <DeleteOutline />
                    ),
                    tooltip: 'Delete File',
                    onClick: (event,rowData) =>{
                        handleDelete(rowData)
                    }
                },
                {
                    icon: ()=>(
                        <BackupIcon style={{color:"black"}}/>
                    ),
                    isFreeAction:true,
                    tooltip: 'Upload File',
                    onClick: (event,rowData) =>{
                        setOpenUploadModal(true)
                    }
                },
                {
                    icon: ()=>(
                        <GetApp style={{color:"black"}}/>
                    ),
                    isFreeAction:true,
                    tooltip: 'Get Data',
                    onClick: (event,rowData) =>{
                        getAllFilesApi(event)
                    }
                },
                rowData => ({
                    icon: ()=>(rowData.bookmark?<TurnedInIcon />:<TurnedInNotIcon />),
                    tooltip: 'Toggle Bookmark',
                    onClick: (event, rowData) => {
                        toggleBookmark(rowData);
                    }
                  }),
            ]}
        />

    <Modal
        open={openUploadModal}
        onClose={handleCloseUploadModal}
        center>
        <div >
        <Box sx={style}>
        <h2>Upload File</h2><br />
        <input type="file" onChange={handleFileInput}/><br />
        <div style={{justifyContent:"center", textAlign:"center"}}><br />
          <Button onClick={handleUpload} disabled={(!selectedFile) || (selectedFile && uploadClicked)} variant='contained'>Upload</Button>
          {uploadSuccess && <div style={{color:"green"}}><b>File uploaded successfully</b></div>}
          {uploadFailed && <div style={{color:"red"}}><b>Upload Failed</b></div>}
        </div>
        </Box>
        </div>
    </Modal>

    <Modal
        open={openShareModal}
        center>
        <div >
        <Box sx={style}>
        <input type="text" onChange={handleTextInput}/><br />
        <Button onClick={handleShareInput}> Share </Button>
        <Button onClick={closeShareModal}> Close </Button>
        </Box>
        </div>
    </Modal>
    
    <Modal
        open={openCommentModal}
        center>
        <div >
        <Box sx={style}>
        <input type="text" value ={comment} onChange={handleCommentTextInput}/><br />
        <Button onClick={handleCommentInput}> Comment </Button>
        <Button onClick={closeShareModal}> Close </Button>
        </Box>
        </div>
    </Modal>
    <Modal open={openLogsModal} center>
        <div>
            <Box sx={style}>
            <h3>File Access Logs</h3>
            {logs && logs.length > 0 && (
                <ul>
                {logs.map((log, index) => (
                   <li key={index}>
                   User: {log[0]}, downloaded the file at timestamp: {log[1]}
                 </li>
                ))}
                </ul>
            )}
            <Button onClick={closeShareModal}>Close</Button>
            </Box>
        </div>
    </Modal>

    </>
  )
}

export default Table