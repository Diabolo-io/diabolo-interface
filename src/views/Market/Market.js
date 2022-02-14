import React, { useState, useEffect } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Input,
  Text,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import IconBox from "../../components/Icons/IconBox";

import LineChart from "../../components/LineChart/LineChart";

import ConnectCard from "../../components/ConnectCard/ConnectCard";
import KycCard from "../../components/KycCard/KycCard";
import UnavailableCard from "../../components/UnavailableCard/UnavailableCard";
import SwitchNetworkCard from "../../components/SwitchNetworkCard/SwitchNetworkCard";
import TimelineRow from "../../components/TimelineRow/TimelineRow";
import { AnimatedNumber } from "../../components/AnimatedNumber/AnimatedNumber";
/*todo number*/
// Custom icons
import {
  RocketIcon,
  WalletIcon,
  ClockIcon,
  StatsIcon,
} from "../../components/Icons/Icons.js";

import { FaAngleDown, FaAngleDoubleDown, FaWallet } from "react-icons/fa";

import { useWeb3React } from "@web3-react/core";
import { useMarketRead, useMarketWrite } from "../../utils/market";

import { CHAIN_INFO } from "../../utils/constants";

function Claim() {
  const { active, chainId } = useWeb3React();

  const { loading, buyLimit, sellLimit, approve } = useMarketWrite();

  //fetch market
  const { market } = useMarketRead();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const iconTeal = useColorModeValue(
    "linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)",
    "linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)"
  );
  const iconBoxInside = useColorModeValue("white", "white");

  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  return active ? (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} my="26px">
      {CHAIN_INFO[chainId].market ? (
        <>
          {market ? (
            <>
              {Object.keys(CHAIN_INFO[chainId].market).map((marketId) => {
                return (
                  <Tabs variant="soft-rounded" colorScheme="gray">
                    <TabList gap="25px" mb="30px">
                      {Object.keys(
                        CHAIN_INFO[chainId].market[marketId].pairs
                      ).map((pairId) => {
                        return (
                          <Tab>
                            {
                              CHAIN_INFO[chainId].market[marketId].pairs[pairId]
                                .base.symbol
                            }{" "}
                            /{" "}
                            {
                              CHAIN_INFO[chainId].market[marketId].pairs[pairId]
                                .quote.symbol
                            }
                          </Tab>
                        );
                      })}
                    </TabList>
                    <TabPanels>
                      {Object.keys(
                        CHAIN_INFO[chainId].market[marketId].pairs
                      ).map((pairId) => {
                        return (
                          <TabPanel>

                            <Text>Asks Size {market[marketId].pairsInfos[pairId].asksSize}</Text>
                            <Text>Bids Size {market[marketId].pairsInfos[pairId].bidsSize}</Text>
                            <Input
                              type="number"
                              placeholder="Price"
                              onChange={(event) =>
                                setPrice(event.currentTarget.value)
                              }
                            />
                            <Input
                              type="number"
                              placeholder="Amount"
                              onChange={(event) =>
                                setAmount(event.currentTarget.value)
                              }
                            />
                            {market[marketId].tokenInfos[
                              CHAIN_INFO[chainId].market[marketId].pairs[pairId]
                                .quote.address
                            ].allowance < amount ? (
                              <Button
                                onClick={() => {
                                  approve(marketId, pairId, "quote");
                                }}
                                disabled={loading}
                              >
                                APPROVE
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  buyLimit(marketId, pairId, amount, price);
                                }}
                                disabled={loading}
                              >
                                BUY LIMIT
                              </Button>
                            )}
                            {market[marketId].tokenInfos[
                              CHAIN_INFO[chainId].market[marketId].pairs[pairId]
                                .base.address
                            ].allowance < amount ? (
                              <Button
                                onClick={() => {
                                  approve(marketId, pairId, "base");
                                }}
                                disabled={loading}
                              >
                                APPROVE
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  sellLimit(marketId, pairId, amount, price);
                                }}
                                disabled={loading}
                              >
                                SELL LIMIT
                              </Button>
                            )}
                          </TabPanel>
                        );
                      })}
                    </TabPanels>
                  </Tabs>
                );
              })}
            </>
          ) : market === undefined ? (
            <Progress
              mt="10%"
              borderRadius="10px"
              bg="linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)"
              isIndeterminate
            />
          ) : (
            <Flex
              justifyContent="center"
              align="center"
              mt={{
                md: "10%",
                xl: "10%",
              }}
            >
              <Card h="80px" w="500px" p="16px">
                <CardHeader
                  p="12px 5px"
                  mb="12px"
                  justifyContent="center"
                  align="center"
                >
                  <Text fontSize="lg" color={textColor} fontWeight="bold">
                    Market is not available at the moment
                  </Text>
                </CardHeader>
              </Card>
            </Flex>
          )}
        </>
      ) : (
        <Flex
          justifyContent="center"
          align="center"
          flexDirection="column"
          mt={{
            md: "5%",
            xl: "5%",
          }}
        >
          <SwitchNetworkCard
            textColor={textColor}
            functionality="Market"
            chainAvailable={[4]}
          />
        </Flex>
      )}
    </Flex>
  ) : (
    <Flex
      justifyContent="center"
      align="center"
      mt={{
        sm: "25%",
        md: "10%",
        xl: "10%",
      }}
    >
      <ConnectCard textColor={textColor} />
    </Flex>
  );
}

export default Claim;
