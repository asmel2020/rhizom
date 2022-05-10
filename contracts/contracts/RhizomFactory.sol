// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/Create2Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "./lib/EternalStorageUpgradeable.sol";
import "./interface/IRhizomFactory.sol";

contract RhizomFactory is
    Initializable,
    UUPSUpgradeable,
    EternalStorageUpgradeable,
    OwnableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _salt;

    event Creation(
        address indexed Creator,
        address indexed newContract,
        string types
    );

    struct Tokens {
        uint256 types;
        uint256 supply;
        uint256 timeCreate;
        string name;
        string symbol;
        address owner;
        address addressContrat;
    }

    mapping(address => Tokens[]) private UserContracts;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function tokenCreate(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address _owner
    ) external returns (address) {
        bytes memory contractsBytes = IRhizomFactory(
            getAddress(stringKey("ENCODE_TOKEN_ADDRESS"))
        ).encodeToken(_name, _symbol, _supply, _owner);

        address addressDeploy = deploy(contractsBytes);

        UserContracts[msg.sender].push(
            Tokens(1,_supply,block.timestamp,_name,_symbol,_owner,addressDeploy)
        );

        emit Creation(address(this), addressDeploy, "TOKEN");
        return addressDeploy;
    }

    function nftCreate(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        address _owner
    ) external returns (address) {
        bytes memory contractsBytes = IRhizomFactory(
            getAddress(stringKey("ENCODE_NFT_ADDRESS"))
        ).encodeNft(_name, _symbol, _uri, _owner);

        address addressDeploy = deploy(contractsBytes);

        UserContracts[msg.sender].push(
            Tokens(2, 0, block.timestamp, _name, _symbol, _owner,addressDeploy)
        );

        emit Creation(address(this), addressDeploy, "NFT");
        return addressDeploy;
    }

    function setEncodeTokenAddress(address _newAddress) external onlyOwner {
        setAddress(stringKey("ENCODE_TOKEN_ADDRESS"), _newAddress);
    }

    function setEncodeNftAddress(address _newAddress) external onlyOwner {
        setAddress(stringKey("ENCODE_NFT_ADDRESS"), _newAddress);
    }

    function getBalanceContrac() public view returns (uint256) {
        return _salt.current();
    }

    function getUserContracts(address _wallet) public view returns (Tokens[] memory) {
        uint256 UserContractsLength = UserContracts[_wallet].length;

        Tokens[] memory tokens = new Tokens[](UserContractsLength);

        for (uint256 i = 0; i < UserContractsLength; i++) {
            tokens[i] = UserContracts[_wallet][i];
        }

        return tokens;
    }

     /// @dev
    function deploy(bytes memory bytecode) internal returns (address) {
        _salt.increment();
        
        return Create2Upgradeable.deploy(
            0,
            keccak256(abi.encodePacked(_salt.current())),
            bytecode
        );
    }

    ///@dev PROXY
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}
