const SchruteBuck = artifacts.require("SchruteBuck");

module.exports = function (deployer) {
  deployer.deploy(SchruteBuck, 1000000);
};
