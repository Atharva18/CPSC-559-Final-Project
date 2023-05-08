import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from "react";

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
import Search from '@material-ui/icons/Search';
import Share from '@material-ui/icons/Share';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from "axios";
import { forwardRef } from 'react';

function Table() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadClicked, setUploadClicked] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [fileColumns] = useState([
    { title: 'File name', field: 'fileName' },
    // { title: 'Bookmark', field: 'bookmark', type: 'boolean' }
  ]);
  const [fileData, setFileData] = useState([
    {
      fileName: "abc.txt",
      bookmark: false,
      version: 1,
    },
    
    {
      fileName: "def.txt",
      bookmark: false,
      version: 1,
    },
    {
      fileName: "crypt.txt",
      bookmark: false,
      version: 1,
    },
    {
      fileName: "sha256.txt",
      bookmark: false,
      version: 1,
    },
    {
      fileName: "ledger.txt",
      bookmark: false,
      version: 1,
    },
    {
      fileName: "florida.txt",
      bookmark: false,
      version: 1,
    },
    {
      fileName: "brooklyn.txt",
      bookmark: false,
      version: 1,
    },
    {
      fileName: "california.txt",
      bookmark: false,
      version: 1,
    },
  ]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #414145',
    boxShadow: 24,
    p: 4,
    color: 'white',
    textAlign: 'center'
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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
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
        alink.download = rowData.fileName;
        alink.click();
        })
        .catch(() => {
        console.log('download ')
        })
        })
    }
    
    const toggleBookmark = (rowData) => {
        const updatedData = fileData.map((file) => {
            if (file.fileName === rowData.fileName) {
                return {
                    ...file,
                    bookmark: !file.bookmark
                };
            }
            return file;
        });
        setFileData(updatedData);
    };
    
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
    console.log('formData', formData)
    try {
        await axios.post('url', formData).then(response => {
        console.log("File uploaded successfully.", response);
    
        const updatedFileData = [...fileData];
    
        // Check if the file with the same name already exists
        const existingFile = fileData.find((file) => file.fileName === selectedFile.name);
        if (existingFile) {
            // Increment the version number for the existing file
            const version = existingFile.version ? existingFile.version + 1 : 2;
            existingFile.fileName = `${existingFile.fileName} (version ${version})`;
            existingFile.version = version;
        } else {
            // Add the new file to the fileData array
            updatedFileData.push({
                fileName: selectedFile.name,
                bookmark: false,
                version: 1, // Set the version as 1 for newly uploaded files
            });
        }
        setFileData(updatedFileData);
        setUploadSuccess(true);
        setUploadClicked(true);
        });
    
    } catch (error) {
        console.log(error);
        setUploadFailed(true);
    }
}

const handleShare = (rowData) => {
//share file api call
}

const handleDelete = (rowData) => {
//api call to delete file
}

const getAllFilesApi = () => {
// console.log('api call to get all files')
}
const handleCloseUploadModal = () => {
setOpenUploadModal(false);
setUploadClicked(false);
setSelectedFile(null);
setUploadFailed(false);
setUploadSuccess(false);
}

useEffect(() => {
getAllFilesApi();
}, [])

return (
<>
<MaterialTable
    style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    title="Available Files"
    icons={tableIcons}
    columns={fileColumns}
    data={fileData}
    options={{
        headerStyle: { backgroundColor: "#EFE628", color: "black" },
        actionsColumnIndex: -1
    }}
    actions={[
    {
        icon: () => (
            <SaveAlt />
        ),
        tooltip: 'Download File',
        onClick: (event, rowData) => {
            handleDownload(rowData)
        }
    },
    {
        icon: () => (
            <Share />
        ),
        tooltip: 'Share File',
        onClick: (event, rowData) => {
            handleShare(rowData)
        }
    },
    {
        icon: () => (
            <DeleteOutline />
        ),
        tooltip: 'Delete File',
        onClick: (event, rowData) => {
            handleDelete(rowData)
        }
    },
    {
        icon: () => (
            <BackupIcon style={{ color: "black" }} />
        ),
        isFreeAction: true,
        tooltip: 'Upload File',
        onClick: (event, rowData) => {
            setOpenUploadModal(true)
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
    center
  >
    <div >

      <Box sx={style}>
        <h2>Upload File</h2><br />
        <input type="file" onChange={handleFileInput} /><br />
        <div style={{ justifyContent: "center", textAlign: "center" }}><br />
          <Button onClick={handleUpload} disabled={(!selectedFile) || (selectedFile && uploadClicked)} variant='contained'>Upload</Button>
          {uploadSuccess && <div style={{ color: "green" }}><b>File uploaded successfully</b></div>}
          {uploadFailed && <div style={{ color: "red" }}><b>Upload Failed</b></div>}
        </div>
      </Box>
    </div>
  </Modal>
</>
)
}

export default Table;