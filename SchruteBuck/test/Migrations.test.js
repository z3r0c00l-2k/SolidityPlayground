const SchruteBuck = artifacts.require("SchruteBuck");

contract("SchruteBuck", (accounts) => {
  it("Sets the total supply", () => {
    return SchruteBuck.deployed()
      .then((instance) => {
        tokenInstance = instance;
        return tokenInstance.totalSupply();
      })
      .then((totalSupply) => {
        assert.equal(
          totalSupply.toNumber(),
          1000000,
          "Sets the total supply to 1,000,000"
        );
      });
  });
});
