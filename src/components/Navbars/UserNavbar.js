import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import routes from "../../routes.js";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { DiaboloLogo, HomeIcon } from "../../components/Icons/Icons";
import { SidebarResponsive } from "../../components/Sidebar/Sidebar";

export default function UserNavbar(props) {

  const { logo, logoText, ...rest } = props;

  // Chakra color mode
  let navbarIcon = useColorModeValue("gray.700", "gray.200");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  let navbarBorder = useColorModeValue(
    "1.5px solid #FFFFFF",
    "1.5px solid rgba(255, 255, 255, 0.31)"
  );
  let navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  let navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  let navbarBackdrop = "blur(21px)";

  let navbarPosition = "fixed";

  var brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
      <Image w="19px" h="11px" me="5px" src={DiaboloLogo} />
      <Text fontSize="sm" mt="3px">
        {logoText}
      </Text>
    </Link>
  );
  var linksUser = (
    <HStack display={{ sm: "none", lg: "flex" }}>
      <NavLink to="/home">
        <Button
          fontSize="sm"
          ms="0px"
          me="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={<HomeIcon color={navbarIcon} w="12px" h="12px" me="0px" />}
        >
          <Text>Home</Text>
        </Button>
      </NavLink>
    </HStack>
  );
  return (
    <Flex
      position={navbarPosition}
      top="16px"
      left="50%"
      transform="translate(-50%, 0px)"
      background={navbarBg}
      border={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius="15px"
      px="16px"
      py="22px"
      mx="auto"
      width="1044px"
      maxW="90%"
      alignItems="center"
    >
      <Flex w="100%" justifyContent={{ sm: "start", lg: "space-between" }}>
        {brand}
        <Box
          ms={{ base: "auto", lg: "0px" }}
          display={{ base: "flex", lg: "none" }}
        >
          <SidebarResponsive
            logoText={props.logoText}
            routes={routes}
            // logo={logo}
            {...rest}
          />
        </Box>
        {linksUser}
        <NavLink to="/dashboard">
          <Button
            bg="radial-gradient( circle at 100% 100%, transparent 9px, #7f3bd4 9px, #7f3bd4 11px, transparent 11px ), linear-gradient(to right, #7f3bd4, #fe1ae7), radial-gradient( circle at 0% 100%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to bottom, #bf31ff, #bf31ff), radial-gradient( circle at 0% 0%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to left, #fe1ae7, #7f3bd4), radial-gradient( circle at 100% 0%, transparent 9px, #7f3bd4 9px, #7f3bd4 11px, transparent 11px ), linear-gradient(to top, #7f3bd4, #7f3bd4)"
            fontSize="xs"
            variant="no-hover"
            bgSize="11px 11px, calc(100% - 22px) 2px, 11px 11px, 2px calc(100% - 22px)"
            bgRepeat="no-repeat"
            bgPosition="top left, top center, top right, center right, bottom right, bottom center, bottom left, center left"
            px="30px"
            borderRadius="0px"
          >
            Diabolo
          </Button>
        </NavLink>
      </Flex>
    </Flex>
  );
}

UserNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
};
