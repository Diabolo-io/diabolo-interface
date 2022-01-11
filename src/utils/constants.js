import tokenAbi from "./abi/token";
import erc20Abi from "./abi/erc20";
import vestingAbi from "./abi/vesting";

import AssetsLogo from "./assets/token";

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
const DOCS_LINK = process.env.REACT_APP_DOCS_LINK;
const MAIN_PAGE = process.env.REACT_APP_MAIN_PAGE;
const KYC_LINK = process.env.REACT_APP_KYC_LINK;
const KYC_LIST = process.env.REACT_APP_KYC_LIST;
const NOTIFS_LIST = process.env.REACT_APP_NOTIFS_LIST;
const VESTING_LIST = process.env.REACT_APP_VESTING_LIST;
const OFF_CHAIN_INTERVAL = process.env.REACT_APP_OFF_CHAIN_INTERVAL;
const BLOCKPASS_CLIENT_ID = process.env.REACT_APP_BLOCKPASS_CLIENT_ID;

export const SupportedChainId = {
  MAINNET: 1,
};

export const ALL_SUPPORTED_CHAIN_IDS = [
  SupportedChainId.MAINNET,
];

export const CHAIN_INFO = {
  [SupportedChainId.MAINNET]: {
    name: "Ethereum",
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
    blockpassClientId: BLOCKPASS_CLIENT_ID,
    nativeCoin: { name: "ETH", symbol: "ETH", decimals: 18 },
    vestingList: VESTING_LIST,
    kycList: KYC_LIST,
    notifsList: NOTIFS_LIST,
    kycLink: KYC_LINK,
  },
};
