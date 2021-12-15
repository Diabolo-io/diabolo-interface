import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

export function useENS() {
  const { account, library } = useWeb3React();

  const [ensName, setEnsName] = useState(null);

  useEffect(async () => {
    if (library) {
      setEnsName(await library.lookupAddress(account));
    } else {
      setEnsName(null);
    }
  }, [account]); // catch ens name if account change

  return ensName;
}
