// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.28;

import "./ITrade.sol";

interface IBilateralTrade is ITrade {
    function buyerAccount() external view returns (address);

    function paymentID() external view returns (bytes8);

    function setDetails(TradeDetail memory _details) external;

    function getDetails() external view returns (TradeDetail memory);

    function executeTransfer() external returns (bool);
}
