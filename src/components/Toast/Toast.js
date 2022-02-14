import React from "react";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
// Chakra imports

import { Flex, Text, Stat, StatLabel } from "@chakra-ui/react";

function Toast(props) {
  return (
    <Flex m="10px" borderRadius="11px">
      <Card
        h="85px"
        w="300px"
        borderRadius="11px"
        bg={props.bg}
        boxShadow="#FFF 0 0px 2px, #c800ff 0 0px 10px, #ff00ee 0 0px 20px"
      >
        <CardBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="xs"
                color={props.titleColor}
                fontWeight="bold"
                pb=".1rem"
              >
                {props.title}
              </StatLabel>
              <Text
                fontSize="xs"
                fontWeight="bold"
                mb="6px"
                color={props.color}
              >
                {props.description}
              </Text>
            </Stat>
            {props.item}
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}
export default Toast;
