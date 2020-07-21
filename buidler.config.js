usePlugin("@nomiclabs/buidler-waffle");
usePlugin("@nomiclabs/buidler-etherscan");

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

task("deploy", "Deploys the contract", async() => {
  await require('./scripts/deploy.js').main();
})

const networks = process.env.PRIVKEY ? {
  rinkeby: {
      url: "https://rinkeby.infura.io/v3/de1b4b3b82394b6fb9a860301979032c",
      accounts: [
          process.env.PRIVKEY
      ]
  },
  kovan: {
      url: "https://kovan.infura.io/v3/de1b4b3b82394b6fb9a860301979032c",
      accounts: [
        process.env.PRIVKEY
      ]
  },
  main: {
      url: "https://mainnet.infura.io/v3/de1b4b3b82394b6fb9a860301979032c",
      accounts: [
          process.env.PRIVKEY
      ]
  },
} : {};

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  // This is a sample solc configuration that specifies which version of solc to use
  solc: {
    version: "0.5.8",
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks,
  etherscan: {
    // The url for the Etherscan API you want to use.
    // For example, here we're using the one for the Ropsten test network
    // url: "https://api-rinkeby.etherscan.io/api",
    url: "https://api-kovan.etherscan.io/api",
    // url: "https://explorer.eth.rnd.dev/api",
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "TM912U96H6BTQ2AXSB2M6MYPEIAV2ET5EU"
  },
};
