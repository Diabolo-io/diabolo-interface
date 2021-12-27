import tokenAbi from "./abi/token";
import vestingAbi from "./abi/vesting";
/*todo update abi*/
import AssetsLogo from "./assets/token";

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
const DOCS_LINK = process.env.REACT_APP_DOCS_LINK;
const MAIN_PAGE = process.env.REACT_APP_MAIN_PAGE;
const KYC_LINK = process.env.REACT_APP_KYC_LINK;
const KYC_LIST = process.env.REACT_APP_KYC_LIST;
const NOTIFS_LIST = process.env.REACT_APP_NOTIFS_LIST;
const VESTING_LIST = process.env.REACT_APP_VESTING_LIST;

export const SupportedChainId = {
  MAINNET: 1,
  RINKEBY: 4,
  POLYGON: 137,
};

export const ALL_SUPPORTED_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.RINKEBY,
  SupportedChainId.POLYGON,
];

export const CHAIN_INFO = {
  [SupportedChainId.MAINNET]: {
    chainId: 1,
    explorer: "https://etherscan.io/",
    infura: "https://mainnet.infura.io/v3/" + INFURA_KEY,
    label: "Ethereum",
    logo: AssetsLogo.Ethereum,
    rpcUrl: "none",
    docLink: DOCS_LINK,
    mainPage: MAIN_PAGE,
    mainToken: {
      name: "Diabolo Token",
      symbol: "DCASH",
      decimals: 10,
      address: "0xcF8f32e032f432B02393636B2092a6BEf975FBF9",
      abi: tokenAbi,
    },
    nativeCoin: { name: "ETH", symbol: "ETH", decimals: 18 },
    vestingList: VESTING_LIST,
    kycList: KYC_LIST,
    notifsList: NOTIFS_LIST,
    kycLink: KYC_LINK,
  },
  [SupportedChainId.RINKEBY]: {
    chainId: 4,
    explorer: "https://rinkeby.etherscan.io/",
    infura: "https://rinkeby.infura.io/v3/" + INFURA_KEY,
    label: "Rinkeby",
    logo: AssetsLogo.Rinkeby,
    rpcUrl: "none",
    docLink: DOCS_LINK,
    mainPage: MAIN_PAGE,
    mainToken: {
      name: "Diabolo Token Test",
      symbol: "rinkDCASH",
      decimals: 9,
      address: "0x274ADDF5f0E3Cc8f80E720C1886A2C736f790e8e",
      abi: tokenAbi,
    },
    nativeCoin: { name: "Rinkeby ETH", symbol: "rinkETH", decimals: 18 },
    vestingList: VESTING_LIST,
    kycList: KYC_LIST,
    notifsList: NOTIFS_LIST,
    kycLink: KYC_LINK,
    vesting: [
      {
        name: "Whitelist",
        address: "0x184baeF076e5CA84084A5b9CC3E784a8C8e5b3fD",
        abi: vestingAbi,
      },
      {
        name: "Seed",
        address: "0xbB382265fb76A34D70626706f739a619A5fF1963",
        abi: vestingAbi,
      },
      {
        name: "Team",
        address: "0xD4C6F2D3c6Dd5eD2e63d9576171FF8C84C5EDe13",
        abi: vestingAbi,
      },
    ],
  },
  [SupportedChainId.POLYGON]: {
    chainId: 137,
    explorer: "https://polygonscan.com/",
    infura: "https://polygon.infura.io/v3/" + INFURA_KEY,
    label: "Polygon",
    logo: AssetsLogo.Polygon,
    rpcUrl: "https://rpc-mainnet.maticvigil.com",
    docLink: DOCS_LINK,
    mainPage: MAIN_PAGE,
    mainToken: {
      name: "DCASH",
      symbol: "DCASH",
      decimals: 9,
      address: "0x274ADDF5f0E3Cc8f80E720C1886A2C736f790e8e",
      abi: tokenAbi,
    },
    nativeCoin: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    vestingList: VESTING_LIST,
    kycList: KYC_LIST,
    notifsList: NOTIFS_LIST,
    kycLink: KYC_LINK,
  },
};
