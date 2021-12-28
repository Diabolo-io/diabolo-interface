// Chakra imports
import {
  Text,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Flex,
  Image,
  Button,
} from "@chakra-ui/react";

import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { CHAIN_INFO } from "../../utils/constants";
function SwitchNetworkCard(props) {
  const { textColor, functionality, chainAvailable } = props;

  if (window.ethereum) {
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
            {functionality} is not available on this network
          </Text>
        </CardHeader>
        <CardBody px="5px" justifyContent="center" align="center">
          <Menu>
            <MenuButton>
              <Button
                fontSize="xs"
                variant="no-hover"
                px="50px"
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
              >
                Switch Networks
              </Button>
            </MenuButton>
            <MenuList borderRadius="20px" alignItems="center">
              <Flex flexDirection="column">
                {Object.keys(chainAvailable).map((id) => {
                  return (
                    <MenuItem
                      borderRadius="20px"
                      onClick={async () => {
                        try {
                          // check if the chain to connect to is installed
                          await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: "0x" + chainAvailable[id] }], // chainId must be in hexadecimal numbers
                          });
                        } catch (error) {
                          // This error code indicates that the chain has not been added to MetaMask
                          // if it is not, then install it into the user MetaMask
                          if (error.code === 4902) {
                            try {
                              await window.ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: [
                                  {
                                    chainId: "0x" + chainAvailable[id],
                                    rpcUrl:
                                      CHAIN_INFO[chainAvailable[id]].rpcUrl,
                                  },
                                ],
                              });
                            } catch (addError) {
                              console.error(addError);
                            }
                          }
                          console.error(error);
                        }
                      }}
                    >
                      <Image
                        w="18px"
                        h="18px"
                        me="10px"
                        src={CHAIN_INFO[chainAvailable[id]].logo}
                      />
                      <Text fontSize="15px">
                        {CHAIN_INFO[chainAvailable[id]].label}
                      </Text>
                    </MenuItem>
                  );
                })}
              </Flex>
            </MenuList>
          </Menu>
        </CardBody>
      </Card>
    );
  } else {
    // if no window.ethereum then MetaMask is not installed
    console.log(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
}

export default SwitchNetworkCard;
