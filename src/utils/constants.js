import tokenAbi from "./abi/token";
import vestingAbi from "./abi/vesting";

import AssetsLogo from "./assets/token";

export const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
export const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
export const DOCS_LINK = process.env.REACT_APP_DOCS_LINK;
export const MAIN_PAGE = process.env.REACT_APP_MAIN_PAGE;
export const KYC_LIST = process.env.REACT_APP_KYC_LIST;
export const KYC_LINK = process.env.REACT_APP_KYC_LINK;
export const NOTIFS_LIST = process.env.REACT_APP_NOTIFS_LIST;

export const SupportedChainId = {
  MAINNET: 1,
  RINKEBY: 4,
  POLYGON: 137,
};

export const ALL_SUPPORTED_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.RINKEBY,
];

export const CHAIN_INFO = {
  [SupportedChainId.MAINNET]: {
    explorer: "https://etherscan.io/",
    infura: "https://mainnet.infura.io/v3/" + INFURA_KEY,
    label: "Ethereum",
    logo: AssetsLogo.Ethereum,
    rpcUrl: "none",
    mainToken: {
      name: "Diabolo Token",
      symbol: "DCASH",
      decimals: 10,
      address: "0xcF8f32e032f432B02393636B2092a6BEf975FBF9",
      abi: tokenAbi,
    },
    nativeCoin: { name: "ETH", symbol: "ETH", decimals: 18 },
  },
  [SupportedChainId.RINKEBY]: {
    explorer: "https://rinkeby.etherscan.io/",
    infura: "https://rinkeby.infura.io/v3/" + INFURA_KEY,
    label: "Rinkeby",
    logo: AssetsLogo.Ethereum,
    rpcUrl: "none",
    mainToken: {
      name: "Diabolo Token Test",
      symbol: "rinkDCASH",
      decimals: 9,
      address: "0x274ADDF5f0E3Cc8f80E720C1886A2C736f790e8e",
      abi: tokenAbi,
    },
    nativeCoin: { name: "Rinkeby ETH", symbol: "rinkETH", decimals: 18 },
  },
  [SupportedChainId.POLYGON]: {
    explorer: "https://polygonscan.com/",
    infura: "https://polygon.infura.io/v3/" + INFURA_KEY,
    label: "Polygon",
    logo: AssetsLogo.Ethereum,
    rpcUrl: "https://rpc-mainnet.maticvigil.com",
    mainToken: {
      name: "DCASH",
      symbol: "DCASH",
      decimals: 9,
      address: "0x274ADDF5f0E3Cc8f80E720C1886A2C736f790e8e",
      abi: tokenAbi,
    },
    nativeCoin: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  },
};

//export const ALL_VESTING_ADDRESS = [VestingList.WHITELIST, VestingList.SEED];

export const VestingList = {
  WHITELIST: 0,
  SEED: 1,
  TEAM: 2,
};

export const VESTING_INFO = {
  [VestingList.WHITELIST]: {
    name: "Whitelist",
    address: "0x184baeF076e5CA84084A5b9CC3E784a8C8e5b3fD",
    abi: vestingAbi,
  },
  [VestingList.SEED]: {
    name: "Seed",
    address: "0xbB382265fb76A34D70626706f739a619A5fF1963",
    abi: vestingAbi,
  },
  [VestingList.TEAM]: {
    name: "Team",
    address: "0xD4C6F2D3c6Dd5eD2e63d9576171FF8C84C5EDe13",
    abi: vestingAbi,
  },
};
