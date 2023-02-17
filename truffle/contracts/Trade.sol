// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Trade{
    function trade(address tkn, address recipient, uint amount) external {
        IERC20(tkn).transferFrom(msg.sender, recipient, amount);
    }

    function getBalance(address tkn, address wallet) external view returns(uint){
        return IERC20(tkn).balanceOf(wallet);
    }

    function getAllowance(address tkn, address owner) external view returns(uint) {
        return IERC20(tkn).allowance(owner, address(this));
    }
}