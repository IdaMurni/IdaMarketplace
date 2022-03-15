// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Messagers {
    uint256 messageCount;

    event Message(address from, address receiver, string title, string message, uint256 timestamp);
  
    struct MessageStruct {
        address sender;
        address receiver;
        string title;
        string message;
        uint256 timestamp;
    }

    MessageStruct[] sendingMessages;

    function addToChain(address payable receiver, string memory title, string memory message) public {
        messageCount += 1;
        sendingMessages.push(MessageStruct(msg.sender, receiver, title, message, block.timestamp));

        emit Message(msg.sender, receiver, title, message, block.timestamp);
    }

    function getAllTransactions() public view returns (MessageStruct[] memory) {
        return sendingMessages;
    }

    function getMessageCount() public view returns (uint256) {
        return messageCount;
    }
}