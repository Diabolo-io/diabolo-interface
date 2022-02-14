import tokenAbi from "./abi/token";
import erc20Abi from "./abi/erc20";
import vestingAbi from "./abi/vesting";
import voteAbi from "./abi/vote";
import marketAbi from "./abi/market";

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
//  RINKEBY: 4,
  //BSC: 56,
  POLYGON: 137,
};

export const ALL_SUPPORTED_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  //SupportedChainId.RINKEBY,
  //SupportedChainId.BSC,
  SupportedChainId.POLYGON,
];

export const CHAIN_INFO = {
  [SupportedChainId.MAINNET]: {
    name: "Ethereum",
    chainId: 1,
    explorer: "https://etherscan.io/",
    providerUrl: "https://mainnet.infura.io/v3/" + INFURA_KEY,
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
    vote: [
      {
        address: "0xB3bFE049a0ABD6026cd785ef227E7dE1708d81a8",
        abi: voteAbi,
        proposals: [
          {
            name: "Listing",
            id: "1",
            data: [
              {
                name: "English",
                description: [
                  "In light of the current crypto-currency market situation, which has not escaped anyone's attention,  the Diabolo team would like to survey the community about listing the DCASH token.",
                  "The listing was originally scheduled for February 9th, 2022 and was to follow an IEO conducted earlier on January 7th.",
                  "The team does not want to rush a listing on the pretext that everything is ready for the launch. The protection of early investors and the long-term health of the project are at stake.",
                  "Launching a copy trading platform token in a bear market makes no sense.",
                  "There are several proposals for the project and its users :",
                ],
                proposal: [
                  {
                    title: "Postpone the listing, continue with the closed beta and postpone the V1.",
                    id: "0",
                  },
                  {
                    title: "Postpone the listing, create an internal exchange inspired by the OTC desks, with a minimum price of DCASH ($0.16) with no limit to the rise, allowing the launch of V1 and the circulation of the first DCASH within the ecosystem even during this period of falling crypto-currency market. (Team proposal)",
                    id: "1",
                  },
                  {
                    title: "Listing maintained regardless of market conditions and at the risk of facing the negative effects of a launch during a bear period on exchanges.",
                    id: "2",
                  },
                ],
              },
              {
                name: "Francais",
                description: [
                  "À la lumière des conditions actuelles du marché des crypto-monnaies, qui n'échappent à personne, l'équipe de Diabolo souhaite sonder la communauté sur la question du listing du token DCASH.",
                  "Le listing était initialement prévu pour le 9 février 2022 et devait faire suite à une IEO réalisée plus tôt, le 7 du mois.",
                  "L'équipe ne veut pas précipiter un listing sous prétexte que tout est prêt pour le lancement. Il en va de la protection des premiers investisseurs et de la santé à long terme du projet.",
                  "Lancer le token d'une plateforme de copy trading dans un marché baissier n'a aucune logique ni aucun bon sens.",
                  "Il existe plusieurs solutions pour le projet et ses utilisateurs :",
                ],
                proposal: [
                  {
                    title: "Repousser le listing en poursuivant la version bêta fermée et repousser la V1",
                    id: "0",
                  },
                  {
                    title: "Repousser le listing, créez un exchange interne inspirée des desk OTC, avec un prix minimum de DCASH (0.16$) sans limite à la hausse, permettant le lancement de la V1 et la circulation des premiers DCASH au sein de l'écosystème même pendant la période de chute du marché des crypto-monnaies. (Proposition de l'équipe)",
                    id: "1",
                  },
                  {
                    title: "Listing maintenu indépendamment des conditions de marché et au risque de subir tous les effets négatifs d'un lancement en période baissière sur les échanges.",
                    id: "2",
                  },
                ],
              },
            ]
          }
        ]
      },
    ],
  },
  /*[SupportedChainId.BSC]: {
    name: "Binance Smart Chain",
    chainId: 56,
    explorer: "https://bscscan.com/",
    providerUrl: "",
    label: "BSC",
    logo: AssetsLogo.Bsc,
    rpcUrl: "https://bsc-dataseed1.binance.org",
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
    nativeCoin: { name: "BNB", symbol: "BNB", decimals: 18 },
    vestingList: VESTING_LIST,
    kycList: KYC_LIST,
    notifsList: NOTIFS_LIST,
    kycLink: KYC_LINK,
  },*/
  [SupportedChainId.POLYGON]: {
    name: "Polygon",
    chainId: 137,
    explorer: "https://polygonscan.com/",
    providerUrl: "https://polygon-mainnet.infura.io/v3/" + INFURA_KEY,
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
      address: "0x74ba6A10978F643A84C0b37fCB599081079811cB",
      abi: tokenAbi,
    },
    blockpassClientId: BLOCKPASS_CLIENT_ID,
    nativeCoin: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    vestingList: VESTING_LIST,
    kycList: KYC_LIST,
    notifsList: NOTIFS_LIST,
    kycLink: KYC_LINK,
    vote: [
      {
        address: "0x45e6a30c940394df87b52521703ca3556e063753",
        abi: voteAbi,
        proposals: [
          {
            name: "Listing",
            id: "1",
            data: [
              {
                name: "English",
                description: [
                  "In light of the current crypto-currency market situation, which has not escaped anyone's attention,  the Diabolo team would like to survey the community about listing the DCASH token.",
                  "The listing was originally scheduled for February 9th, 2022 and was to follow an IEO conducted earlier on January 7th.",
                  "The team does not want to rush a listing on the pretext that everything is ready for the launch. The protection of early investors and the long-term health of the project are at stake.",
                  "Launching a copy trading platform token in a bear market makes no sense.",
                  "There are several proposals for the project and its users :",
                ],
                proposal: [
                  {
                    title: "Postpone the listing, continue with the closed beta and postpone the V1.",
                    id: "0",
                  },
                  {
                    title: "Postpone the listing, create an internal exchange inspired by the OTC desks, with a minimum price of DCASH ($0.16) with no limit to the rise, allowing the launch of V1 and the circulation of the first DCASH within the ecosystem even during this period of falling crypto-currency market. (Team proposal)",
                    id: "1",
                  },
                  {
                    title: "Listing maintained regardless of market conditions and at the risk of facing the negative effects of a launch during a bear period on exchanges.",
                    id: "2",
                  },
                ],
              },
              {
                name: "Francais",
                description: [
                  "À la lumière des conditions actuelles du marché des crypto-monnaies, qui n'échappent à personne, l'équipe de Diabolo souhaite sonder la communauté sur la question du listing du token DCASH.",
                  "Le listing était initialement prévu pour le 9 février 2022 et devait faire suite à une IEO réalisée plus tôt, le 7 du mois.",
                  "L'équipe ne veut pas précipiter un listing sous prétexte que tout est prêt pour le lancement. Il en va de la protection des premiers investisseurs et de la santé à long terme du projet.",
                  "Lancer le token d'une plateforme de copy trading dans un marché baissier n'a aucune logique ni aucun bon sens.",
                  "Il existe plusieurs solutions pour le projet et ses utilisateurs :",
                ],
                proposal: [
                  {
                    title: "Repousser le listing en poursuivant la version bêta fermée et repousser la V1",
                    id: "0",
                  },
                  {
                    title: "Repousser le listing, créez un exchange interne inspirée des desk OTC, avec un prix minimum de DCASH (0.16$) sans limite à la hausse, permettant le lancement de la V1 et la circulation des premiers DCASH au sein de l'écosystème même pendant la période de chute du marché des crypto-monnaies. (Proposition de l'équipe)",
                    id: "1",
                  },
                  {
                    title: "Listing maintenu indépendamment des conditions de marché et au risque de subir tous les effets négatifs d'un lancement en période baissière sur les échanges.",
                    id: "2",
                  },
                ],
              },
            ]
          }
        ]
      },
    ],
  },
  /*[SupportedChainId.RINKEBY]: {
    name: "Rinkeby",
    chainId: 4,
    explorer: "https://rinkeby.etherscan.io/",
    providerUrl: "https://rinkeby.infura.io/v3/" + INFURA_KEY,
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
    vote: [
      {
        address: "0x603bF8a155e4A9463a954A32C07621b398da703A",
        abi: voteAbi,
        proposals: [
          {
            name: "Listing",
            id: "1",
            data: [
              {
                name: "Francais",
                description: [
                  "À la lumière des conditions actuelles du marché des crypto-monnaies, qui n'échappent à personne, l'équipe de Diabolo souhaite sonder la communauté sur la question du listing du token DCASH.",
                  "Le listing était initialement prévu pour le 9 février 2022 et devait faire suite à une IEO réalisée plus tôt, le 7 du mois.",
                  "L'équipe ne veut pas précipiter un listing sous prétexte que tout est prêt pour le lancement. Il en va de la protection des premiers investisseurs et de la santé à long terme du projet.",
                  "Lancer le token d'une plateforme de copy trading dans un marché baissier n'a aucune logique ni aucun bon sens.",
                  "Il existe plusieurs solutions pour le projet et ses utilisateurs :",
                ],
                proposal: [
                  {
                    title: "Repousser le listing en poursuivant la version bêta fermée et repousser la V1",
                    id: "0",
                  },
                  {
                    title: "Repousser le listing, créez un exchange interne inspirée des desk OTC, avec un prix minimum de DCASH (0.16$) sans limite à la hausse, permettant le lancement de la V1 et la circulation des premiers DCASH au sein de l'écosystème même pendant la période de chute du marché des crypto-monnaies. (Proposition de l'équipe)",
                    id: "1",
                  },
                  {
                    title: "Listing maintenu indépendamment des conditions de marché et au risque de subir tous les effets négatifs d'un lancement en période baissière sur les échanges.",
                    id: "2",
                  },
                ],
              },
              {
                name: "English",
                description: [
                  "In light of the current crypto-currency market situation, which has not escaped anyone's attention,  the Diabolo team would like to survey the community about listing the DCASH token.",
                  "The listing was originally scheduled for February 9th, 2022 and was to follow an IEO conducted earlier on January 7th.",
                  "The team does not want to rush a listing on the pretext that everything is ready for the launch. The protection of early investors and the long-term health of the project are at stake.",
                  "Launching a copy trading platform token in a bear market makes no sense.",
                  "There are several proposals for the project and its users :",
                ],
                proposal: [
                  {
                    title: "Postpone the listing, continue with the closed beta and postpone the V1.",
                    id: "0",
                  },
                  {
                    title: "Postpone the listing, create an internal exchange inspired by the OTC desks, with a minimum price of DCASH ($0.16) with no limit to the rise, allowing the launch of V1 and the circulation of the first DCASH within the ecosystem even during this period of falling crypto-currency market. (Team proposal)",
                    id: "1",
                  },
                  {
                    title: "Listing maintained regardless of market conditions and at the risk of facing the negative effects of a launch during a bear period on exchanges.",
                    id: "2",
                  },
                ],
              },
            ]
          }
        ]
      },
    ],
    vesting: [
      {
        address: "0xb698BfAB79484Df7b377A44bff463640611c10CB",
        abi: vestingAbi,
        tokenAbi: erc20Abi,
      },
    ],
    market: [
      {
        address: "0x987cCe9FFC47D521e3Fb7EaE036a183d738958c9",
        abi: marketAbi,
        pairs: [
          {
            base: {
              address: "0x28b43effbfdc5ad2cf626ef3a01ce8c440fe9fca",
              symbol: "DCASH",
              abi: tokenAbi,
            },
            quote: {
              address: "0x76fb861f44fdd7b93aa2f1059c9bccbf04c08996",
              symbol: "USDC",
              abi: tokenAbi,
            },
          },
        ],
      },
    ],
  },*/
};
