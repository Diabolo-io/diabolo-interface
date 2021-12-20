import React from "react";
import { NavLink } from "react-router-dom";

// Chakra imports
import { Text, Button } from "@chakra-ui/react";

import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";

function ConnectCard(props) {
  const { textColor } = props;

  return (
    <Card h="300px" w="300px">
      <CardHeader
        p="12px 5px"
        mb="45px"
        mt="45px"
        justifyContent="center"
        align="center"
      >
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          You must be logged in to access this page
        </Text>
      </CardHeader>
      <CardBody px="5px" justifyContent="center" align="center">
        <NavLink to="user/connect">
          <Button
            fontSize="xs"
            variant="no-hover"
            px="75px"
            bg="radial-gradient( circle at 100% 100%, transparent 9px, #7f3bd4 9px, #7f3bd4 11px, transparent 11px ), linear-gradient(to right, #7f3bd4, #fe1ae7), radial-gradient( circle at 0% 100%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to bottom, #bf31ff, #bf31ff), radial-gradient( circle at 0% 0%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to left, #fe1ae7, #7f3bd4), radial-gradient( circle at 100% 0%, transparent 9px, #7f3bd4 9px, #7f3bd4 11px, transparent 11px ), linear-gradient(to top, #7f3bd4, #7f3bd4)"
            bgSize="11px 11px, calc(100% - 22px) 2px, 11px 11px, 2px calc(100% - 22px)"
            bgRepeat="no-repeat"
            bgPosition="top left, top center, top right, center right, bottom right, bottom center, bottom left, center left"
            borderRadius="0px"
            _hover={{
              bg: "linear-gradient(73.05deg, #fe1ae7 0%, #7f3bd5 100%)",
              borderRadius: "11px",
            }}
          >
            Connect
          </Button>
        </NavLink>
      </CardBody>
    </Card>
  );
}

export default ConnectCard;
