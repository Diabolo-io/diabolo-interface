import React from "react";
import { Button, Flex, Link, Text } from "@chakra-ui/react";

import SidebarHelpImage from "../../assets/img/SidebarHelpImage.png";

import { CHAIN_INFO } from "../../utils/constants";

export function SidebarHelp(props) {
  // Pass the computed styles into the `__css` prop
  const { children, ...rest } = props;
  return (
    <Flex
      borderRadius="15px"
      flexDirection="column"
      bgImage={SidebarHelpImage}
      justifyContent="flex-start"
      alignItems="start"
      boxSize="border-box"
      p="16px"
      h="100px"
      w="100%"
    >
      <Text fontSize="sm" color="white" fontWeight="bold" mb="9px">
        Need help?
      </Text>
      <Link w="100%" href={CHAIN_INFO[1].docLink}>
        <Button
          fontSize="10px"
          fontWeight="bold"
          w="100%"
          bg="white"
          _hover="none"
          _active={{
            bg: "white",
            transform: "none",
            borderColor: "transparent",
          }}
          _focus={{
            boxShadow: "none",
          }}
          color="black"
        >
          DOCUMENTATION
        </Button>
      </Link>
    </Flex>
  );
}
