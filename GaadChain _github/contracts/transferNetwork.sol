pragma solidity ^0.8.0;

import "./peerNetwork.sol";

contract TransferNetwork is PeerNetwork {
    struct Transfer {
        address peerAddress;
        string transfercode;
    }

    Transfer[] internal transfers;

    function _allotCode(
        string memory _transaction,
        string memory _type,
        string memory _pincode,
        string memory _weight,
        string memory _category
    ) public onlyPeer(msg.sender) {
        transfers.push(
            Transfer(
                msg.sender,
                string(
                    abi.encodePacked(
                        _transaction,
                        _type,
                        _pincode,
                        _weight,
                        _category
                    )
                )
            )
        );
    }
}
