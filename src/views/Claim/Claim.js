import React, { useState, useEffect } from "react";

// Chakra imports
import {
  Box,
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

// Custom icons
import {
  RocketIcon,
  WalletIcon,
  ClockIcon,
} from "../../components/Icons/Icons.js";

import { useWeb3React } from "@web3-react/core";
import { useVesting } from "../../utils/vesting";
import { useKYC, useVestingList } from "../../utils/offchain";

import { CHAIN_INFO } from "../../utils/constants";

function Claim() {
  const { active, chainId } = useWeb3React();

  //fetch vesting
  const vesting = useVesting();

  //fetch off chain vesting
  const vestingList = useVestingList();

  //fetch kyc status
  const kyc = useKYC();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const iconTeal = useColorModeValue(
    "linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)",
    "linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)"
  );
  const iconBoxInside = useColorModeValue("white", "white");

/*todo recovery data on vesting*/
  const chartOptions = {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    colors: ["#7f3bd5", "#fe1ae7"],
  };

  const chartData = [
    {
      name: "Mobile apps",
      data: [10, 20, 30, 40, 50, 60, 70, 0, 0],
    },
    {
      name: "Websites",
      data: [5, 10, 15, 20, 25, 30, 35, 40, 45],
    },
  ];

  return active ? (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} my="26px">
      {CHAIN_INFO[chainId].vesting ? (
        <>
          {vesting && kyc ? (
            <>
              <Flex flexDirection="column" mb="24px">
                <Card p="28px 10px 16px 0px" mb="26px">
                  <CardHeader mb="20px" pl="22px">
                    <Flex direction="column" alignSelf="flex-start">
                      <Text
                        fontSize="lg"
                        color={textColor}
                        fontWeight="bold"
                        mb="6px"
                      >
                        Vesting Overview
                      </Text>
                      <Text fontSize="md" fontWeight="medium" color="gray.400">
                        <Text as="span" color="green.400" fontWeight="bold">
                          {parseFloat(
                            vesting["total"].totalLockedAmounts
                          ).toFixed(3)}{" "}
                          DCASH
                        </Text>
                      </Text>
                    </Flex>
                  </CardHeader>
                  <Box w="100%" h={{ sm: "300px" }} ps="8px">
                    <LineChart
                      chartOptions={chartOptions}
                      chartData={chartData}
                    />
                  </Box>
                </Card>
                <SimpleGrid columns={{ sm: 1, md: 3, xl: 3 }} spacing="24px">
                  <Card minH="83px">
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
                            Locked
                          </StatLabel>
                          <Flex>
                            <StatNumber fontSize="lg" color={textColor}>
                              {parseFloat(
                                vesting["total"].totalLockedAmounts
                              ).toFixed(3)}{" "}
                              DCASH
                            </StatNumber>
                            <StatHelpText
                              alignSelf="flex-end"
                              justifySelf="flex-end"
                              m="0px"
                              color="green.400"
                              fontWeight="bold"
                              ps="3px"
                              fontSize="md"
                            >
                              ≈
                              {parseFloat(
                                100 -
                                  (parseFloat(
                                    vesting["total"].totalClaimedAmounts
                                  ).toFixed(3) *
                                    100) /
                                    parseFloat(
                                      vesting["total"].totalLockedAmounts
                                    ).toFixed(3)
                              ).toFixed(0)}
                              %
                            </StatHelpText>
                          </Flex>
                        </Stat>
                        <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                          <ClockIcon
                            h={"24px"}
                            w={"24px"}
                            color={iconBoxInside}
                          />
                        </IconBox>
                      </Flex>
                    </CardBody>
                  </Card>
                  <Card minH="83px">
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
                            Unlocked
                          </StatLabel>
                          <Flex>
                            <StatNumber fontSize="lg" color={textColor}>
                              {parseFloat(
                                vesting["total"].totalClaimedAmounts
                              ).toFixed(3)}{" "}
                              DCASH
                            </StatNumber>
                            <StatHelpText
                              alignSelf="flex-end"
                              justifySelf="flex-end"
                              m="0px"
                              color="green.400"
                              fontWeight="bold"
                              ps="3px"
                              fontSize="md"
                            >
                              ≈
                              {parseFloat(
                                (parseFloat(
                                  vesting["total"].totalClaimedAmounts
                                ).toFixed(3) *
                                  100) /
                                  parseFloat(
                                    vesting["total"].totalLockedAmounts
                                  ).toFixed(3)
                              ).toFixed(0)}
                              %
                            </StatHelpText>
                          </Flex>
                        </Stat>
                        <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                          <RocketIcon
                            h={"24px"}
                            w={"24px"}
                            color={iconBoxInside}
                          />
                        </IconBox>
                      </Flex>
                    </CardBody>
                  </Card>

                  <Card minH="83px">
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
                            Claimable
                          </StatLabel>
                          <Flex>
                            <StatNumber fontSize="lg" color={textColor}>
                              {parseFloat(
                                vesting["total"].totalClaimableBalance
                              ).toFixed(3)}{" "}
                              DCASH
                            </StatNumber>
                            <StatHelpText
                              alignSelf="flex-end"
                              justifySelf="flex-end"
                              m="0px"
                              color="green.400"
                              fontWeight="bold"
                              ps="3px"
                              fontSize="md"
                            >
                              ≈
                              {parseFloat(
                                (parseFloat(
                                  vesting["total"].totalClaimableBalance
                                ).toFixed(3) *
                                  100) /
                                  parseFloat(
                                    vesting["total"].totalLockedAmounts
                                  ).toFixed(3)
                              ).toFixed(0)}
                              %
                            </StatHelpText>
                          </Flex>
                        </Stat>
                        <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                          <WalletIcon
                            h={"24px"}
                            w={"24px"}
                            color={iconBoxInside}
                          />
                        </IconBox>
                      </Flex>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </Flex>
              <Grid
                templateColumns={{
                  sm: "1fr",
                  md: "repeat(" + (Object.keys(vesting).length - 2) + ", 1fr)",
                  xl: "repeat(" + (Object.keys(vesting).length - 1) + ", 1fr)",
                }}
                gap="22px"
              >
                {Object.keys(vesting).map((index) => {
                  if (vesting[index].name !== "total") {
                    let claimable = parseFloat(
                      vesting[index].claimableBalance
                    ).toFixed(18);
                    let claimed = parseFloat(
                      vesting[index].claimedAmounts
                    ).toFixed(18);
                    let locked = parseFloat(
                      vesting[index].lockedAmounts
                    ).toFixed(18);

                    return (
                      <Card p="16px">
                        <CardHeader p="12px 5px" mb="12px">
                          <Text
                            fontSize="lg"
                            color={textColor}
                            fontWeight="bold"
                          >
                            {vesting[index].name}
                          </Text>
                        </CardHeader>
                        <CardBody px="5px">
                          <Flex direction="column">
                            <Text color={textColor}>Claimed : {claimed}</Text>
                            <Text color={textColor}>
                              Claimable : {claimable}
                            </Text>
                            <Text color={textColor}>Locked : {locked}</Text>
                          </Flex>
                        </CardBody>
                      </Card>
                    );
                  }
                })}
              </Grid>
            </>
          ) : (!kyc && vesting) || (!kyc && vestingList) ? (
            <Flex
              justifyContent="center"
              align="center"
              flexDirection="column"
              mt={{
                md: "5%",
                xl: "5%",
              }}
            >
              <Card h="95px" w="300px" mb="25px">
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
                        Investement Overview
                      </StatLabel>
                      <Flex>
                        <StatNumber fontSize="lg" color={textColor}>
                          {vestingList.amount} DCASH
                        </StatNumber>
                      </Flex>
                    </Stat>
                    <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                      <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                    </IconBox>
                  </Flex>
                </CardBody>
              </Card>
              <KycCard textColor={textColor} functionality="Claim" />
            </Flex>
          ) : vesting === undefined ? (
            <Progress
              borderRadius="10px"
              bg="linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)"
              isIndeterminate
            />
          ) : vestingList === undefined ? (
            <Progress
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
        {/*todo bad network*/}
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
