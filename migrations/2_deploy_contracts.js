var upload = artifacts.require("./src/contracts/Upload.sol");

module.exports = function(deployer) {
    deployer.deploy(upload);

}