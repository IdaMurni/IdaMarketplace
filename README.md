# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

Compile run Test
```shell
npx hardhat test
```

Compile Contract
```shell
npx hardhat compile
```

Deploy Contract to Mumbai network
```shell
//before deployed the Contract change the integer of x in config.js line 4
npx hardhat run --network mumbai scripts/deploy.js
```
