export const ContractActaChainRegistry = {
  _format: "hh-sol-artifact-1",
  contractName: "ActaChainRegistry",
  sourceName: "contracts/ActaChainRegistry.sol",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "router",
          type: "address",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "EmptyArgs",
      type: "error",
    },
    {
      inputs: [],
      name: "EmptySource",
      type: "error",
    },
    {
      inputs: [],
      name: "NoInlineSecrets",
      type: "error",
    },
    {
      inputs: [],
      name: "OnlyRouterCanFulfill",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "OwnershipTransferRequested",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "id",
          type: "bytes32",
        },
      ],
      name: "RequestFulfilled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "id",
          type: "bytes32",
        },
      ],
      name: "RequestSent",
      type: "event",
    },
    {
      inputs: [],
      name: "CALLBACK_GAS_LIMIT",
      outputs: [
        {
          internalType: "uint32",
          name: "",
          type: "uint32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "DON_ID",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "SOURCE",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "SUBSCRIPTION_ID",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
        {
          internalType: "bytes",
          name: "response",
          type: "bytes",
        },
        {
          internalType: "bytes",
          name: "err",
          type: "bytes",
        },
      ],
      name: "handleOracleFulfillment",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "isRequesterWhitelisted",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      name: "requestIdToActaChainContract",
      outputs: [
        {
          internalType: "string",
          name: "envelopeId",
          type: "string",
        },
        {
          internalType: "address",
          name: "requester",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "s_lastError",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "s_lastRequestId",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "s_lastResponse",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "envelopeId",
          type: "string",
        },
      ],
      name: "verifyDocusignEnvelope",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "requester",
          type: "address",
        },
      ],
      name: "whitelistRequester",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  bytecode:
    "0x60a060405234801561001057600080fd5b50604051611e6e380380611e6e83398101604081905261002f91610196565b6001600160a01b038083166080528190819060009082166100975760405162461bcd60e51b815260206004820152601860248201527f43616e6e6f7420736574206f776e657220746f207a65726f000000000000000060448201526064015b60405180910390fd5b600080546001600160a01b0319166001600160a01b03848116919091179091558116156100c7576100c7816100d1565b50505050506101c9565b336001600160a01b038216036101295760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000604482015260640161008e565b600180546001600160a01b0319166001600160a01b0383811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b80516001600160a01b038116811461019157600080fd5b919050565b600080604083850312156101a957600080fd5b6101b28361017a565b91506101c06020840161017a565b90509250929050565b608051611c836101eb6000396000818161026b0152610c490152611c836000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80638180e8a811610097578063b1e2174911610066578063b1e2174914610229578063cb94802614610232578063f230b4c214610245578063f2fde38b1461024d57600080fd5b80638180e8a8146101a757806388117a7f146101ba5780638da5cb5b146101ed57806395cafdfa1461020857600080fd5b806333d608f1116100d357806333d608f1146101635780633944ea3a146101825780634b0795a81461019757806379ba50971461019f57600080fd5b8063030932bb146100fa5780630ca76175146101205780630cde9f3c14610135575b600080fd5b61010361109581565b6040516001600160401b0390911681526020015b60405180910390f35b61013361012e366004611360565b610260565b005b6101557566756e2d657468657265756d2d7365706f6c69612d3160501b81565b604051908152602001610117565b61016d620493e081565b60405163ffffffff9091168152602001610117565b61018a6102e4565b6040516101179190611416565b61018a610372565b61013361037f565b6101336101b5366004611429565b61042e565b6101dd6101c836600461149b565b60066020526000908152604090205460ff1681565b6040519015158152602001610117565b6000546040516001600160a01b039091168152602001610117565b61021b6102163660046114c4565b610655565b6040516101179291906114dd565b61015560025481565b61013361024036600461149b565b610702565b61018a61072e565b61013361025b36600461149b565b61074d565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146102a95760405163c6829f8360e01b815260040160405180910390fd5b6102b4838383610761565b60405183907f85e1543bf2f84fe80c6badbce3648c8539ad1df4d2b3d822938ca0538be727e690600090a2505050565b600380546102f190611507565b80601f016020809104026020016040519081016040528092919081815260200182805461031d90611507565b801561036a5780601f1061033f5761010080835404028352916020019161036a565b820191906000526020600020905b81548152906001019060200180831161034d57829003601f168201915b505050505081565b600480546102f190611507565b6001546001600160a01b031633146103d75760405162461bcd60e51b815260206004820152601660248201527526bab9ba10313290383937b837b9b2b21037bbb732b960511b60448201526064015b60405180910390fd5b60008054336001600160a01b0319808316821784556001805490911690556040516001600160a01b0390921692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a350565b3360009081526006602052604090205460ff1661048d5760405162461bcd60e51b815260206004820152601960248201527f526571756573746572206e6f742077686974656c69737465640000000000000060448201526064016103ce565b6104ce6040805160e0810190915280600081526020016000815260200160008152602001606081526020016060815260200160608152602001606081525090565b6104f96000806040518061042001604052806103ef815260200161185f6103ef9139849291906108d4565b60016020820181905250604080516001808252818301909252600091816020015b606081526020019060019003908161051a57905050905083838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525085518694509092501515905061057b5761057b611557565b60209081029190910101526105908282610952565b6105c261059c8361097c565b611095620493e07566756e2d657468657265756d2d7365706f6c69612d3160501b610c44565b6002556040805160606020601f8701819004028201810183529181018581529091829190879087908190850183828082843760009201829052509385525050336020938401525060025481526005909152604090208151819061062590826115b4565b5060209190910151600190910180546001600160a01b0319166001600160a01b0390921691909117905550505050565b60056020526000908152604090208054819061067090611507565b80601f016020809104026020016040519081016040528092919081815260200182805461069c90611507565b80156106e95780601f106106be576101008083540402835291602001916106e9565b820191906000526020600020905b8154815290600101906020018083116106cc57829003601f168201915b505050600190930154919250506001600160a01b031682565b61070a610d16565b6001600160a01b03166000908152600660205260409020805460ff19166001179055565b6040518061042001604052806103ef815260200161185f6103ef913981565b610755610d16565b61075e81610d6b565b50565b600361076d83826115b4565b50600461077a82826115b4565b508151156108cf5760008381526005602052604080822081518083019092528054829082906107a890611507565b80601f01602080910402602001604051908101604052809291908181526020018280546107d490611507565b80156108215780601f106107f657610100808354040283529160200191610821565b820191906000526020600020905b81548152906001019060200180831161080457829003601f168201915b5050509183525050600191909101546001600160a01b03166020918201528451919250600091610858919086018101908601611672565b9050806001036108cc5781602001516001600160a01b031663835d2d2e6040518163ffffffff1660e01b81526004016020604051808303816000875af11580156108a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ca919061168b565b505b50505b505050565b80516000036108f6576040516322ce3edd60e01b815260040160405180910390fd5b8383600281111561090957610909611541565b9081600281111561091c5761091c611541565b9052506040840182801561093257610932611541565b9081801561094257610942611541565b9052506060909301929092525050565b80516000036109745760405163fe936cb760e01b815260040160405180910390fd5b60a090910152565b6060600061098b610100610e14565b90506109c46040518060400160405280600c81526020016b31b7b232a637b1b0ba34b7b760a11b81525082610e3590919063ffffffff16565b82516109e29060028111156109db576109db611541565b8290610e4e565b6040805180820190915260088152676c616e677561676560c01b6020820152610a0c908290610e35565b6040830151610a239080156109db576109db611541565b604080518082019091526006815265736f7572636560d01b6020820152610a4b908290610e35565b6060830151610a5b908290610e35565b60a08301515115610ae7576040805180820190915260048152636172677360e01b6020820152610a8c908290610e35565b610a9581610e8b565b60005b8360a0015151811015610add57610ad58460a001518281518110610abe57610abe611557565b602002602001015183610e3590919063ffffffff16565b600101610a98565b50610ae781610eaf565b60808301515115610bab57600083602001516002811115610b0a57610b0a611541565b03610b285760405163a80d31f760e01b815260040160405180910390fd5b60408051808201909152600f81526e39b2b1b932ba39a637b1b0ba34b7b760891b6020820152610b59908290610e35565b610b72836020015160028111156109db576109db611541565b6040805180820190915260078152667365637265747360c81b6020820152610b9b908290610e35565b6080830151610bab908290610ecd565b60c08301515115610c3c5760408051808201909152600981526862797465734172677360b81b6020820152610be1908290610e35565b610bea81610e8b565b60005b8360c0015151811015610c3257610c2a8460c001518281518110610c1357610c13611557565b602002602001015183610ecd90919063ffffffff16565b600101610bed565b50610c3c81610eaf565b515192915050565b6000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663461d27628688600188886040518663ffffffff1660e01b8152600401610c9c9594939291906116ad565b6020604051808303816000875af1158015610cbb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cdf9190611672565b60405190915081907f1131472297a800fee664d1d89cfa8f7676ff07189ecc53f80bbb5f4969099db890600090a295945050505050565b6000546001600160a01b03163314610d695760405162461bcd60e51b815260206004820152601660248201527527b7363c9031b0b63630b1363290313c9037bbb732b960511b60448201526064016103ce565b565b336001600160a01b03821603610dc35760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c6600000000000000000060448201526064016103ce565b600180546001600160a01b0319166001600160a01b0383811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b610e1c611288565b8051610e289083610eda565b5060006020820152919050565b610e428260038351610f54565b81516108cf9082611073565b8151610e5b9060c261109b565b50610e878282604051602001610e7391815260200190565b604051602081830303815290604052610ecd565b5050565b610e96816004611104565b600181602001818151610ea9919061170c565b90525050565b610eba816007611104565b600181602001818151610ea9919061171f565b610e428260028351610f54565b604080518082019091526060815260006020820152610efa602083611732565b15610f2257610f0a602083611732565b610f1590602061171f565b610f1f908361170c565b91505b602080840183905260405180855260008152908184010181811015610f4657600080fd5b604052508290505b92915050565b6017816001600160401b031611610f80578251610f7a9060e0600585901b16831761109b565b50505050565b60ff816001600160401b031611610fc0578251610fa8906018611fe0600586901b161761109b565b508251610f7a906001600160401b038316600161111b565b61ffff816001600160401b031611611001578251610fe9906019611fe0600586901b161761109b565b508251610f7a906001600160401b038316600261111b565b63ffffffff816001600160401b03161161104457825161102c90601a611fe0600586901b161761109b565b508251610f7a906001600160401b038316600461111b565b825161105b90601b611fe0600586901b161761109b565b508251610f7a906001600160401b038316600861111b565b604080518082019091526060815260006020820152611094838384516111a0565b9392505050565b60408051808201909152606081526000602082015282515160006110c082600161170c565b9050846020015182106110e1576110e1856110dc836002611754565b611271565b84516020838201018581535080518211156110fa578181525b5093949350505050565b81516108cf90601f611fe0600585901b161761109b565b604080518082019091526060815260006020820152835151600061113f828561170c565b9050856020015181111561115c5761115c866110dc836002611754565b6000600161116c86610100611852565b611176919061171f565b90508651828101878319825116178152508051831115611194578281525b50959695505050505050565b60408051808201909152606081526000602082015282518211156111c357600080fd5b83515160006111d2848361170c565b905085602001518111156111ef576111ef866110dc836002611754565b855180518382016020019160009180851115611209578482525b505050602086015b60208610611249578051825261122860208361170c565b915061123560208261170c565b905061124260208761171f565b9550611211565b51815160001960208890036101000a0190811690199190911617905250849150509392505050565b815161127d8383610eda565b50610f7a8382611073565b60405180604001604052806112b0604051806040016040528060608152602001600081525090565b8152602001600081525090565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126112e457600080fd5b81356001600160401b038111156112fd576112fd6112bd565b604051601f8201601f19908116603f011681016001600160401b038111828210171561132b5761132b6112bd565b60405281815283820160200185101561134357600080fd5b816020850160208301376000918101602001919091529392505050565b60008060006060848603121561137557600080fd5b8335925060208401356001600160401b0381111561139257600080fd5b61139e868287016112d3565b92505060408401356001600160401b038111156113ba57600080fd5b6113c6868287016112d3565b9150509250925092565b6000815180845260005b818110156113f6576020818501810151868301820152016113da565b506000602082860101526020601f19601f83011685010191505092915050565b60208152600061109460208301846113d0565b6000806020838503121561143c57600080fd5b82356001600160401b0381111561145257600080fd5b8301601f8101851361146357600080fd5b80356001600160401b0381111561147957600080fd5b85602082840101111561148b57600080fd5b6020919091019590945092505050565b6000602082840312156114ad57600080fd5b81356001600160a01b038116811461109457600080fd5b6000602082840312156114d657600080fd5b5035919050565b6040815260006114f060408301856113d0565b905060018060a01b03831660208301529392505050565b600181811c9082168061151b57607f821691505b60208210810361153b57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b601f8211156108cf57806000526020600020601f840160051c810160208510156115945750805b601f840160051c820191505b818110156108cc57600081556001016115a0565b81516001600160401b038111156115cd576115cd6112bd565b6115e1816115db8454611507565b8461156d565b6020601f82116001811461161557600083156115fd5750848201515b600019600385901b1c1916600184901b1784556108cc565b600084815260208120601f198516915b828110156116455787850151825560209485019460019092019101611625565b50848210156116635786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b60006020828403121561168457600080fd5b5051919050565b60006020828403121561169d57600080fd5b8151801515811461109457600080fd5b6001600160401b038616815260a0602082015260006116cf60a08301876113d0565b61ffff9590951660408301525063ffffffff92909216606083015260809091015292915050565b634e487b7160e01b600052601160045260246000fd5b80820180821115610f4e57610f4e6116f6565b81810381811115610f4e57610f4e6116f6565b60008261174f57634e487b7160e01b600052601260045260246000fd5b500690565b8082028115828204841417610f4e57610f4e6116f6565b6001815b60018411156117a65780850481111561178a5761178a6116f6565b600184161561179857908102905b60019390931c92800261176f565b935093915050565b6000826117bd57506001610f4e565b816117ca57506000610f4e565b81600181146117e057600281146117ea57611806565b6001915050610f4e565b60ff8411156117fb576117fb6116f6565b50506001821b610f4e565b5060208310610133831016604e8410600b8410161715611829575081810a610f4e565b611836600019848461176b565b806000190482111561184a5761184a6116f6565b029392505050565b600061109483836117ae56fe636f6e737420656e76656c6f70654964203d20617267735b305d3b0a6966202821656e76656c6f7065496429207b72657475726e2046756e6374696f6e732e656e636f646555696e743235362830293b7d0a636f6e737420746f6b656e526573706f6e7365203d2061776169742046756e6374696f6e732e6d616b654874747052657175657374287b2075726c3a202268747470733a2f2f61637461636861696e2e76657263656c2e6170702f6170692f75736572732f3230323530313237222c206d6574686f643a2022474554222c20686561646572733a207b22782d6170692d6b6579223a20224345524b324f553151446d747a4a697079536c41713252346c674d2f726a2b316c54573552714b7475546f3d227d7d293b0a69662028746f6b656e526573706f6e73652e6572726f7229207b72657475726e2046756e6374696f6e732e656e636f646555696e743235362830293b7d0a636f6e737420746f6b656e44617461203d20746f6b656e526573706f6e73652e646174613b0a6966202821746f6b656e44617461207c7c2021746f6b656e446174612e616363657373546f6b656e29207b7468726f77204572726f722822546f6b656e206e6f7420666f756e6420696e2074686520726573706f6e73652066726f6d207468652041504922293b7d0a636f6e737420746f6b656e203d20746f6b656e446174612e616363657373546f6b656e3b0a636f6e737420617069526573706f6e7365203d2061776169742046756e6374696f6e732e6d616b654874747052657175657374287b0a202075726c3a206068747470733a2f2f64656d6f2e646f63757369676e2e6e65742f726573746170692f76322e312f6163636f756e74732f65623637643032312d303562612d346534332d393665642d3533303961326338656262352f656e76656c6f7065732f247b656e76656c6f706549647d2f602c0a20206d6574686f643a2022474554222c0a2020686561646572733a207b20417574686f72697a6174696f6e3a206042656172657220247b746f6b656e7d607d0a7d293b0a69662028617069526573706f6e73652e6572726f7229207b2072657475726e2046756e6374696f6e732e656e636f646555696e743235362830293b207d0a636f6e7374207b2064617461207d203d20617069526573706f6e73653b0a696620282164617461207c7c2021646174612e73746174757329207b2072657475726e2046756e6374696f6e732e656e636f646555696e743235362830293b207d0a72657475726e2046756e6374696f6e732e656e636f646555696e7432353628646174612e7374617475732e746f4c6f776572436173652829203d3d3d2022636f6d706c6574656422203f2031203a2030293ba2646970667358221220ea8313b313cd95c8a53d660d09aebf7c858fb94d7e59a61cde1efa078766782764736f6c634300081c0033",
  deployedBytecode:
    "0x608060405234801561001057600080fd5b50600436106100f55760003560e01c80638180e8a811610097578063b1e2174911610066578063b1e2174914610229578063cb94802614610232578063f230b4c214610245578063f2fde38b1461024d57600080fd5b80638180e8a8146101a757806388117a7f146101ba5780638da5cb5b146101ed57806395cafdfa1461020857600080fd5b806333d608f1116100d357806333d608f1146101635780633944ea3a146101825780634b0795a81461019757806379ba50971461019f57600080fd5b8063030932bb146100fa5780630ca76175146101205780630cde9f3c14610135575b600080fd5b61010361109581565b6040516001600160401b0390911681526020015b60405180910390f35b61013361012e366004611360565b610260565b005b6101557566756e2d657468657265756d2d7365706f6c69612d3160501b81565b604051908152602001610117565b61016d620493e081565b60405163ffffffff9091168152602001610117565b61018a6102e4565b6040516101179190611416565b61018a610372565b61013361037f565b6101336101b5366004611429565b61042e565b6101dd6101c836600461149b565b60066020526000908152604090205460ff1681565b6040519015158152602001610117565b6000546040516001600160a01b039091168152602001610117565b61021b6102163660046114c4565b610655565b6040516101179291906114dd565b61015560025481565b61013361024036600461149b565b610702565b61018a61072e565b61013361025b36600461149b565b61074d565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146102a95760405163c6829f8360e01b815260040160405180910390fd5b6102b4838383610761565b60405183907f85e1543bf2f84fe80c6badbce3648c8539ad1df4d2b3d822938ca0538be727e690600090a2505050565b600380546102f190611507565b80601f016020809104026020016040519081016040528092919081815260200182805461031d90611507565b801561036a5780601f1061033f5761010080835404028352916020019161036a565b820191906000526020600020905b81548152906001019060200180831161034d57829003601f168201915b505050505081565b600480546102f190611507565b6001546001600160a01b031633146103d75760405162461bcd60e51b815260206004820152601660248201527526bab9ba10313290383937b837b9b2b21037bbb732b960511b60448201526064015b60405180910390fd5b60008054336001600160a01b0319808316821784556001805490911690556040516001600160a01b0390921692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a350565b3360009081526006602052604090205460ff1661048d5760405162461bcd60e51b815260206004820152601960248201527f526571756573746572206e6f742077686974656c69737465640000000000000060448201526064016103ce565b6104ce6040805160e0810190915280600081526020016000815260200160008152602001606081526020016060815260200160608152602001606081525090565b6104f96000806040518061042001604052806103ef815260200161185f6103ef9139849291906108d4565b60016020820181905250604080516001808252818301909252600091816020015b606081526020019060019003908161051a57905050905083838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525085518694509092501515905061057b5761057b611557565b60209081029190910101526105908282610952565b6105c261059c8361097c565b611095620493e07566756e2d657468657265756d2d7365706f6c69612d3160501b610c44565b6002556040805160606020601f8701819004028201810183529181018581529091829190879087908190850183828082843760009201829052509385525050336020938401525060025481526005909152604090208151819061062590826115b4565b5060209190910151600190910180546001600160a01b0319166001600160a01b0390921691909117905550505050565b60056020526000908152604090208054819061067090611507565b80601f016020809104026020016040519081016040528092919081815260200182805461069c90611507565b80156106e95780601f106106be576101008083540402835291602001916106e9565b820191906000526020600020905b8154815290600101906020018083116106cc57829003601f168201915b505050600190930154919250506001600160a01b031682565b61070a610d16565b6001600160a01b03166000908152600660205260409020805460ff19166001179055565b6040518061042001604052806103ef815260200161185f6103ef913981565b610755610d16565b61075e81610d6b565b50565b600361076d83826115b4565b50600461077a82826115b4565b508151156108cf5760008381526005602052604080822081518083019092528054829082906107a890611507565b80601f01602080910402602001604051908101604052809291908181526020018280546107d490611507565b80156108215780601f106107f657610100808354040283529160200191610821565b820191906000526020600020905b81548152906001019060200180831161080457829003601f168201915b5050509183525050600191909101546001600160a01b03166020918201528451919250600091610858919086018101908601611672565b9050806001036108cc5781602001516001600160a01b031663835d2d2e6040518163ffffffff1660e01b81526004016020604051808303816000875af11580156108a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ca919061168b565b505b50505b505050565b80516000036108f6576040516322ce3edd60e01b815260040160405180910390fd5b8383600281111561090957610909611541565b9081600281111561091c5761091c611541565b9052506040840182801561093257610932611541565b9081801561094257610942611541565b9052506060909301929092525050565b80516000036109745760405163fe936cb760e01b815260040160405180910390fd5b60a090910152565b6060600061098b610100610e14565b90506109c46040518060400160405280600c81526020016b31b7b232a637b1b0ba34b7b760a11b81525082610e3590919063ffffffff16565b82516109e29060028111156109db576109db611541565b8290610e4e565b6040805180820190915260088152676c616e677561676560c01b6020820152610a0c908290610e35565b6040830151610a239080156109db576109db611541565b604080518082019091526006815265736f7572636560d01b6020820152610a4b908290610e35565b6060830151610a5b908290610e35565b60a08301515115610ae7576040805180820190915260048152636172677360e01b6020820152610a8c908290610e35565b610a9581610e8b565b60005b8360a0015151811015610add57610ad58460a001518281518110610abe57610abe611557565b602002602001015183610e3590919063ffffffff16565b600101610a98565b50610ae781610eaf565b60808301515115610bab57600083602001516002811115610b0a57610b0a611541565b03610b285760405163a80d31f760e01b815260040160405180910390fd5b60408051808201909152600f81526e39b2b1b932ba39a637b1b0ba34b7b760891b6020820152610b59908290610e35565b610b72836020015160028111156109db576109db611541565b6040805180820190915260078152667365637265747360c81b6020820152610b9b908290610e35565b6080830151610bab908290610ecd565b60c08301515115610c3c5760408051808201909152600981526862797465734172677360b81b6020820152610be1908290610e35565b610bea81610e8b565b60005b8360c0015151811015610c3257610c2a8460c001518281518110610c1357610c13611557565b602002602001015183610ecd90919063ffffffff16565b600101610bed565b50610c3c81610eaf565b515192915050565b6000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663461d27628688600188886040518663ffffffff1660e01b8152600401610c9c9594939291906116ad565b6020604051808303816000875af1158015610cbb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cdf9190611672565b60405190915081907f1131472297a800fee664d1d89cfa8f7676ff07189ecc53f80bbb5f4969099db890600090a295945050505050565b6000546001600160a01b03163314610d695760405162461bcd60e51b815260206004820152601660248201527527b7363c9031b0b63630b1363290313c9037bbb732b960511b60448201526064016103ce565b565b336001600160a01b03821603610dc35760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c6600000000000000000060448201526064016103ce565b600180546001600160a01b0319166001600160a01b0383811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b610e1c611288565b8051610e289083610eda565b5060006020820152919050565b610e428260038351610f54565b81516108cf9082611073565b8151610e5b9060c261109b565b50610e878282604051602001610e7391815260200190565b604051602081830303815290604052610ecd565b5050565b610e96816004611104565b600181602001818151610ea9919061170c565b90525050565b610eba816007611104565b600181602001818151610ea9919061171f565b610e428260028351610f54565b604080518082019091526060815260006020820152610efa602083611732565b15610f2257610f0a602083611732565b610f1590602061171f565b610f1f908361170c565b91505b602080840183905260405180855260008152908184010181811015610f4657600080fd5b604052508290505b92915050565b6017816001600160401b031611610f80578251610f7a9060e0600585901b16831761109b565b50505050565b60ff816001600160401b031611610fc0578251610fa8906018611fe0600586901b161761109b565b508251610f7a906001600160401b038316600161111b565b61ffff816001600160401b031611611001578251610fe9906019611fe0600586901b161761109b565b508251610f7a906001600160401b038316600261111b565b63ffffffff816001600160401b03161161104457825161102c90601a611fe0600586901b161761109b565b508251610f7a906001600160401b038316600461111b565b825161105b90601b611fe0600586901b161761109b565b508251610f7a906001600160401b038316600861111b565b604080518082019091526060815260006020820152611094838384516111a0565b9392505050565b60408051808201909152606081526000602082015282515160006110c082600161170c565b9050846020015182106110e1576110e1856110dc836002611754565b611271565b84516020838201018581535080518211156110fa578181525b5093949350505050565b81516108cf90601f611fe0600585901b161761109b565b604080518082019091526060815260006020820152835151600061113f828561170c565b9050856020015181111561115c5761115c866110dc836002611754565b6000600161116c86610100611852565b611176919061171f565b90508651828101878319825116178152508051831115611194578281525b50959695505050505050565b60408051808201909152606081526000602082015282518211156111c357600080fd5b83515160006111d2848361170c565b905085602001518111156111ef576111ef866110dc836002611754565b855180518382016020019160009180851115611209578482525b505050602086015b60208610611249578051825261122860208361170c565b915061123560208261170c565b905061124260208761171f565b9550611211565b51815160001960208890036101000a0190811690199190911617905250849150509392505050565b815161127d8383610eda565b50610f7a8382611073565b60405180604001604052806112b0604051806040016040528060608152602001600081525090565b8152602001600081525090565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126112e457600080fd5b81356001600160401b038111156112fd576112fd6112bd565b604051601f8201601f19908116603f011681016001600160401b038111828210171561132b5761132b6112bd565b60405281815283820160200185101561134357600080fd5b816020850160208301376000918101602001919091529392505050565b60008060006060848603121561137557600080fd5b8335925060208401356001600160401b0381111561139257600080fd5b61139e868287016112d3565b92505060408401356001600160401b038111156113ba57600080fd5b6113c6868287016112d3565b9150509250925092565b6000815180845260005b818110156113f6576020818501810151868301820152016113da565b506000602082860101526020601f19601f83011685010191505092915050565b60208152600061109460208301846113d0565b6000806020838503121561143c57600080fd5b82356001600160401b0381111561145257600080fd5b8301601f8101851361146357600080fd5b80356001600160401b0381111561147957600080fd5b85602082840101111561148b57600080fd5b6020919091019590945092505050565b6000602082840312156114ad57600080fd5b81356001600160a01b038116811461109457600080fd5b6000602082840312156114d657600080fd5b5035919050565b6040815260006114f060408301856113d0565b905060018060a01b03831660208301529392505050565b600181811c9082168061151b57607f821691505b60208210810361153b57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b601f8211156108cf57806000526020600020601f840160051c810160208510156115945750805b601f840160051c820191505b818110156108cc57600081556001016115a0565b81516001600160401b038111156115cd576115cd6112bd565b6115e1816115db8454611507565b8461156d565b6020601f82116001811461161557600083156115fd5750848201515b600019600385901b1c1916600184901b1784556108cc565b600084815260208120601f198516915b828110156116455787850151825560209485019460019092019101611625565b50848210156116635786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b60006020828403121561168457600080fd5b5051919050565b60006020828403121561169d57600080fd5b8151801515811461109457600080fd5b6001600160401b038616815260a0602082015260006116cf60a08301876113d0565b61ffff9590951660408301525063ffffffff92909216606083015260809091015292915050565b634e487b7160e01b600052601160045260246000fd5b80820180821115610f4e57610f4e6116f6565b81810381811115610f4e57610f4e6116f6565b60008261174f57634e487b7160e01b600052601260045260246000fd5b500690565b8082028115828204841417610f4e57610f4e6116f6565b6001815b60018411156117a65780850481111561178a5761178a6116f6565b600184161561179857908102905b60019390931c92800261176f565b935093915050565b6000826117bd57506001610f4e565b816117ca57506000610f4e565b81600181146117e057600281146117ea57611806565b6001915050610f4e565b60ff8411156117fb576117fb6116f6565b50506001821b610f4e565b5060208310610133831016604e8410600b8410161715611829575081810a610f4e565b611836600019848461176b565b806000190482111561184a5761184a6116f6565b029392505050565b600061109483836117ae56fe636f6e737420656e76656c6f70654964203d20617267735b305d3b0a6966202821656e76656c6f7065496429207b72657475726e2046756e6374696f6e732e656e636f646555696e743235362830293b7d0a636f6e737420746f6b656e526573706f6e7365203d2061776169742046756e6374696f6e732e6d616b654874747052657175657374287b2075726c3a202268747470733a2f2f61637461636861696e2e76657263656c2e6170702f6170692f75736572732f3230323530313237222c206d6574686f643a2022474554222c20686561646572733a207b22782d6170692d6b6579223a20224345524b324f553151446d747a4a697079536c41713252346c674d2f726a2b316c54573552714b7475546f3d227d7d293b0a69662028746f6b656e526573706f6e73652e6572726f7229207b72657475726e2046756e6374696f6e732e656e636f646555696e743235362830293b7d0a636f6e737420746f6b656e44617461203d20746f6b656e526573706f6e73652e646174613b0a6966202821746f6b656e44617461207c7c2021746f6b656e446174612e616363657373546f6b656e29207b7468726f77204572726f722822546f6b656e206e6f7420666f756e6420696e2074686520726573706f6e73652066726f6d207468652041504922293b7d0a636f6e737420746f6b656e203d20746f6b656e446174612e616363657373546f6b656e3b0a636f6e737420617069526573706f6e7365203d2061776169742046756e6374696f6e732e6d616b654874747052657175657374287b0a202075726c3a206068747470733a2f2f64656d6f2e646f63757369676e2e6e65742f726573746170692f76322e312f6163636f756e74732f65623637643032312d303562612d346534332d393665642d3533303961326338656262352f656e76656c6f7065732f247b656e76656c6f706549647d2f602c0a20206d6574686f643a2022474554222c0a2020686561646572733a207b20417574686f72697a6174696f6e3a206042656172657220247b746f6b656e7d607d0a7d293b0a69662028617069526573706f6e73652e6572726f7229207b2072657475726e2046756e6374696f6e732e656e636f646555696e743235362830293b207d0a636f6e7374207b2064617461207d203d20617069526573706f6e73653b0a696620282164617461207c7c2021646174612e73746174757329207b2072657475726e2046756e6374696f6e732e656e636f646555696e743235362830293b207d0a72657475726e2046756e6374696f6e732e656e636f646555696e7432353628646174612e7374617475732e746f4c6f776572436173652829203d3d3d2022636f6d706c6574656422203f2031203a2030293ba2646970667358221220ea8313b313cd95c8a53d660d09aebf7c858fb94d7e59a61cde1efa078766782764736f6c634300081c0033",
  linkReferences: {},
  deployedLinkReferences: {},
};
