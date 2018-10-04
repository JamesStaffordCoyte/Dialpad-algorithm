pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import "./Ownable.sol";

contract Dialpad is Ownable {
  // state variables
  uint256 public bounty;
  address public owner;
  uint256 digits = 100;
  address public winner;

  // self-destruct function
  function kill() public {
    if (msg.sender == owner) selfdestruct(owner);
  }

  // Sets owner of contract and bounty (0.1 Eth must be sent )
  constructor() public {
    owner = msg.sender;
  }

  // Only owner can set bounty
  function setBounty() external onlyOwner payable{
    bounty = msg.value;
  }

  // Called from Javascript with web3.js if the user has found the 100 digit answer
  function lockFundsUntil (uint256 _count) public {
    require(_count === digits);
    winner = msg.sender;
    // Call withdraw
    withdraw()
  }

  function withdraw () internal payable{
    require(msg.sender === winner);
    uint256 payout = bounty;
    bounty = 0;
    msg.sender.transfer(payout);
 }

 function () public payable {}

}
