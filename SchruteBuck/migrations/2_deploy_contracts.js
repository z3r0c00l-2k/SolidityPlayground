const SchruteBuck = artifacts.require("SchruteBuck");
const SchruteBuckSale = artifacts.require("SchruteBuckSale");

module.exports = async (deployer) => {
  await deployer.deploy(SchruteBuck, 1000000);

  const tokenPrice = 1000000000000000;
  await deployer.deploy(SchruteBuckSale, SchruteBuck.address, tokenPrice);
};
