import React, { useState, useEffect } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
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
  Alert,
  AlertIcon,
  AlertDescription,
  useColorModeValue,
} from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";

// Custom components
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import IconBox from "../../components/Icons/IconBox";

import UnavailableCard from "../../components/UnavailableCard/UnavailableCard";
import ConnectCard from "../../components/ConnectCard/ConnectCard";
import SwitchNetworkCard from "../../components/SwitchNetworkCard/SwitchNetworkCard";

// Custom icons
import {
  RocketIcon,
  WalletIcon,
  ClockIcon,
  StatsIcon,
} from "../../components/Icons/Icons.js";

import { FaWallet } from "react-icons/fa";

import { useWeb3React } from "@web3-react/core";
import { useVoteRead, useVoteWrite } from "../../utils/vote";
import { useVestingList } from "../../utils/offchain";

import { CHAIN_INFO } from "../../utils/constants";

function Vote() {
  const { active, chainId, account } = useWeb3React();

  //fetch vote
  const vote = useVoteRead();

  const { loading, voteFor } = useVoteWrite();

  //fetch off chain vesting
  const vestingList = useVestingList();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const iconTeal = useColorModeValue(
    "linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)",
    "linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)"
  );
  const iconBoxInside = useColorModeValue("white", "white");

  return active ? (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} my="26px">
      {CHAIN_INFO[chainId].vote || CHAIN_INFO[chainId].vestingList ? (
        <>
          {vote && vestingList ? (
            <Flex
              justifyContent="center"
              align="center"
              flexDirection="column"
              mt={{
                md: "5%",
                xl: "5%",
              }}
            >
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing="24px" w={{ sm: "100%", md: "80%", lg: "60%"}}>
              <Card h="95px" w="100%" mb="25px">
                <CardBody>
                  <Flex
                    flexDirection="row"
                    align="center"
                    justify="center"
                    w="100%"
                  >
                    <Stat me="auto">
                      <StatLabel
                        fontSize="sm"
                        color="gray.400"
                        fontWeight="bold"
                        pb=".1rem"
                      >
                        Voting Weight
                      </StatLabel>
                      <Flex>
                        <StatNumber fontSize="lg" color={textColor}>
                          {vestingList.amount} {vestingList.symbol}
                        </StatNumber>
                      </Flex>
                    </Stat>
                    <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                      <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                    </IconBox>
                  </Flex>
                </CardBody>
              </Card>
              <Card h="95px" w="100%" mb="25px">
                <CardBody>
                  <Flex
                    flexDirection="row"
                    align="center"
                    justify="center"
                    w="100%"
                  >
                    <Stat me="auto">
                      <StatLabel
                        fontSize="sm"
                        color="gray.400"
                        fontWeight="bold"
                        pb=".1rem"
                      >
                        Last Proposal
                      </StatLabel>
                      <Flex>
                        <StatNumber fontSize="lg" color={textColor}>
                          # {CHAIN_INFO[chainId].vote[0].proposals[0].id}
                        </StatNumber>
                      </Flex>
                    </Stat>
                    <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                      <ClockIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                    </IconBox>
                  </Flex>
                </CardBody>
              </Card>
              </SimpleGrid>
              <Card w={{ sm: "100%", md: "80%", lg: "60%"}} mb="25px">
                <CardBody>
                  <Flex
                    flexDirection="row"
                    align="center"
                    justify="center"
                    w="100%"
                  >
                    <Stat me="auto">
                      <StatLabel
                        fontSize="sm"
                        color="gray.400"
                        fontWeight="bold"
                        pb=".1rem"
                      >
                        Active Proposal
                      </StatLabel>
                      <Flex>
                        <StatNumber fontSize="lg" color={textColor}>
                          # {CHAIN_INFO[chainId].vote[0].proposals[0].id}   {CHAIN_INFO[chainId].vote[0].proposals[0].name}
                        </StatNumber>
                      </Flex>
                      <Flex mt="20px" mb="20px" align="center" justify="center">

                      <ReactApexChart
                        options={vote.options}
                        series={vote.series}
                        type="pie"
                        height={380}
                      />

                      </Flex>
                      <Tabs mt="20px" colorScheme='purple'>
                        <TabList>
                        {Object.keys(CHAIN_INFO[chainId].vote[0].proposals[0].data).map((index) => {
                          return (
                            <Tab borderRadius="25px 25px 0px 0px">
                            {CHAIN_INFO[chainId].vote[0].proposals[0].data[index].name}
                            </Tab>
                          )
                        })}
                        </TabList>
                        <TabPanels>
                        {Object.keys(CHAIN_INFO[chainId].vote[0].proposals[0].data).map((index) => {
                          return (
                            <TabPanel>
                            {Object.keys(CHAIN_INFO[chainId].vote[0].proposals[0].data[index].description).map((indexDesc) => {
                              return (
                                  <Text mb="15px">
                                    {CHAIN_INFO[chainId].vote[0].proposals[0].data[index].description[indexDesc]}
                                  </Text>
                              )
                            })}
                            {(vote[account] && vote[account].voted) && (
                              <Alert status="success" mb="36px" borderRadius="15px" overflow>
                                <AlertIcon />
                                <AlertDescription>You already have voted for the proposal: {vote[account].vote.toString()}</AlertDescription>
                              </Alert>
                            )}
                            {Object.keys(CHAIN_INFO[chainId].vote[0].proposals[0].data[index].proposal).map((indexProp) => {
                              return (
                                <Card w="100%" mb="30px"  mt="30px" border="1px solid">
                                  <CardBody>
                                    <Flex
                                      flexDirection="row"
                                      align="center"
                                      justify="center"
                                      w="100%"
                                    >
                                      <Stat me="auto" w="80%">
                                        <StatLabel
                                          fontSize="sm"
                                          color="gray.400"
                                          fontWeight="bold"
                                          pb=".1rem"
                                        >
                                          Vote #{CHAIN_INFO[chainId].vote[0].proposals[0].data[index].proposal[indexProp].id}
                                        </StatLabel>
                                        <Flex>
                                          <StatNumber fontSize="sm" color={textColor}>
                                            {CHAIN_INFO[chainId].vote[0].proposals[0].data[index].proposal[indexProp].title}
                                          </StatNumber>
                                        </Flex>
                                      </Stat>
                                      {(vote[account] && vote[account].voted) ? (
                                        <Button
                                          w="20%"
                                          fontSize="xs"
                                          variant="no-hover"
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
                                            voteFor(CHAIN_INFO[chainId].vote[0].address, CHAIN_INFO[chainId].vote[0].proposals[0].data[index].proposal[indexProp].id);
                                          }}
                                          disabled={true}
                                        >
                                          Vote {CHAIN_INFO[chainId].vote[0].proposals[0].data[index].proposal[indexProp].id}
                                        </Button>
                                      ) : (
                                        <Button
                                          w="20%"
                                          fontSize="xs"
                                          variant="no-hover"
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
                                            voteFor(CHAIN_INFO[chainId].vote[0].address, CHAIN_INFO[chainId].vote[0].proposals[0].data[index].proposal[indexProp].id);
                                          }}
                                          disabled={loading}
                                        >
                                          Vote {CHAIN_INFO[chainId].vote[0].proposals[0].data[index].proposal[indexProp].id}
                                        </Button>
                                      )}
                                    </Flex>
                                  </CardBody>
                                </Card>
                              )
                            })}
                            </TabPanel>
                          )
                        })}
                        </TabPanels>
                      </Tabs>
                    </Stat>
                  </Flex>
                </CardBody>
              </Card>
            </Flex>
          ) : vestingList === undefined ? (
            <Progress
              mt="10%"
              borderRadius="10px"
              bg="linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)"
              isIndeterminate
            />
          ) : vote === undefined ? (
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
                    You did not participate in a sale of Diabolo Token.
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
            functionality="Vote"
            chainAvailable={[1,137]}
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

export default Vote;
