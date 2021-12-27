import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { CHAIN_INFO } from "./constants";

export function useVestingList() {
  const { account } = useWeb3React();
  const [vestingList, setVestingList] = useState(false);
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data } = useSWR(CHAIN_INFO[1].vestingList, fetcher);

  useEffect(() => {
    if (data && account) {
      if (data[account]) {
        setVestingList(data[account]);
      } else {
        setVestingList(false);
      }
    } else {
      setVestingList(undefined);
    }
  }, [account, data]); // catch vesting status if account or whitelist change

  return vestingList;
}

export function useKYC() {
  const { account } = useWeb3React();
  const [kyc, setKyc] = useState(false);
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data } = useSWR(CHAIN_INFO[1].kycList, fetcher);

  useEffect(() => {
    if (data && account) {
      if (data[account]) {
        setKyc(true);
      } else {
        setKyc(false);
      }
    } else {
      setKyc(undefined);
    }
  }, [account, data]); // catch kyc status if account or whitelist change

  return kyc;
}

export function useNotifs() {
  const [notifs, setNotifs] = useState();
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(CHAIN_INFO[1].notifsList, fetcher);

  useEffect(() => {
    if (data) {
      setNotifs(data);
    } else {
      setNotifs(undefined);
    }
  }, [data]); // fetch notifs

  return notifs;
}
