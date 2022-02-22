pragma solidity ^0.8.0;

contract PeerNetwork{

    address[] internal peers;

    function _isPeer(address _peerAddress) private view returns(bool){

        bool flag = false;

        for(uint i=0;i<peers.length;++i){
            if(_peerAddress == peers[i]){
                flag = true;
            }
        }
        return flag;
    }


    modifier onlyPeer(address _peerAddress){
        require(_isPeer(_peerAddress));
        _;
    }

}