import { useState, useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import { useUpdater } from "./updater";
import { useFullVestingList } from "./offchain";
import { ethers } from "ethers";

import { CHAIN_INFO } from "./constants";

export function useVoteRead() {
  const [vote, setVote] = useState(undefined);

  //fetch off chain vesting
  const fullVestingList = useFullVestingList();

  const { account, library, chainId } = useWeb3React();

  const updater = useUpdater();

  useEffect(async () => {

    if (fullVestingList && library && chainId && account && fullVestingList[account.toLowerCase()] && CHAIN_INFO[chainId].vote) {

      let voteInfos = {};
      let total = {};
      let provider = {};
      let contract = {};

      for(let chain in CHAIN_INFO){
        if(CHAIN_INFO[chain].vote){
          provider[chain] = new ethers.providers.JsonRpcProvider(CHAIN_INFO[chain].providerUrl);

          if(chainId.toString() == chain.toString()){
            contract[chain] = new ethers.Contract(
            CHAIN_INFO[chain].vote[0].address,
            CHAIN_INFO[chain].vote[0].abi,
            library
            );
          } else {
            contract[chain] = new ethers.Contract(
              CHAIN_INFO[chain].vote[0].address,
              CHAIN_INFO[chain].vote[0].abi,
              provider[chain]
            );
          }

          let voters = await contract[chain].votersAddresses();

          for(let voter in voters){

            let votes = await contract[chain].voters(voters[voter]);
            let voterAddress = voters[voter].toLowerCase();

            if(total[votes.vote.toString()] == undefined){
              total[votes.vote.toString()] = fullVestingList[voterAddress].amount;
            } else {
              total[votes.vote.toString()] += fullVestingList[voterAddress].amount;
            }

            voteInfos[voters[voter]] = {
              voted: votes.voted,
              vote: votes.vote.toString(),
              size: fullVestingList[voterAddress].amount,
            };
          }
      }
    }
    voteInfos["total"] = total;

    let series = [];
    let labels = [];

    for(let value in voteInfos["total"]){
      series.push(voteInfos["total"][value]);
      labels.push("Vote #"+value);
      voteInfos["series"] = series;
    }

    voteInfos["options"] = {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: labels,
      colors: ["#7f3bd5","#fe1ae7","#400091","#fb80ff","#aa00ff","#ff00ea"],
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
    };

    setVote(voteInfos);
  } else {
    setVote(false);
  }
}, [account, library, chainId, fullVestingList]); // recovery vote infos

  useEffect(async () => {
    setVote(undefined);
  }, [account, chainId]); // recovery vote infos

  return vote;
}

export function useVoteWrite() {
  const [loading, setLoading] = useState(false);

  const { account, library, chainId } = useWeb3React();

  async function voteFor(address, voteId) {
    setLoading(true);

    let voteIndex, contract, voteStatus, tx;
    for (let index in CHAIN_INFO[chainId].vote) {
      if (CHAIN_INFO[chainId].vote[index].address == address) {
        voteIndex = index;
      }
    }
    const signer = library.getSigner();

    contract = new ethers.Contract(
      address,
      CHAIN_INFO[chainId].vote[voteIndex].abi,
      signer
    );

    voteStatus = await contract.voters(account);

    if (!voteStatus.voted) {
      tx = await contract.vote(voteId).then((transferResult) => {
        console.log("en attente");
      });
    } else {
      setLoading(false);
    }
    setLoading(false);
  }

  return { loading, voteFor };
}
