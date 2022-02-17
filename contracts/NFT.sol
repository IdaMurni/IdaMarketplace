//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract NFT is ERC721URIStorage {
    //auto-increments field for token
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    // address of the NFT Marketplace
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("WolfMother-IDA", "wIDA") {
        contractAddress = marketplaceAddress;
    }

    /// @notice create a new token
    /// @param tokenURI : token URI 
    function createToken(string memory tokenURI) public returns(uint) {
        // set a new token id for a new token tobe minted
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);

        return newItemId;
    }
}