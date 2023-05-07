// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.21 <0.6.0;

pragma experimental ABIEncoderV2;

contract FileUtils {

 struct File{
    string url;
    uint version;
    string name;
    bool isStarred;
    string comment;
 }
  
  struct Access{
     address user; 
     bool access; 
  }

  struct FileLog{
      address user;
      string timestamp;
  }
  mapping(address=>string[]) fileUrls;
  mapping(address=>string[]) fileNames;
  mapping(address=>mapping(address=>bool)) trackOwner;
  mapping(address=>mapping(string=>File[])) filesMapping;
  mapping(address=>Access[]) accessList;
  mapping(address=>mapping(address=>bool)) lastState;
  mapping(string=>FileLog[]) fileLogs;


  function log(string calldata file, address _user, string calldata timestamp) external{
      fileLogs[file].push(FileLog(_user, timestamp));
  }

  function getLogs(string memory file) public view returns(FileLog[] memory){
      return fileLogs[file];
  }

  function add(address _user,string calldata url, string calldata name, string calldata comment) external {
      if(filesMapping[_user][name].length > 0){
          uint version = filesMapping[_user][name].length + 1;
          filesMapping[_user][name].push(File(url, version, name, false, comment));
      }else{
        filesMapping[_user][name].push(File(url, 1, name, false, comment));
      }
        fileUrls[_user].push(url);

        uint flag=0;

        for(uint i=0; i<fileNames[_user].length;i++){
            if(keccak256(abi.encodePacked(fileNames[_user][i]))==keccak256(abi.encodePacked(name))){
                flag=1;
                break;
            }
        }
        if(flag==0)
             fileNames[_user].push(name);
  }

  function starFile(address _user, string calldata fileName, uint version) external view {
         File[] memory fileList = filesMapping[_user][fileName];
           for (int i = 0; i < int(fileList.length); i++) {
              if (fileList[uint(i)].version == version) {
                  fileList[uint(i)].isStarred=true;
              }
           }
  }

    function addComment(address _user, string calldata fileName, uint version, string calldata comment) external view {
         File[] memory fileList = filesMapping[_user][fileName];
           for (int i = 0; i < int(fileList.length); i++) {
              if (fileList[uint(i)].version == version) {
                  fileList[uint(i)].comment=comment;
              }
           }
     }

    function deleteComment(address _user, string calldata fileName, uint version) external view {
         File[] memory fileList = filesMapping[_user][fileName];
           for (int i = 0; i < int(fileList.length); i++) {
              if (fileList[uint(i)].version == version) {
                  fileList[uint(i)].comment="";
              }
           }
     }


  function unStarFile(address _user, string calldata fileName, uint version) external view{
          File[] memory fileList = filesMapping[_user][fileName];
           for (int i = 0; i < int(fileList.length); i++) {
              if (fileList[uint(i)].version == version) {
                  fileList[uint(i)].isStarred=false;
              }
           }
  }

  function getFilesForUser(address _user) public view returns(File[]  memory){
      File[] memory fileList = new File[](20);
      uint index=0;

      for(uint i=0; i<fileNames[_user].length;i++){
          string memory name = fileNames[_user][i];
          File[] memory tempList = filesMapping[_user][name];
          for(uint j=0; j<tempList.length;j++){
            fileList[index]= tempList[j];
            index=index+1;
          }
      }

    return fileList;
  }

   function deleteFile(address _user, string calldata name, uint version) external {
         File[] storage fileList = filesMapping[_user][name];
             for (int i = int(fileList.length) - 1; i >= 0; i--) {
              if (fileList[uint(i)].version == version) {
                 fileList[uint(i)] = fileList[fileList.length - 1];
                 fileList.pop();
             }
         }
         filesMapping[_user][name]=fileList;
         if(fileList.length==0){
             fileNames[_user].pop();
         }
   }

  function allow(address user) external {
      trackOwner[msg.sender][user]=true; 
      if(lastState[msg.sender][user]){
         for(uint i=0;i<accessList[msg.sender].length;i++){
             if(accessList[msg.sender][i].user==user){
                  accessList[msg.sender][i].access=true; 
             }
         }
      }else{
          accessList[msg.sender].push(Access(user,true));  
          lastState[msg.sender][user]=true;  
      }
    
  }
  function disallow(address user) public{
      trackOwner[msg.sender][user]=false;
      for(uint i=0;i<accessList[msg.sender].length;i++){
          if(accessList[msg.sender][i].user==user){ 
              accessList[msg.sender][i].access=false;  
          }
      }
  }

  function display(address _user) external view returns(string[] memory){
      require(_user==msg.sender || trackOwner[_user][msg.sender],"You don't have access");
      return fileUrls[_user];
  }

  function shareAccess() public view returns(Access[] memory){
      return accessList[msg.sender];
  }
}