// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../templates/RhizomToken.sol";
/// @custom:security-contact danny.galicia@rhizom.me
contract RhizomEncodeToken {

    function encodeToken(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address _owner
    ) external pure returns (bytes memory) {
        bytes memory bytecode = type(RhizomToken).creationCode;
        return
            abi.encodePacked(
                bytecode,
                abi.encode(_name, _symbol, _supply, _owner)
            );
    }


}
