// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.21 <0.6.0;

contract UserAuthentication{

    mapping(address=>string) userPassMappings;

    function addUser(address _user,string calldata pass) external {
        userPassMappings[_user]=pass;
    }

    function userExists(address _user) public view returns(string memory) {
       return userPassMappings[_user];
    }

    function checkPass(address _user, string memory pass) public view returns(bool) {
        if(keccak256(abi.encodePacked(userPassMappings[_user])) == keccak256(abi.encodePacked(pass)))
            return true;
        return false;
    }

}
