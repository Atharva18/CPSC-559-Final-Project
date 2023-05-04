var fileAccess = artifacts.require("./src/contracts/FileAccess.sol");
var userAuth = artifacts.require("./src/contracts/UserAuthentication.sol");

module.exports = function(deployer) {
    deployer.deploy(fileAccess);
    deployer.deploy(userAuth);
}