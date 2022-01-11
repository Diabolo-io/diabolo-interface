import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
// Chakra imports
import {
  Box,
  Flex,
  Heading,
  Grid,
  Icon,
  Progress,
  Image,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import IconBox from "../Icons/IconBox";
import SwitchNetwork from "../SwitchNetwork/SwitchNetwork";

import { CHAIN_INFO } from "../../utils/constants";

import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";

function WalletModal(props) {
  const { titleColor, textColor, connectors, WalletLogo } = props;
  const { activate, active, connector, error, deactivate } = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();

  const [userError, setUserError] = useState();

  useEffect(() => {
    if (error) {
      setUserError(getErrorMessage(error));
      deactivate();
    }
  }, [error]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  function getErrorMessage(error) {
    if (error instanceof NoEthereumProviderError) {
      return "No wallet browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UnsupportedChainIdError) {
      return <SwitchNetwork mr="5px" text />;
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect
    ) {
      return "Please authorize this website to access your wallet.";
    } else {
      console.error(error);
      return "An unknown error occurred. Check the console for more details.";
    }
  }

  function Wallet() {
    let styleValue = 0;
    return (
      <>
        <Heading color={titleColor} fontSize="32px" mb="10px">
          Connect your wallet
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColor}
          fontWeight="bold"
          fontSize="14px"
        >
          Chose your wallet provider
        </Text>
        {userError && (
          <Alert status="error" mb="36px" borderRadius="15px" overflow>
            <AlertIcon />
            <AlertDescription color={titleColor}>{userError}</AlertDescription>
          </Alert>
        )}
        <Grid
          templateColumns={{
            sm: "1fr 1fr 1fr",
            md: "1fr 1fr 1fr",
            xl: "1fr 1fr 1fr",
          }}
          gap="25px"
        >
          {Object.keys(connectors).map((name) => {
            const currentConnector = connectors[name];
            styleValue = styleValue + 100 / Object.keys(connectors).length;
            return (
              <Card
                p="14px"
                display="flex"
                align="center"
                justify="center"
                borderRadius="10px"
                _hover={{
                  bg:
                    "radial-gradient( circle at 100% 100%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to right, #fe1ae7, #fe1ae7), radial-gradient( circle at 0% 100%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to bottom, #bf31ff, #bf31ff), radial-gradient( circle at 0% 0%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to left, #fe1ae7, #fe1ae7), radial-gradient( circle at 100% 0%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to top, #fe1ae7, #fe1ae7)",
                  bgSize:
                    "11px 11px, calc(100% - 22px) 2px, 11px 11px, 2px calc(100% - 22px)",
                  bgRepeat: "no-repeat",
                  bgPosition:
                    "top left, top center, top right, center right, bottom right, bottom center, bottom left, center left",
                }}
                _active={{
                  bg:
                    "radial-gradient( circle at 100% 100%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to right, #fe1ae7, #7f3bd5), radial-gradient( circle at 0% 100%, transparent 9px, #7f3bd5 9px, #7f3bd5 11px, transparent 11px ), linear-gradient(to bottom, #bf31ff, #bf31ff), radial-gradient( circle at 0% 0%, transparent 9px, #7f3bd5 9px, #7f3bd5 11px, transparent 11px ), linear-gradient(to left, #7f3bd5, #fe1ae7), radial-gradient( circle at 100% 0%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to top, #fe1ae7, #fe1ae7)",
                  bgSize:
                    "11px 11px, calc(100% - 22px) 2px, 11px 11px, 2px calc(100% - 22px)",
                  bgRepeat: "no-repeat",
                  bgPosition:
                    "top left, top center, top right, center right, bottom right, bottom center, bottom left, center left",
                }}
                onClick={() => {
                  setActivatingConnector(currentConnector);
                  activate(currentConnector);
                }}
                key={name}
              >
                <CardBody>
                  <Flex direction="column" align="center" w="100%" py="14px">
                    <IconBox
                      as="box"
                      h={"50px"}
                      w={"50px"}
                      bg={
                        "linear-gradient(73.05deg, #7f3bd5 0%, #fe1ae7 " +
                        styleValue +
                        "%)"
                      }
                      _hover={{
                        bg:
                          "linear-gradient(73.05deg, #fe1ae7 0%, #7f3bd5 " +
                          styleValue +
                          "%)",
                      }}
                      _active={{
                        bg:
                          "linear-gradient(73.05deg, #7f3bd5 0%, #fe1ae7 100%)",
                      }}
                    >
                      {WalletLogo[name] ? (
                        <Image
                          h={"20px"}
                          w={"20px"}
                          color="white"
                          src={WalletLogo[name]}
                        />
                      ) : (
                        <Icon
                          h={"20px"}
                          w={"20px"}
                          color="white"
                          as={FaWallet}
                        />
                      )}
                    </IconBox>
                    <Flex
                      direction="column"
                      m="14px"
                      justify="center"
                      textAlign="center"
                      align="center"
                      w="100%"
                    >
                      <Text fontSize="md" color={titleColor} fontWeight="bold">
                        {name}
                      </Text>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            );
          })}
        </Grid>
      </>
    );
  }

  return (
    <>
      {active ? (
        <>
          <Redirect to="/dashboard" />
        </>
      ) : (
        <>
          {activatingConnector ? (
            <>
              <Heading color={titleColor} fontSize="32px" mb="10px">
                Loading..
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontWeight="bold"
                fontSize="14px"
              >
                Please connect your wallet
              </Text>
              <Progress
                borderRadius="10px"
                bg="linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)"
                isIndeterminate
              />
            </>
          ) : (
            <>
              <Wallet />
            </>
          )}
        </>
      )}
    </>
  );
}

export default WalletModal;
