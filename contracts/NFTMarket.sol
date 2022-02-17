//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemsIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 listingPrice = 0.025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private IdMarketItem;

    //log message
    event MarketItemCreated(
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    function getListingPrice() public view returns(uint256){
        return listingPrice;
    }

    /// @notice create market items
    function createMarketItem(address nftContract, uint tokenId, uint256 price) public payable nonReentrant {
        require(price > 0, "Price cannot be 0");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        _itemsIds.increment();
        uint256 itemId = _itemsIds.current();
        IdMarketItem[itemId] = MarketItem(itemId, nftContract, tokenId, payable(msg.sender), payable(address(0)), price, false);

        // transfer the ownership of the nft.
        IERC721(nftContract).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        // log the transaction
        emit MarketItemCreated(itemId, nftContract, tokenId, msg.sender, address(0), price, false);
    }

    function createMarketSale(address nftContract, uint256 itemId) public payable nonReentrant {
        uint price = IdMarketItem[itemId].price;
        uint tokenId = IdMarketItem[itemId].tokenId;

        require(msg.value == price, "Please submit the correct value to purchase the item");

        //pay the seller amount
        IdMarketItem[itemId].seller.transfer(msg.value);
                // transfer the ownership of the nft.
        IERC721(nftContract).transferFrom(
            address(this),
            msg.sender,
            tokenId
        );

        IdMarketItem[itemId].owner = payable(msg.sender); // mark buyer as a new owner
        IdMarketItem[itemId].sold = true; //mark tat it has been sold
        _itemsSold.increment();
        payable(owner).transfer(listingPrice); // pay owner of the contract the listing payment

    }

    /// @notice total number of items unsold on our platform
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemsIds.current(); // total number if items ever created;
        uint unsoldItemCount = _itemsIds.current() - _itemsSold.current();
        uint currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for(uint i = 0; i < itemCount; i++) {
            if(IdMarketItem[i+1].owner == address(0)) {
                uint currentId = IdMarketItem[i + 1].itemId;
                MarketItem storage currentItem = IdMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @notice fetch list of NFTS owner by this user
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemsIds.current();

        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalItemCount; i++) {
            if(IdMarketItem[i+1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i = 0; i < totalItemCount; i++) {
            if(IdMarketItem[i+1].owner == msg.sender) {
                uint currentId = IdMarketItem[i+1].itemId;
                MarketItem storage currentItem = IdMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    /// @notice fetch list of NFTS owned/bought by this user
    function fetchItemsCreated() public view returns (MarketItem[] memory){
        //get total number of items ever created
        uint totalItemCount = _itemsIds.current();

        uint itemCount = 0;
        uint currentIndex = 0;


        for(uint i = 0; i < totalItemCount; i++){
            //get only the items that this user has bought/is the owner
            if(IdMarketItem[i+1].seller == msg.sender){
                itemCount += 1; //total length
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i = 0; i < totalItemCount; i++){
            if(IdMarketItem[i+1].seller == msg.sender){
                uint currentId = IdMarketItem[i+1].itemId;
                MarketItem storage currentItem = IdMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;

    }

}