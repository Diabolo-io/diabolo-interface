import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { CHAIN_INFO } from "./constants";
import { useUpdater } from "./updater";
import { fromWeiWithDecimals } from "./decimals";

export function useBalances() {
  const { account, library, chainId } = useWeb3React();

  const blockNumber = useUpdater();

  const [coinBalance, setCoinBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(async () => {
    if (library && chainId && account) {
      const contract = new ethers.Contract(
        CHAIN_INFO[chainId].mainToken.address,
        CHAIN_INFO[chainId].mainToken.abi,
        library
      );

      setCoinBalance(
        fromWeiWithDecimals(
          await library.getBalance(account),
          CHAIN_INFO[chainId].nativeCoin.decimals
        )
      );
      setTokenBalance(
        fromWeiWithDecimals(
          await contract.balanceOf(account),
          CHAIN_INFO[chainId].mainToken.decimals
        )
      );
    } else {
      setCoinBalance(0);
      setTokenBalance(0);
    }
  }, [account, library, chainId, blockNumber]); // recovery balance amount of token

  return { coinBalance, tokenBalance };
}
