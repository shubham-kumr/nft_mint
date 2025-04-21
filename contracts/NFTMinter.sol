// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts v4.8.0 (token/ERC721/ERC721.sol)
// OpenZeppelin is a library for secure smart contract development. It provides reusable and secure smart contract components, including ERC20 and ERC721 token standards, access control mechanisms, and more.
pragma solidity ^0.8.18;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol"; //NFT contract need to create a NFT on the blockchain
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol"; // Ownable contract to manage ownership of the NFT
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; // ERC721Enumerable contract to manage the enumeration of NFTs
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // ERC721URIStorage contract to manage the metadata of the NFTs

// The constructor initializes the contract with the name "NFTMinter" and symbol "NFT".
// It also sets the initial owner of the contract to the address provided as an argument.
// The Ownable contract ensures that only the owner can perform certain actions, such as minting new NFTs or transferring ownership of the contract.

contract NFTMinter is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor(
        address initialOwner
    ) ERC721("NFTMinter", "NFT") Ownable(initialOwner) {}

    // The mint function allows the owner to mint a new NFT with a specified token ID and metadata URI.
    // It uses the _safeMint function from the ERC721 contract to safely mint the NFT and assign it to the specified address.
    // The _setTokenURI function from the ERC721URIStorage contract is used to set the metadata URI for the minted NFT.
    // The function returns the token ID of the newly minted NFT.
    function _safeMint(
        address to,
        string memory uri
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    // The _baseURI function returns the base URI for the metadata of the NFTs.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address){
        return super._update(to, tokenId, auth);
    }

    // This function is used to increase the balance of a specific account by a specified value.
    // It overrides the _increaseBalance function from the ERC721 and ERC721Enumerable contracts to ensu    re that the balance is updated correctly.
    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    // This function is used to get the metadata URI for a specific token ID.
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // This supportsInterface function is used to check if the contract supports a specific interface.
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }


}
