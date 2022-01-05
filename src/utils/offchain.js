import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { CHAIN_INFO } from "./constants";

import { useOffChainUpdater } from "./updater";

export async function fetcher(...args) {
  const res = await fetch(...args);
  return res.json();
}

export function useVestingList() {
  const { account, chainId } = useWeb3React();
  const updater = useOffChainUpdater();
  const [vestingList, setVestingList] = useState(undefined);

  useEffect(async () => {
    if (account && chainId && CHAIN_INFO[chainId].vestingList) {
      let data = await fetcher(CHAIN_INFO[chainId].vestingList);

      let accountLower = account.toLowerCase();

      if (data && data[accountLower]) {
        setVestingList(data[accountLower]);
      } else {
        setVestingList(false);
      }
    } else {
      setVestingList(false);
    }
  }, [account, chainId, updater]); // catch vesting status if account or whitelist change

  return vestingList;
}

export function useKYC() {
  const { account, chainId } = useWeb3React();
  const updater = useOffChainUpdater();
  const [kyc, setKyc] = useState(undefined);

  useEffect(async () => {
    if (account && chainId && CHAIN_INFO[chainId].kycList) {
      let data = await fetcher(CHAIN_INFO[chainId].kycList);
      if (data && data[account]) {
        setKyc(true);
      } else {
        setKyc(false);
      }
    } else {
      setKyc(false);
    }
  }, [account, chainId, updater]); // catch kyc status if account or whitelist change

  return kyc;
}

export function useNotifs() {
  const { chainId } = useWeb3React();
  const updater = useOffChainUpdater();
  const [notifs, setNotifs] = useState(undefined);

  useEffect(async () => {
    if (chainId && CHAIN_INFO[chainId].notifsList) {
      let data = await fetcher(CHAIN_INFO[chainId].notifsList);
      if (data) {
        setNotifs(data);
      } else {
        setNotifs(undefined);
      }
    } else {
      let data = await fetcher(CHAIN_INFO[1].notifsList);

      if (data) {
        setNotifs(data);
      } else {
        setNotifs(undefined);
      }
    }
  }, [chainId, updater]); // fetch notifs

  return notifs;
}
