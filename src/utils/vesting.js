import { useState, useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import { useUpdater } from "./updater";

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
        claimableAmounts,
        claimedAmounts,
        lockedAmounts,
        unlockBegin,
        unlockCliff,
        unlockEnd,
        name,
        symbol,
        token,
        decimal;

      let totalClaimedAmounts,
        totalClaimableAmounts,
        totalLockedAmounts = 0;

      for (const lockup in CHAIN_INFO[chainId].vesting) {
        contract = new ethers.Contract(
          CHAIN_INFO[chainId].vesting[lockup].address,
          CHAIN_INFO[chainId].vesting[lockup].abi,
          library
        );

        if (await contract.lockedAddressExist(account)) {
          claimedAmounts = await contract.claimedAmounts(account);

          totalClaimedAmounts += claimedAmounts;

          claimableAmounts = await contract.claimableAmounts(account);

          totalClaimableAmounts += claimableAmounts;

          lockedAmounts = await contract.lockedAmounts(account);

          totalLockedAmounts += lockedAmounts;

          unlockBegin = await contract.unlockBegin();

          unlockCliff = await contract.unlockCliff();

          unlockEnd = await contract.unlockEnd();

          name = await contract.name();

          token = await contract.token();

          /*  decimal = await erc20.;

          symbol = await erc20. */

          vestingInfos[lockup] = {
            claimedAmounts: claimedAmounts,
            claimableAmounts: claimableAmounts,
            lockedAmounts: lockedAmounts,
            unlockBegin: unlockBegin,
            unlockCliff: unlockCliff,
            unlockEnd: unlockEnd,
            address: CHAIN_INFO[chainId].vesting[lockup].address,
            name: name,
            symbol: symbol,
          };
          vestingInfos["total"] = {
            totalClaimedAmounts: totalClaimedAmounts,
            totalClaimableAmounts: totalClaimableAmounts,
            totalLockedAmounts: totalLockedAmounts,
          };
          setVesting(vestingInfos);
        } else {
          setVesting(false);
        }
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
