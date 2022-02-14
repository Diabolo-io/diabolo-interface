import { useState, useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import { useUpdater } from "./updater";
import { fromWeiWithDecimals, toWeiWithDecimals } from "./decimals";
import { ethers } from "ethers";

import { CHAIN_INFO } from "./constants";

export function useMarketRead() {
  const [market, setMarket] = useState(undefined);

  const { account, library, chainId } = useWeb3React();

  const updater = useUpdater();

  useEffect(async () => {
    if (library && chainId && account && CHAIN_INFO[chainId].market) {
      let marketInfos = {};
      let pairsInfos = {};
      let tokenInfos = {};
      let marketContract,
        baseContract,
        quoteContract,
        baseDecimals,
        quoteDecimals,
        baseAllowance,
        quoteAllowance,
        asksSize,
        bidsSize;

      for (let marketId in CHAIN_INFO[chainId].market) {
        marketContract = new ethers.Contract(
          CHAIN_INFO[chainId].market[marketId].address,
          CHAIN_INFO[chainId].market[marketId].abi,
          library
        );

        for (let pairId in CHAIN_INFO[chainId].market[marketId].pairs) {
          baseContract = new ethers.Contract(
            CHAIN_INFO[chainId].market[marketId].pairs[pairId].base.address,
            CHAIN_INFO[chainId].market[marketId].pairs[pairId].base.abi,
            library
          );

          quoteContract = new ethers.Contract(
            CHAIN_INFO[chainId].market[marketId].pairs[pairId].quote.address,
            CHAIN_INFO[chainId].market[marketId].pairs[pairId].quote.abi,
            library
          );

          baseDecimals = await baseContract.decimals();
          quoteDecimals = await quoteContract.decimals();

          baseAllowance = await baseContract.allowance(
            account,
            CHAIN_INFO[chainId].market[marketId].address
          );
          quoteAllowance = await quoteContract.allowance(
            account,
            CHAIN_INFO[chainId].market[marketId].address
          );

          tokenInfos[
            CHAIN_INFO[chainId].market[marketId].pairs[pairId].base.address
          ] = { allowance: fromWeiWithDecimals(baseAllowance, baseDecimals) };

          tokenInfos[
            CHAIN_INFO[chainId].market[marketId].pairs[pairId].quote.address
          ] = { allowance: fromWeiWithDecimals(quoteAllowance, quoteDecimals) };

          asksSize = await marketContract.getOfferCount(
            CHAIN_INFO[chainId].market[marketId].pairs[pairId].base.address,
            CHAIN_INFO[chainId].market[marketId].pairs[pairId].quote.address
          );

          bidsSize = await marketContract.getOfferCount(
            CHAIN_INFO[chainId].market[marketId].pairs[pairId].quote.address,
            CHAIN_INFO[chainId].market[marketId].pairs[pairId].base.address
          );

          pairsInfos[pairId] = {
            asksSize: asksSize.toString(),
            bidsSize: bidsSize.toString(),
          };
        }

        marketInfos[marketId] = { pairsInfos, tokenInfos };
      }
      setMarket(marketInfos);
    } else {
      setMarket(false);
    }
  }, [account, library, chainId, updater]); // recovery market infos

  useEffect(async () => {
    setMarket(undefined);
  }, [account, chainId]); // recovery market infos

  return { market };
}

export function useMarketWrite() {
  const [loading, setLoading] = useState(false);

  const { account, library, chainId } = useWeb3React();

  async function buyLimit(marketId, pairId, buyAmount, price) {
    setLoading(true);

    let marketContract,
      baseContract,
      quoteContract,
      baseAddress,
      quoteAddress,
      baseDecimals,
      quoteDecimals,
      baseAmount,
      quoteAmount,
      tx;

    const signer = library.getSigner();

    marketContract = new ethers.Contract(
      CHAIN_INFO[chainId].market[marketId].address,
      CHAIN_INFO[chainId].market[marketId].abi,
      signer
    );

    baseAddress =
      CHAIN_INFO[chainId].market[marketId].pairs[pairId].base.address;
    quoteAddress =
      CHAIN_INFO[chainId].market[marketId].pairs[pairId].quote.address;

    baseContract = new ethers.Contract(
      baseAddress,
      CHAIN_INFO[chainId].market[marketId].pairs[pairId].base.abi,
      signer
    );

    quoteContract = new ethers.Contract(
      quoteAddress,
      CHAIN_INFO[chainId].market[marketId].pairs[pairId].quote.abi,
      signer
    );

    baseDecimals = await baseContract.decimals();
    quoteDecimals = await quoteContract.decimals();

    baseAmount = toWeiWithDecimals(buyAmount, baseDecimals);

    let sellAmount = buyAmount * price;

    quoteAmount = toWeiWithDecimals(sellAmount, quoteDecimals);

    tx = await marketContract.functions[
      "offer(uint256,address,uint256,address,uint256)"
    ](
      quoteAmount.toString(),
      quoteAddress,
      baseAmount.toString(),
      baseAddress,
      0
    ).then((transferResult) => {
      console.log("en attente");
    });

    setLoading(false);
  }

  async function sellLimit(marketId, pairId, sellAmount, price) {
    setLoading(true);

    let marketContract,
      baseContract,
      quoteContract,
      baseAddress,
      quoteAddress,
      baseDecimals,
      quoteDecimals,
      baseAmount,
      quoteAmount,
      tx;

    const signer = library.getSigner();

    marketContract = new ethers.Contract(
      CHAIN_INFO[chainId].market[marketId].address,
      CHAIN_INFO[chainId].market[marketId].abi,
      signer
    );

    baseAddress =
      CHAIN_INFO[chainId].market[marketId].pairs[pairId].base.address;
    quoteAddress =
      CHAIN_INFO[chainId].market[marketId].pairs[pairId].quote.address;

    baseContract = new ethers.Contract(
      baseAddress,
      CHAIN_INFO[chainId].market[marketId].pairs[pairId].base.abi,
      signer
    );

    quoteContract = new ethers.Contract(
      quoteAddress,
      CHAIN_INFO[chainId].market[marketId].pairs[pairId].quote.abi,
      signer
    );

    baseDecimals = await baseContract.decimals();
    quoteDecimals = await quoteContract.decimals();

    baseAmount = toWeiWithDecimals(sellAmount, baseDecimals);

    let buyAmount = sellAmount * price;
    quoteAmount = toWeiWithDecimals(buyAmount, quoteDecimals);

    tx = await marketContract.functions[
      "offer(uint256,address,uint256,address,uint256)"
    ](
      baseAmount.toString(),
      baseAddress,
      quoteAmount.toString(),
      quoteAddress,
      0
    ).then((transferResult) => {
      console.log("en attente");
    });

    setLoading(false);
  }

  async function approve(marketId, pairId, place) {
    setLoading(true);

    let approveAmount =
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"; //(2^256 - 1 )

    let tokenContract, tx;

    const signer = library.getSigner();

    console.log(CHAIN_INFO[chainId].market[marketId].pairs[pairId]);

    tokenContract = new ethers.Contract(
      CHAIN_INFO[chainId].market[marketId].pairs[pairId][place].address,
      CHAIN_INFO[chainId].market[marketId].pairs[pairId][place].abi,
      signer
    );

    tx = await tokenContract
      .approve(CHAIN_INFO[chainId].market[marketId].address, approveAmount)
      .then((transferResult) => {
        console.log("en attente");
      });

    setLoading(false);
  }

  return { loading, buyLimit, sellLimit, approve };
}
