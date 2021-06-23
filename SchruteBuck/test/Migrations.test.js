const SchruteBuck = artifacts.require("SchruteBuck");

contract("SchruteBuck", (accounts) => {
  it("Set Token Name, Symbol and Standard", async () => {
    const tokenInstance = await SchruteBuck.deployed();
    const name = await tokenInstance.name();
    const symbol = await tokenInstance.symbol();
    const standard = await tokenInstance.standard();
    assert(name, "SchruteBuck", "Token has correct name");
    assert(symbol, "SBUCK", "Token has correct symbol");
    assert(standard, "SchruteBuck V1.0", "Token has correct standard");
  });

  it("Sets the total supply", async () => {
    const tokenInstance = await SchruteBuck.deployed();
    const totalSupply = await tokenInstance.totalSupply();
    assert.equal(
      totalSupply.toNumber(),
      1000000,
      "Sets the total supply to 1,000,000"
    );
  });

  it("allocate initial supply", async () => {
    const tokenInstance = await SchruteBuck.deployed();
    const adminBalance = await tokenInstance.balanceOf(accounts[0]);
    assert.equal(
      adminBalance.toNumber(),
      1000000,
      "Allocate total supply to admin"
    );
  });

  it("allocate initial supply", async () => {
    const tokenInstance = await SchruteBuck.deployed();
    const adminBalance = await tokenInstance.balanceOf(accounts[0]);
    assert.equal(
      adminBalance.toNumber(),
      1000000,
      "Allocate total supply to admin"
    );
  });

  it("Transfer tokens", async () => {
    const tokenInstance = await SchruteBuck.deployed();
    try {
      await tokenInstance.transfer.call(accounts[1], 99999999999999);
      assert.fail();
    } catch (error) {
      assert(error.message.indexOf("revert") >= 0, "error must contain revert");
    }

    const amountToTranfer = 250;

    const success = await tokenInstance.transfer.call(
      accounts[1],
      amountToTranfer,
      {
        from: accounts[0],
      }
    );
    assert.equal(success, true, "It returns true");

    const initialFromBalance = await tokenInstance.balanceOf(accounts[0]);
    const initialToBalance = await tokenInstance.balanceOf(accounts[1]);

    const receipt = await tokenInstance.transfer(accounts[1], amountToTranfer, {
      from: accounts[0],
    });

    const afterFromBalance = await tokenInstance.balanceOf(accounts[0]);
    const afterToBalance = await tokenInstance.balanceOf(accounts[1]);

    assert.equal(receipt.logs.length, 1, "triggers one event");
    assert.equal(
      receipt.logs[0].event,
      "Transfer",
      'should be the "Transfer" event'
    );
    assert.equal(
      receipt.logs[0].args._from,
      accounts[0],
      "logs the account the tokens are transferred from"
    );
    assert.equal(
      receipt.logs[0].args._to,
      accounts[1],
      "logs the account the tokens are transferred to"
    );
    assert.equal(
      receipt.logs[0].args._value,
      amountToTranfer,
      "logs the transfer amount"
    );

    assert.equal(
      afterToBalance.toNumber() - initialToBalance.toNumber(),
      amountToTranfer,
      "Amount Credited To Address"
    );
    assert.equal(
      initialFromBalance.toNumber() - afterFromBalance.toNumber(),
      amountToTranfer,
      "Amount Debited From Address"
    );
  });
});
