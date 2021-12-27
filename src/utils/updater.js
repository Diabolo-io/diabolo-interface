import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

export function useUpdater() {
  const { library, chainId } = useWeb3React();
  const [updater, setUpdater] = useState();

  useEffect(() => {
    if (library) {
      let stale = false;
      library
        .getBlockNumber()
        .then((blockNumber) => {
          if (!stale) {
            setUpdater(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setUpdater(null);
          }
        });

      const updateBlockNumber = (blockNumber) => {
        setUpdater(blockNumber);
      };
      library.on("block", updateBlockNumber);

      return () => {
        library.removeListener("block", updateBlockNumber);
        stale = true;
        setUpdater(undefined);
      };
    }
  }, [library, chainId]);

  return updater;
}
