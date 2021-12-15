import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import routes from "../../routes.js";
// Chakra Imports
import {
  ButtonGroup,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom Icons
import { ProfileIcon, SupportIcon, ExitIcon } from "../../components/Icons/Icons";
// Custom Components
import { SidebarResponsive } from "../../components/Sidebar/Sidebar";
import { CHAIN_INFO } from "../../utils/constants";

import { useWeb3React } from "@web3-react/core";
import { useENS } from "../../utils/ens";
import { useKYC } from "../../utils/kyc";
import { useBalances } from "../../utils/balances";
import { useEagerConnect } from "../../utils/wallet";

export default function HeaderLinks(props) {
  const { variant, children, fixed, onOpen, ...rest } = props;

  const { account, chainId, deactivate, connector } = useWeb3React();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  //fetch ens name if exist
  const { coinBalance, tokenBalance } = useBalances();

  //fetch ens name if exist
  const ens = useENS();

  //fetch kyc status
  const kyc = useKYC();

  // Chakra Color Mode
  let navbarIcon = useColorModeValue("gray.400", "gray.200");

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      {account ? (
        <ButtonGroup size="sm" isAttached me={{ sm: "2px", md: "16px" }}>
          <Button>
            <Text mt="3px">
              {parseFloat(coinBalance).toFixed(3)}{" "}
              {CHAIN_INFO[chainId].nativeCoin.name}
            </Text>
          </Button>
          <Button>
            <Text mt="3px">
              {parseFloat(tokenBalance).toFixed(1)}{" "}
              {CHAIN_INFO[chainId].mainToken.name}
            </Text>
          </Button>
          {ens ? (
            <Button>
              <Text mt="3px">{ens}</Text>
            </Button>
          ) : (
            <Button>
              <Text mt="3px">
                {account.substring(0, 6)}...
                {account.substring(account.length - 4)}
              </Text>
            </Button>
          )}

          {connector === "walletconnect" ? (
            <Button
              size="sm"
              variant="solid"
              onClick={() => {
                connector.close();
              }}
            >
              <ExitIcon />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="solid"
              onClick={() => {
                deactivate();
              }}
            >
              <ExitIcon />
            </Button>
          )}
        </ButtonGroup>
      ) : (
        <NavLink to="user/connect">
          <Button
            ms="0px"
            px="0px"
            me={{ sm: "2px", md: "16px" }}
            color={navbarIcon}
            variant="transparent-with-icon"
            rightIcon={
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            }
          >
            <Text mt="3px">Connect</Text>
          </Button>
        </NavLink>
      )}
      {kyc == false && (
        <NavLink to="/dashboard">
          <Button size="sm" colorScheme="red" color="white" variant="solid">
            <SupportIcon />
          </Button>
        </NavLink>
      )}
      <SidebarResponsive
        logoText={props.logoText}
        routes={routes}
        // logo={logo}
        {...rest}
      />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
