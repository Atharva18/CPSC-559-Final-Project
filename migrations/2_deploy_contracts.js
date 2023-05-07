var fileUtils= artifacts.require("./src/contracts/FileUtils.sol");
var userAuth = artifacts.require("./src/contracts/UserAuthentication.sol");

module.exports = function(deployer) {
    deployer.deploy(fileUtils);
    deployer.deploy(userAuth);
}