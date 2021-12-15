import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { KYC_LIST } from "./constants";

export function useKYC() {
  const { account } = useWeb3React();
  const [kyc, setKyc] = useState(false);
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data } = useSWR(KYC_LIST, fetcher);

  useEffect(() => {
    if (data) {
      if (account) {
        if (data[account]) {
          setKyc(true);
        } else {
          setKyc(false);
        }
      } else {
        setKyc(undefined);
      }
    } else {
      setKyc(undefined);
    }
  }, [account, data]); // catch kyc status if account or whitelist change

  return kyc;
}
