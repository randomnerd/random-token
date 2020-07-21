const { expect } = require("chai");
let RandomToken;
let accounts;
let addresses;
let decimals;
let token;

function balanceToFloat(balance, decimals = 18) {
  return ethers.BigNumber.from(balance)
    .div(ethers.BigNumber.from(10).pow(decimals))
    .toNumber();
}

function floatToBalance(balance, decimals = 18) {
  return ethers.BigNumber.from(balance)
    .mul(ethers.BigNumber.from(10).pow(decimals))
    .toString();
}

describe("RandomToken", function() {
  this.beforeEach(async () => {
    accounts = await ethers.getSigners();
    addresses = await Promise.all(accounts.map(async a => a.getAddress()));
    RandomToken = await ethers.getContractFactory("RandomToken");
    token = await RandomToken.deploy();
    await token.deployed();
    decimals = await token.decimals();
  });

  it("Should deploy with proper details", async function() {
    expect(decimals).to.equal(4);
    expect(await token.name()).to.equal('RandomToken');
    expect(await token.symbol()).to.equal('RNDM');
  });

  it('Should deploy with correct supply', async function() {
    const supply = await token.totalSupply();
    expect(balanceToFloat(supply, decimals)).to.equal(1000000);
  });

  it('Should deploy with proper owner balance', async function() {
    const address = addresses[0];
    const tokenBalance = await token.balanceOf(address);
    expect(balanceToFloat(tokenBalance, decimals)).to.equal(1000000);
  });

  it('Should allow token transfer', async function() {
    const from = addresses[0];
    const to = addresses[1];
    await token.transfer(to, floatToBalance(100000, decimals));
    const fromBalance = await token.balanceOf(from);
    expect(balanceToFloat(fromBalance, decimals)).to.equal(900000);
    const toBalance = await token.balanceOf(to);
    expect(balanceToFloat(toBalance, decimals)).to.equal(100000);
  });
});
