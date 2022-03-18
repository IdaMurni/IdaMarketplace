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

#IdaMarketPlace contains Beta-Version of Smart Contracts
1. NFT Marketplace
2. NFT - ERC721
3. Auction
4. Messages

#How to use/Test Auction.
1. before you deployed and interact with Auction, you need to deployed NFT contract and create an nft token.
2. keep the contract address and the token_id. we need those to deployed the auction Smart Contract
3. fill the _NFT, _NFTID, _STARTINGBID fields and deploy the auction contract.
4. after auction deployed we need to aprove our NFT bei pasted the auction contract address and the tokenid. therefore we need our auction contract address and the tokenid.
5. after it aproved we can now start the auction by calling start()
6. after it is all ends the tokens will automatic transfered to the creator of the auction.

by default the Auction will expired after 2, 7, 10, and 15 days

example:
```shell
enum TimeDuration {
    Twentyfour,
    Seven,
    Ten,
    Fifteen
}

TimeDuration public setDuration;

function start(TimeDuration _setDuration) external {
    setDuration = _setDuration;
    ...
    setTimeOut();
    ...
}

function setTimeOut() public returns(uint){
    if(setDuration == TimeDuration.Twentyfour) {
        endAt = block.timestamp + 2 days; //24hour
        return endAt;
    } else if (setDuration == TimeDuration.Seven) {
        endAt = block.timestamp + 7 days; //7days
        return endAt;
    } else if (setDuration == TimeDuration.Ten) {
        endAt = block.timestamp + 10 days; //10days
        return endAt;
    }

    endAt = block.timestamp + 15 days; //15days
    return endAt;
}

```