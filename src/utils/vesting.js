import { useState, useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import { useUpdater } from "./updater";
import { fromWeiWithDecimals } from "./decimals";
import { ethers } from "ethers";

import { CHAIN_INFO } from "./constants";

export function useVestingRead() {
  const [vesting, setVesting] = useState(undefined);

  const { account, library, chainId } = useWeb3React();

  const updater = useUpdater();

  useEffect(async () => {
    if (library && chainId && account && CHAIN_INFO[chainId].vesting) {
      let vestingInfos = {};
      let contract,
        tokenContract,
        claimableAmounts,
        claimedAmounts,
        lockedAmounts,
        unlockBegin,
        unlockCliff,
        unlockEnd,
        name,
        symbol,
        token,
        decimals;

      let totalClaimedAmounts = 0,
        totalClaimableAmounts = 0,
        totalLockedAmounts = 0;

      let chartId = 0;
      let chartData = [];
      let dashArray = [];
      let chartValues = [];

      let colors = [
        "#7f3bd5",
        "#fe1ae7",
        "#400091",
        "#fb80ff",
        "#aa00ff",
        "#ff00ea",
      ];
      let colorId = 0;

      for (let lockup in CHAIN_INFO[chainId].vesting) {
        contract = new ethers.Contract(
          CHAIN_INFO[chainId].vesting[lockup].address,
          CHAIN_INFO[chainId].vesting[lockup].abi,
          library
        );

        if (await contract.lockedAddressExist(account)) {
          token = await contract.token();

          tokenContract = new ethers.Contract(
            token,
            CHAIN_INFO[chainId].vesting[lockup].tokenAbi,
            library
          );

          decimals = await tokenContract.decimals();

          symbol = await tokenContract.symbol();

          claimedAmounts = fromWeiWithDecimals(
            await contract.claimedAmounts(account),
            decimals
          );

          totalClaimedAmounts += claimedAmounts;

          claimableAmounts = fromWeiWithDecimals(
            await contract.claimableAmounts(account),
            decimals
          );

          totalClaimableAmounts += claimableAmounts;

          lockedAmounts = fromWeiWithDecimals(
            await contract.lockedAmounts(account),
            decimals
          );

          totalLockedAmounts += lockedAmounts;

          unlockBegin = (await contract.unlockBegin()).toNumber();

          unlockCliff = (await contract.unlockCliff()).toNumber();

          unlockEnd = (await contract.unlockEnd()).toNumber();

          name = await contract.name();

          if (unlockBegin < unlockCliff) {
            chartData[chartId] = {
              name: name,
              data: [
                [unlockBegin * 1000, 0],
                [
                  unlockCliff * 1000,
                  (lockedAmounts * (unlockCliff - unlockBegin)) /
                    (unlockEnd - unlockBegin),
                ],
              ],
            };
            dashArray.push(5);
            chartId++;
          }

          let interval = (unlockEnd - unlockCliff) / 10;

          for (let i = unlockCliff; i <= unlockEnd; i += interval) {
            chartValues.push([
              i * 1000,
              (lockedAmounts * (i - unlockBegin)) / (unlockEnd - unlockBegin),
            ]);
          }

          chartData[chartId] = {
            name: name,
            data: chartValues,
          };
          chartId += 1;
          dashArray.push(0);

          chartValues = [];

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
            decimals: decimals,
            color: colors[colorId],
          };
          colorId += 1;
        } else {
          setVesting(false);
        }
      }

      const chartOptions = {
        chart: {
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          theme: "dark",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          dashArray: dashArray,
        },
        xaxis: {
          type: "datetime",
          colors: colors,
          labels: {
            style: {
              colors: "#c8cfca",
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#c8cfca",
              fontSize: "12px",
            },
          },
        },
        legend: {
          show: false,
        },
        grid: {
          strokeDashArray: 5,
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.5,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 0.8,
            opacityTo: 0,
            stops: [],
          },
          colors: colors,
        },
        colors: colors,
      };

      vestingInfos["total"] = {
        name: "total",
        totalClaimedAmounts: totalClaimedAmounts,
        totalClaimableAmounts: totalClaimableAmounts,
        totalLockedAmounts: totalLockedAmounts,
        symbol: symbol,
        chartOptions: chartOptions,
        chartData: chartData,
      };

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

export function useVestingWrite() {
  const [loading, setLoading] = useState(false);

  const { account, library, chainId } = useWeb3React();

  async function claim(address) {
    setLoading(true);
    let lockup, contract, amount, tx;
    for (let index in CHAIN_INFO[chainId].vesting) {
      if (CHAIN_INFO[chainId].vesting[index].address == address) {
        lockup = index;
      }
    }
    const signer = library.getSigner();

    contract = new ethers.Contract(
      address,
      CHAIN_INFO[chainId].vesting[lockup].abi,
      signer
    );
    amount = await contract.claimableAmounts(account);

    if (amount) {
      tx = await contract.claim(account, amount).then((transferResult) => {
        console.log("en attente");
      });
    } else {
      setLoading(false);
    }

    setLoading(false);
  }

  return { loading, claim };
}
