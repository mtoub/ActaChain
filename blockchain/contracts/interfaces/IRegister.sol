// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

interface IRegister is IERC20Metadata {

    enum Status {
        Draft,
        Ready,
        Issued,
        Repaid,
        Frozen
    }

    enum LockStatus {
        Unlocked,
        Locked,
        Released,
        Forced,
        Cancelled
    }


    struct BondData {
        string name;
        string isin;
        uint256 expectedSupply;
        bytes32 currency;
        uint256 unitValue;
        uint256 couponRate;
        uint256 creationDate;
        uint256 issuanceDate;
        uint256 maturityDate;
        uint256[] couponDates;
        uint256 cutOffTime;
    }

    struct Party {
        string name;
        string identifier; // LEI
        string[] ratings; // e.g., ["AAA", "A+"]
    }

    struct Issuance {
        string issuanceType;
        string specifiedCurrency;
        uint256 issuePrice;
        uint256 redemptionAmount;
        string governingLaw;
    }

    struct Product {
        string isin;
        uint256 nominalAmount;
        uint256 maturityDate;
        string formOfNote; // "BEARER", "REGISTERED"
        string interestType; // "FIXED", "FLOATING"
    }

    struct DLTPlatform {
        string platformType;
        string accessibility;
        string role;
        address smartContractAddress;
    }

    struct Lock {
        address from;
        address to;
        uint256 amount;
        bytes32 transactionId;
        bytes32 hashLock;
        bytes32 hashRelease;
        bytes32 hashCancel;
        uint256 paymentDate;
        uint256 deliveryDate;
        bytes32 proof;
        LockStatus status;
    }

    struct InvestorInfo {
        uint256 index; // zero-based index on investor list
        address custodian;
        address investor;
        bool allowed; // true if investor whitelisted for transfer
    }

    // Events
    event NewBondDrafted(address indexed creator, string name, string isin);
    event RegisterStatusChanged(
        address indexed emiter,
        string name,
        string isin,
        Status status
    );
    event PublicMessage(
        address indexed sender,
        address indexed target,
        string message
    );
    event SnapshotTimestampChange(
        uint256 indexed couponDate,
        uint256 indexed currentTimestamp,
        uint256 indexed nextTimestamp
    );
    event AssetHTLC(
        bytes32 indexed transactionId,
        address indexed from,
        address indexed to,
        bytes32 hashLock,
        LockStatus status
    );
    event RoleAdminChanged(
        bytes32 indexed role,
        bytes32 indexed previousAdminRole,
        bytes32 indexed newAdminRole
    );
    event RoleGranted(
        bytes32 indexed role,
        address indexed account,
        address indexed sender
    );
    event RoleRevoked(
        bytes32 indexed role,
        address indexed account,
        address indexed sender
    );
    event EnableContract(bytes32 contractHash);
    event DisableContract(bytes32 contractHash);
    event WalletAddedToWhitelist(address indexed toBeAdded);
    event WalletDeletedFromWhitelist(address indexed toBeDeleted);
    event EnableInvestor(address investor);
    event DisableInvestor(address investor);

    // Functions
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);

    function setName(string memory name_) external;
    function setIsinSymbol(string memory isinSymbol) external;
    function setCurrency(bytes32 currency) external;
    function getCreationDate() external view returns (uint256);
    function getIssuanceDate() external view returns (uint256);
    function setCreationDate(uint256 creationDate) external;
    function setIssuanceDate(uint256 issuanceDate) external;

    function setBondData(
        string memory name_,
        uint256 expectedSupply_,
        bytes32 currency_,
        uint256 unitVal_,
        uint256 couponRate_,
        uint256 issuanceDate_,
        uint256 maturityDate_,
        uint256 cutOffTime_
    ) external;

    function addCouponDate(uint256 date) external;
    function delCouponDate(uint256 date) external;
    function setExpectedSupply(uint256 expectedSupply) external;
    function getBondData() external view returns (BondData memory);
    function getBondCouponRate() external view returns (uint256);
    function getBondUnitValue() external view returns (uint256);
    function primaryIssuanceAccount() external view returns (address);
    function checkIfCouponDateExists(uint256 _couponDate) external returns (bool);
    function checkIfMaturityDateExists(uint256 _maturityDate) external returns (bool);
    function makeReady() external;
    function revertReady() external;
    function publicMessage(address to, string memory message) external;
    function setCurrentCouponDate(uint256 couponDate_, uint256 recordDatetime_) external;
    function toggleFrozen() external;
    function status() external view returns (Status);
    function setIssuanceBDT(
        string memory _issuanceType,
        string memory _specifiedCurrency,
        uint256 _issuePrice,
        uint256 _redemptionAmount,
        string memory _governingLaw
    ) external;
    function getIssuanceBDT() external view returns (Issuance memory);
    function setProductBDT(
        string memory _productISIN,
        uint256 _nominalAmount,
        uint256 _maturityDate,
        string memory _formOfNote,
        string memory _interestType
    ) external;
    function getProductBDT() external view returns (Product memory);
    function addPartyBDT(
        string memory _name,
        string memory _identifier,
        string[] memory _ratings
    ) external;
    function getPartiesBDT() external view returns (Party[] memory);
    function setDLTPlatformBDT(
        string memory _platformType,
        string memory _accessibility,
        string memory _role,
        address _smartContractAddress
    ) external;
    function getDLTPlatformBDT() external view returns (DLTPlatform memory);

    function balanceOf(address account, uint256 _couponDate) external view returns (uint256);
    function totalSupplyAtCoupon(uint256 _couponDate) external view returns (uint256);
    function currentCouponDate() external view returns (uint256);
    function currentSnapshotDatetime() external view returns (uint256);
    function nextSnapshotDatetime() external view returns (uint256);
    function getInvestorListAtCoupon(uint256 CouponDate) external returns (address[] memory);
    function returnBalanceToPrimaryIssuanceAccount(address investor) external returns (bool);
    function mint(uint256 amount_) external;
    function burn(uint256 amount_) external;
    function lock(
        address from,
        address to,
        uint256 amount,
        bytes32 transactionId,
        bytes32 hashLock,
        bytes32 hashRelease,
        bytes32 hashCancel,
        uint256 paymentDate,
        uint256 deliveryDate,
        bytes32 proof
    ) external;
    function release(
        bytes32 transactionId,
        bytes32 secret,
        bytes32 proof,
        LockStatus status_
    ) external;
    function getLock(bytes32 transactionId) external view returns (Lock memory);

    function CAK_ROLE() external pure returns (bytes32);
    function BND_ROLE() external pure returns (bytes32);
    function CST_ROLE() external pure returns (bytes32);
    function PAY_ROLE() external pure returns (bytes32);
    function registerAdmin() external view returns (address);
    function addressForNewAdmin() external view returns (address);
    function firstVoterForNewAdmin() external view returns (address);
    function votesForNewAdmin() external view returns (uint8);
    function isBnD(address account) external view returns (bool);
    function isPay(address account) external view returns (bool);
    function isCustodian(address account) external view returns (bool);
    function isCAK(address account) external view returns (bool);
    function changeAdminRole(address account) external;
    function grantCakRole(address cakAddress) external;
    function revokeCakRole(address cakAddress) external;
    function grantBndRole(address bndAddress) external;
    function revokeBndRole(address bndAddress) external;
    function grantCstRole(address cstAddress) external;
    function revokeCstRole(address cstAddress) external;
    function grantPayRole(address cstAddress) external;
    function revokePayRole(address cstAddress) external;

    function getAllInvestors() external view returns (address[] memory);
    function disableInvestorFromWhitelist(address investor) external;
    function enableInvestorToWhitelist(address investor) external;
    function investorsAllowed(address investor) external view returns (bool);
    function investorCustodian(address investor) external view returns (address);

    function isCallerApprovedSmartContract() external view returns (bool);
    function isContractAllowed(address contractAddress) external view returns (bool);
    function enableContractToWhitelist(bytes32 contractHash) external;
    function disableContractFromWhitelist(bytes32 contractHash) external;
    function atReturningHash(address addr) external view returns (bytes32);
}
