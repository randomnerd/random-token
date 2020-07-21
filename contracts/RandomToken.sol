pragma solidity ^0.5.8;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract RandomToken is ERC20, ERC20Detailed
{
    constructor () public ERC20Detailed("RandomToken", "RNDM", 4)
    {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}
