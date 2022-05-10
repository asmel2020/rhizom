// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IRhizomFactory{
    function encodeNft(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        address _owner
    ) external pure returns (bytes memory);

     function encodeToken(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address _owner
    ) external pure returns (bytes memory);
}