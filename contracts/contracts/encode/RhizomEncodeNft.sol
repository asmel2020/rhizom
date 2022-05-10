// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../templates/RhizomNft.sol";
/// @custom:security-contact danny.galicia@rhizom.me
contract RhizomEncodeNft {

    function encodeNft(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        address _owner
    ) external pure returns (bytes memory) {
        bytes memory bytecode = type(RhizomNft).creationCode;
        return
            abi.encodePacked(
                bytecode,
                abi.encode(_name, _symbol, _uri, _owner)
            );
    }


}
