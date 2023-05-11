# CPSC-559-Advanced-Blockchain-Final-Project

# Features

**User Authentication** - The first improvement we made was user authentication. We added the user registration and login system in which the user will have to register using his Metamask account address and password so that all his files are secured and will not be accessible by anyone else.
**File Upload** - We added the feature of uploading a file to the decentralized file system. After logging in the user will be able to upload the file from his local machine to the decentralized file storage system. We used IPFS to store the files. 
**File Download** - The user can download files that are available in his account onto his local machine to view or edit.
**File Share**- The user can share his file to other users by entering the other user’s account address giving them access to edit or view his files. The user can also revoke the access if required.
**File Delete**- The user is able to delete a file or its version from his account.
**File Versioning** - The user is able to have multiple versions of the same file on his account, these versions will be displayed as branches of the original file and the user will also be able to see the details of each version of the file separately. Users also have the option to delete different versions of the file.
**Bookmarking** - The user is able to star mark or bookmark the file he wants. Suppose some files are important for the user or he wants to mark them for easy further access then he will be able to do so by bookmarking it.
**Goerli Deployment** - We deployed the code on the Goerli test network.
**File Retrieval** - All the uploaded files are displayed on the dashboard.
**Access log** - An access log will be maintained whenever a user will access a file, the timestamp and the user's details will be recorded and maintained in a log.
**Comment** - The user is able to comment anything to the files uploaded. Suppose he wants to add a note to a file then he will be able to do it.
**UI changes** - For each function in the backend contract, we created a corresponding interactive UI that calls the backend contracts and displays the data.

# Steps To Run:

1) Download the code and open it in any code editor
2) Run "npm install" to install all the dependencies
3) Run "truffle migrate" to compile and migrate the code
4) Start ganache and establish a connection
5) Copy the private key from the ganache transaction and use that private key to establish a connection with metamask
6) Connect the metamask with the local website
7) Run "npm start" and the app will run on the local host.

