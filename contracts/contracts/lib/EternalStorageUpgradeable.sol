// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol";

contract EternalStorageUpgradeable {

    ///@dev eternal store
    function setUint(bytes32 _key, uint256 _value) internal {
        StorageSlotUpgradeable.getUint256Slot(_key).value = _value;
    }

    function setAddress(bytes32 _key, address _value) internal {
        StorageSlotUpgradeable.getAddressSlot(_key).value = _value;
    }

    function setBytes(bytes32 _key,bytes32 _value) internal {
        StorageSlotUpgradeable.getBytes32Slot(_key).value = _value;
    }

    function setBoolean(bytes32 _key, bool _value) internal {
        StorageSlotUpgradeable.getBooleanSlot(_key).value = _value;
    }

    function getUint(bytes32 _key) public view returns (uint256) {
        return StorageSlotUpgradeable.getUint256Slot(_key).value;
    }

    function getBytes(bytes32 _key) public view returns (bytes32) {
        return StorageSlotUpgradeable.getBytes32Slot(_key).value;
    }

    function getAddress(bytes32 _key) public view returns (address) {
        return StorageSlotUpgradeable.getAddressSlot(_key).value;
    }

    function getBoolean(bytes32 _key) public view returns (bool) {
        return StorageSlotUpgradeable.getBooleanSlot(_key).value;
    }

    ///@dev helpes
    function uintKey(uint256 _key) internal pure returns(bytes32){
        return keccak256(abi.encodePacked(_key));
    }

    function addressKey(address _key) internal pure returns(bytes32){
        return keccak256(abi.encodePacked(_key));
    }

    function stringKey(string memory _key) internal pure returns(bytes32){
        return keccak256(abi.encodePacked(_key));
    }
   
}