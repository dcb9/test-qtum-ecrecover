pragma solidity ^0.4.18;

import "./ECRecovery.sol";

contract MyAddress {

  event RecoveredAddress(address msgSender, address recoveredAddress);

  function recoverAddress(bytes32 _hash, bytes _sig) public returns (bool) { 
    address recoveredAddress = ECRecovery.recover(_hash, _sig);
    emit RecoveredAddress(msg.sender, recoveredAddress); // should be the same address
    return recoveredAddress == msg.sender; // should return true. but we get false
  }
}
