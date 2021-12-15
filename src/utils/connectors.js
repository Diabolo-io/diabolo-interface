import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
//import { TrezorConnector } from "@web3-react/trezor-connector";

import { CHAIN_ID, CHAIN_INFO } from "./constants";

const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({
  supportedChainIds: [parseInt(CHAIN_ID)],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { [CHAIN_ID]: CHAIN_INFO[CHAIN_ID].infura },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const ledger = new LedgerConnector({
  chainId: CHAIN_ID,
  url: CHAIN_INFO[CHAIN_ID].infura,
  pollingInterval: POLLING_INTERVAL,
});
/*
export const trezor = new TrezorConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: "dummy@abc.xyz",
  manifestAppUrl: "https://8rg3h.csb.app/"
});
*/
