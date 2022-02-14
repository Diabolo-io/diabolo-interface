const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "id_",
				"type": "bytes32"
			}
		],
		"name": "bump",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "buy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "buy_amt",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "max_fill_amount",
				"type": "uint256"
			}
		],
		"name": "buyAllAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "fill_amt",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "cancel",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "del_rank",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pos",
				"type": "uint256"
			}
		],
		"name": "insert",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "pair",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "maker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "pay_amt",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "buy_amt",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "timestamp",
				"type": "uint64"
			}
		],
		"name": "LogBump",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isEnabled",
				"type": "bool"
			}
		],
		"name": "LogBuyEnabled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "keeper",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "LogDelete",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "keeper",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "LogInsert",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "LogItemUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "pair",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "maker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "pay_amt",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "buy_amt",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "timestamp",
				"type": "uint64"
			}
		],
		"name": "LogKill",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "pair",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "maker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "pay_amt",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "buy_amt",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "timestamp",
				"type": "uint64"
			}
		],
		"name": "LogMake",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isEnabled",
				"type": "bool"
			}
		],
		"name": "LogMatchingEnabled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "min_amount",
				"type": "uint256"
			}
		],
		"name": "LogMinSell",
		"type": "event"
	},
	{
		"anonymous": true,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes4",
				"name": "sig",
				"type": "bytes4"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "guy",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "foo",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "bar",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "wad",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "fax",
				"type": "bytes"
			}
		],
		"name": "LogNote",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "authority",
				"type": "address"
			}
		],
		"name": "LogSetAuthority",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "LogSetOwner",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "LogSortedOffer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "pair",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "maker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "taker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "take_amt",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "give_amt",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "timestamp",
				"type": "uint64"
			}
		],
		"name": "LogTake",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pay_amt",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "buy_amt",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buy_gem",
				"type": "address"
			}
		],
		"name": "LogTrade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "LogUnsortedOffer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"internalType": "uint128",
				"name": "pay_amt",
				"type": "uint128"
			},
			{
				"internalType": "uint128",
				"name": "buy_amt",
				"type": "uint128"
			}
		],
		"name": "make",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pay_amt",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "buy_amt",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "pos",
				"type": "uint256"
			}
		],
		"name": "offer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pay_amt",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "buy_amt",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "pos",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "rounding",
				"type": "bool"
			}
		],
		"name": "offer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pay_amt",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "buy_amt",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			}
		],
		"name": "offer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "pay_amt",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "min_fill_amount",
				"type": "uint256"
			}
		],
		"name": "sellAllAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "fill_amt",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "contract DSAuthority",
				"name": "authority_",
				"type": "address"
			}
		],
		"name": "setAuthority",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bool",
				"name": "buyEnabled_",
				"type": "bool"
			}
		],
		"name": "setBuyEnabled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bool",
				"name": "matchingEnabled_",
				"type": "bool"
			}
		],
		"name": "setMatchingEnabled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "dust",
				"type": "uint256"
			}
		],
		"name": "setMinSell",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "owner_",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "stop",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"internalType": "uint128",
				"name": "maxTakeAmount",
				"type": "uint128"
			}
		],
		"name": "take",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "_best",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "_dust",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_near",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_rank",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "next",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "prev",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "delb",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "_span",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "authority",
		"outputs": [
			{
				"internalType": "contract DSAuthority",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyEnabled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "dustId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "sell_gem",
				"type": "address"
			},
			{
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			}
		],
		"name": "getBestOffer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getBetterOffer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "pay_amt",
				"type": "uint256"
			}
		],
		"name": "getBuyAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "fill_amt",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getFirstUnsortedOffer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			}
		],
		"name": "getMinSell",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getNextUnsortedOffer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getOffer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "sell_gem",
				"type": "address"
			},
			{
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			}
		],
		"name": "getOfferCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "buy_amt",
				"type": "uint256"
			}
		],
		"name": "getPayAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "fill_amt",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getWorseOffer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "isActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isClosed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "closed",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "isOfferSorted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "last_offer_id",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "matchingEnabled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "offers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "pay_amt",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "pay_gem",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "buy_amt",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20",
				"name": "buy_gem",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint64",
				"name": "timestamp",
				"type": "uint64"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "stopped",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

export default abi;
