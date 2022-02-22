// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./transferNetwork.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CPCB is TransferNetwork, Ownable {
    function addPeer(address _peerAddress) public onlyOwner {
        peers.push(_peerAddress);
    }

    function listPeerTransfers()
        public
        view
        onlyPeer(msg.sender)
        returns (string[] memory)
    {
        string[] memory peerCodes = new string[](transfers.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < transfers.length; ++i) {
            if (transfers[i].peerAddress == msg.sender) {
                peerCodes[counter] = transfers[i].transfercode;
                counter++;
            }
        }
        return peerCodes;
    }

    function listAllTransfers()
        public
        view
        onlyOwner
        returns (Transfer[] memory)
    {
        return transfers;
    }

    function listAllPeers() public view onlyOwner returns (address[] memory) {
        return peers;
    }
}
