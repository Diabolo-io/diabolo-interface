import tokenAbi from "./abi/token";
import erc20Abi from "./abi/erc20";
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
const OFF_CHAIN_INTERVAL = process.env.REACT_APP_OFF_CHAIN_INTERVAL;

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
    offchainInterval: OFF_CHAIN_INTERVAL,
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
    offchainInterval: OFF_CHAIN_INTERVAL,
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
        address: "0xfe072B57251B61cbA0De6467Ce964Ff442f8997b",
        abi: vestingAbi,
        tokenAbi: erc20Abi,
      },
      {
        address: "0xD401B40aa70498A64d141a0DA338BE0f4430Ae68",
        abi: vestingAbi,
        tokenAbi: erc20Abi,
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
    offchainInterval: OFF_CHAIN_INTERVAL,
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
    kycList: KYC_LIST,
    notifsList: NOTIFS_LIST,
    kycLink: KYC_LINK,
  },
};
