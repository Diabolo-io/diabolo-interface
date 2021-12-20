import React, { useEffect } from "react";
// Chakra imports
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import WalletModal from "../../components/WalletModal/WalletModal";
import WalletLogo from "../../assets/img/wallet/index.js";

import { URI_AVAILABLE } from "@web3-react/walletconnect-connector";

// Assets
import connectBanner from "../../assets/img/connectBanner.png";

import {
  injected,
  walletconnect,
  ledger,
  //trezor,
} from "../../utils/connectors";

const connectorsByName = {
  MetaMask: injected,
  TrustWallet: injected,
  WalletConnect: walletconnect,
  Ledger: ledger,
  //Trezor: trezor,
  Web3: injected,
};

function Connect() {
  // Chakra color mode
  const titleColor = useColorModeValue(
    "linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)",
    "linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)"
  );
  const textColor = useColorModeValue("gray.400", "white");

  // log the walletconnect URI
  useEffect(() => {
    const logURI = (uri) => {
      console.log("WalletConnect URI", uri);
    };
    walletconnect.on(URI_AVAILABLE, logURI);

    return () => {
      walletconnect.off(URI_AVAILABLE, logURI);
    };
  }, []);

  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "50%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="5px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <WalletModal
              titleColor={titleColor}
              textColor={textColor}
              WalletLogo={WalletLogo}
              connectors={connectorsByName}
            />
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            ></Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={connectBanner}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Connect;
