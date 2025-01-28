// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./interfaces/IBilateralTrade.sol";

contract BilateralTrade is IBilateralTrade, ReentrancyGuard {
    IRegister public register;
    Status public status;
    address public sellerAccount;
    address public actaChainRegistry;
    TradeDetail public details;
    string public envelopeId;

    /**
     * @dev when the smart contract deploys :
     * - we check that deployer has been whitelisted
     * - we check that buyer has been whitelisted
     * - we map the register contract to interact with it
     * - variable sellerAccount gets msg.sender address
     * - details struct buyer gets buyer address
     * - status of current contract is Draft
     * The constructor cannot be checked by the register by looking ain the hash of
     * the runtime bytecode because this hash does not cover the constructor.
     * so controls in the constructors are to be replicated in the first interaction with a function
     */
    constructor(IRegister _register, address _buyer, address _actaChainRegistry, string memory _envelopeId) {
        require(
            _register.investorsAllowed(msg.sender) || _register.isBnD(msg.sender),
            "Sender must be a valid investor"
        );

        require(_register.investorsAllowed(_buyer), "Buyer must be a valid investor");

        register = _register;
        sellerAccount = msg.sender;
        details.buyer = _buyer;
        actaChainRegistry = _actaChainRegistry;
        envelopeId = _envelopeId;
        status = Status.Draft;
        emit NotifyTrade(msg.sender, _buyer, status, 0);
    }

    /**
     * @dev gets the buyer address
     */
    function buyerAccount() public view returns (address) {
        return details.buyer;
    }

    /**
     * @dev produces a unique payiment identifier
     */
    function paymentID() public view returns (bytes8) {
        uint64 low = uint64(uint160(address(this)));
        return bytes8(low);
    }

    /**
     * @dev enables the sellerAccount address to update the bilateral trade detail
     * can be called only if status of current contract is Draft
     can be called only if buyer updated is whitelisted
    */
    function setDetails(TradeDetail memory _details) public {
        require(msg.sender == sellerAccount, "Only the seller can update this trade");
        require(status == Status.Draft, "Cannot change the trade details unless in draft status");
        require(register.investorsAllowed(_details.buyer), "Buyer must be a valid investor even on changing details");
        details = _details;
        // an event needs to be generated to enable the back end to know that the trade has been changed
        emit NotifyTrade(sellerAccount, _details.buyer, status, _details.quantity);
    }

    /**
     * @dev gets the bilateral trade details
     */
    function getDetails() public view returns (TradeDetail memory) {
        return details;
    }
 

    function executeTransfer() public nonReentrant returns (bool) {
        require(msg.sender == actaChainRegistry, "Only the ActaChainRegistry can confirm the agreement on this trade");

        require(status == Status.Accepted, "The trade must be accepted by the buyer before");

        status = Status.Executed;
        // Actually make the transfer now
        bool success = register.transferFrom(sellerAccount, details.buyer, details.quantity);
        require(success, "the transfer has failed");
        emit NotifyTrade(sellerAccount, details.buyer, status, details.quantity);
        return true;
    }
}
