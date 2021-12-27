import { useState, useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import { useUpdater } from "./updater";
import { fromWeiWithDecimals } from "./decimals";

import { ethers } from "ethers";

import { CHAIN_INFO } from "./constants";

/*todo update with new smart contract*/
export function useVesting() {
  const [vesting, setVesting] = useState(undefined);

  const { account, library, chainId } = useWeb3React();

  const updater = useUpdater();

  useEffect(async () => {
    if (library && chainId && account && CHAIN_INFO[chainId].vesting) {
      let vestingInfos = {};
      let contract,
        claimedAmounts,
        claimableBalance,
        lockedAmounts,
        unlockBegin,
        unlockCliff,
        unlockEnd,
        token;

      let totalClaimedAmounts = 0,
        totalClaimableBalance = 0,
        totalLockedAmounts = 0;

      for (const lockup in CHAIN_INFO[chainId].vesting) {
        contract = new ethers.Contract(
          CHAIN_INFO[chainId].vesting[lockup].address,
          CHAIN_INFO[chainId].vesting[lockup].abi,
          library
        );

        claimedAmounts = fromWeiWithDecimals(
          await contract.claimedAmounts(account),
          18
        );

        totalClaimedAmounts = totalClaimedAmounts + claimedAmounts;

        claimableBalance = fromWeiWithDecimals(
          await contract.claimableBalance(account),
          18
        );

        totalClaimableBalance = totalClaimableBalance + claimableBalance;

        lockedAmounts = fromWeiWithDecimals(
          await contract.lockedAmounts(account),
          18
        );

        totalLockedAmounts = totalLockedAmounts + lockedAmounts;

        unlockBegin = await contract.unlockBegin();

        unlockCliff = await contract.unlockCliff();

        unlockEnd = await contract.unlockEnd();

        token = await contract.token();

        if (fromWeiWithDecimals(lockedAmounts, 18) != 0) {
          vestingInfos[lockup] = {
            claimedAmounts: claimedAmounts,
            claimableBalance: claimableBalance,
            lockedAmounts: lockedAmounts,
            unlockBegin: unlockBegin,
            unlockCliff: unlockCliff,
            unlockEnd: unlockEnd,
            token: token,
            address: CHAIN_INFO[chainId].vesting[lockup].address,
            name: CHAIN_INFO[chainId].vesting[lockup].name,
          };
        }

        if (
          totalClaimedAmounts ||
          totalClaimableBalance ||
          totalLockedAmounts !== 0
        ) {
          vestingInfos["total"] = {
            name: "total",
            totalClaimedAmounts: totalClaimedAmounts,
            totalClaimableBalance: totalClaimableBalance,
            totalLockedAmounts: totalLockedAmounts,
          };
        }
      }

      if (Object.keys(vestingInfos).length) {
        setVesting(vestingInfos);
      } else {
        setVesting(false);
      }
    } else {
      setVesting(false);
    }
  }, [account, library, chainId, updater]); // recovery vesting infos

  useEffect(async () => {
    setVesting(undefined);
  }, [account, chainId]); // recovery vesting infos

  return vesting;
}
