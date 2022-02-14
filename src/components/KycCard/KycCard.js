import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

// Chakra imports
import { Text, Button, Link } from "@chakra-ui/react";

import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";

import { CHAIN_INFO } from "../../utils/constants";

function KycCard(props) {
  const { textColor, functionality } = props;

  const { chainId } = useWeb3React();

  const loadBlockpassWidget = () => {
    const blockpass = new window.BlockpassKYCConnect(
      CHAIN_INFO[chainId].blockpassClientId,
      {
        env: "prod", // optional
        mainColor: "7f3bd5", // optional. Html color code or hex code without the #
      }
    );

    blockpass.startKYCConnect();

    blockpass.on("KYCConnectSuccess", () => {
      //add code that will trigger when data have been sent.
    });
  };

  return (
    <Card h="220px" w="300px">
      <CardHeader p="12px 5px" mb="10px" justifyContent="center" align="center">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          You must complete your identity verification (KYC) to {functionality}
        </Text>
      </CardHeader>
      <CardBody px="5px" justifyContent="center" align="center">
        <Button
          id="blockpass-kyc-connect"
          fontSize="xs"
          variant="no-hover"
          px="75px"
          bg="linear-gradient(73.05deg, #fe1ae7 0%, #7f3bd5 100%)"
          borderRadius="11px"
          _hover={{
            bg:
              "radial-gradient( circle at 100% 100%, transparent 9px, #7f3bd4 9px, #7f3bd4 11px, transparent 11px ), linear-gradient(to right, #7f3bd4, #fe1ae7), radial-gradient( circle at 0% 100%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to bottom, #bf31ff, #bf31ff), radial-gradient( circle at 0% 0%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to left, #fe1ae7, #7f3bd4), radial-gradient( circle at 100% 0%, transparent 9px, #7f3bd4 9px, #7f3bd4 11px, transparent 11px ), linear-gradient(to top, #7f3bd4, #7f3bd4)",
            bgSize:
              "11px 11px, calc(100% - 22px) 2px, 11px 11px, 2px calc(100% - 22px)",
            bgRepeat: "no-repeat",
            bgPosition:
              "top left, top center, top right, center right, bottom right, bottom center, bottom left, center left",
            borderRadius: "0px",
          }}
          onClick={() => {
            loadBlockpassWidget();
          }}
        >
          Verify
        </Button>
      </CardBody>
    </Card>
  );
}

export default KycCard;
