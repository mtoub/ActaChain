// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.28;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";

import {IBilateralTrade} from "./interfaces/IBilateralTrade.sol";

contract ActaChainRegistry is FunctionsClient, ConfirmedOwner {
  using FunctionsRequest for FunctionsRequest.Request;

  bytes32 public donId; // DON ID for the Functions DON to which the requests are sent

  bytes32 public s_lastRequestId;
  bytes public s_lastResponse;
  bytes public s_lastError;

  struct ActaChainContract {
    string envelopeId;
    address requester;
  }

  mapping(bytes32 => ActaChainContract) public requestIdToActaChainContract;

  // add a mapping for whitelisted requesters
  mapping(address => bool) public whitelistedRequesters;

  constructor(address router, bytes32 _donId, address owner) FunctionsClient(router) ConfirmedOwner(owner) {
    donId = _donId;
  }

    /**
     * @notice Add a requester to the whitelist
     * @param requester The address of the requester to add
     */
    function addWhitelistedRequester(address requester) external onlyOwner {
        whitelistedRequesters[requester] = true;
    }

    /**
   * @notice Triggers an on-demand Functions request using remote encrypted secrets
   * @param source JavaScript source code
   * @param secretsLocation Location of secrets (only Location.Remote & Location.DONHosted are supported)
   * @param encryptedSecretsReference Reference pointing to encrypted secrets
   * @param args String arguments passed into the source code and accessible via the global variable `args`
   * @param bytesArgs Bytes arguments passed into the source code and accessible via the global variable `bytesArgs` as hex strings
   * @param subscriptionId Subscription ID used to pay for request (FunctionsConsumer contract address must first be added to the subscription)
   * @param callbackGasLimit Maximum amount of gas used to call the inherited `handleOracleFulfillment` method
   */
  function sendRequest(
    string calldata source,
    FunctionsRequest.Location secretsLocation,
    bytes calldata encryptedSecretsReference,
    string[] calldata args,
    bytes[] calldata bytesArgs,
    uint64 subscriptionId,
    uint32 callbackGasLimit
  ) external {

    require(whitelistedRequesters[msg.sender], "Requester not whitelisted");

    FunctionsRequest.Request memory req;
    req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, source);
    req.secretsLocation = secretsLocation;
    req.encryptedSecretsReference = encryptedSecretsReference;
    if (args.length > 0) {
      req.setArgs(args);
    }
    if (bytesArgs.length > 0) {
      req.setBytesArgs(bytesArgs);
    }
    s_lastRequestId = _sendRequest(req.encodeCBOR(), subscriptionId, callbackGasLimit, donId);

    requestIdToActaChainContract[s_lastRequestId] = ActaChainContract({
      envelopeId: args[0],
      requester: msg.sender
    });
  }

    /**
   * @notice Store latest result/error
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */
  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    s_lastResponse = response;
    s_lastError = err;

    // check if response is successful get the envelopeId and send it to the register
    if (response.length > 0) {
      ActaChainContract memory actaChainContractRequester = requestIdToActaChainContract[requestId];
      uint256 envelopeStatus = abi.decode(response, (uint256));
      if (envelopeStatus == 1) {
        IBilateralTrade(actaChainContractRequester.requester).executeTransfer();
      }
    }
  }
}