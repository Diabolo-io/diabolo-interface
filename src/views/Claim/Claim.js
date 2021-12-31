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
import { useVestingRead, useVestingWrite } from "../../utils/vesting";
import { useKYC, useVestingList } from "../../utils/offchain";

import { CHAIN_INFO } from "../../utils/constants";

function Claim() {
  const { active, chainId } = useWeb3React();

  const { loading, claim, claimFor } = useVestingWrite();

  //fetch vesting
  const vesting = useVestingRead();

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
                          ).toFixed(2)}{" "}
                          {vesting["total"].symbol}
                        </Text>
                      </Text>
                    </Flex>
                  </CardHeader>
                  <Box w="100%" h={{ sm: "300px" }} ps="8px">
                    <LineChart
                      chartOptions={vesting["total"].chartOptions}
                      chartData={vesting["total"].chartData}
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
                              ).toFixed(2)}{" "}
                              {vesting["total"].symbol}
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
                                  ).toFixed(2) *
                                    100) /
                                    parseFloat(
                                      vesting["total"].totalLockedAmounts
                                    ).toFixed(2)
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
                              ).toFixed(2)}{" "}
                              {vesting["total"].symbol}
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
                                ).toFixed(2) *
                                  100) /
                                  parseFloat(
                                    vesting["total"].totalLockedAmounts
                                  ).toFixed(2)
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
                                vesting["total"].totalClaimableAmounts
                              ).toFixed(2)}{" "}
                              {vesting["total"].symbol}
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
                                  vesting["total"].totalClaimableAmounts
                                ).toFixed(2) *
                                  100) /
                                  parseFloat(
                                    vesting["total"].totalLockedAmounts
                                  ).toFixed(2)
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
                  md: "1fr",
                  xl: "1fr 1fr",
                }}
                gap="22px"
              >
                {Object.keys(vesting).map((index) => {
                  if (vesting[index].name !== "total") {
                    let claimable = parseFloat(
                      vesting[index].claimableAmounts
                    ).toFixed(2);
                    let claimed = parseFloat(
                      vesting[index].claimedAmounts
                    ).toFixed(2);
                    let locked = parseFloat(
                      vesting[index].lockedAmounts
                    ).toFixed(2);

                    let unlockbegin = new Date(
                      vesting[index].unlockBegin * 1000
                    ).toLocaleString("en-EN", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    });
                    let unlockcliff = new Date(
                      vesting[index].unlockCliff * 1000
                    ).toLocaleString("en-EN", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    });
                    let unlockend = new Date(
                      vesting[index].unlockEnd * 1000
                    ).toLocaleString("en-EN", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    });
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
                          <Flex direction="column" alignItems="center" w="100%">
                            <Flex
                              direction="row"
                              alignItems="center"
                              align="center"
                              justify="center"
                              w="100%"
                            >
                              <Card>
                                <CardBody>
                                  <Flex direction="column">
                                    <TimelineRow
                                      logo={FaAngleDown}
                                      title="Unlock begins"
                                      date={unlockbegin}
                                      color={vesting[index].color}
                                      index={0}
                                      arrLength={3}
                                    />
                                    <TimelineRow
                                      logo={FaAngleDoubleDown}
                                      title="First unlock"
                                      date={unlockcliff}
                                      color={vesting[index].color}
                                      index={1}
                                      arrLength={3}
                                    />
                                    <TimelineRow
                                      logo={FaWallet}
                                      title="Unlock end"
                                      date={unlockend}
                                      color={vesting[index].color}
                                      index={2}
                                      arrLength={3}
                                    />
                                  </Flex>
                                </CardBody>
                              </Card>
                              <Card
                                mt="-45px"
                                h="200px"
                                w="80%"
                                boxShadow="#FFF 0 0px 2px, #c800ff 0 0px 10px, #ff00ee 0 0px 20px"
                              >
                                <CardBody>
                                  <Flex
                                    flexDirection="column"
                                    align="center"
                                    justify="center"
                                    w="100%"
                                  >
                                    <Flex
                                      flexDirection="row"
                                      align="center"
                                      justify="center"
                                      w="100%"
                                      mb="20px"
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
                                          <StatNumber
                                            fontSize="lg"
                                            color={textColor}
                                          >
                                            <Flex flexDirection="column">
                                              {/*<AnimatedNumber
                                              animateToNumber={parseFloat(
                                                vesting[index]
                                                  .claimableAmounts
                                              ).toFixed(10)}
                                            />*/}
                                              <Text>
                                                {parseFloat(
                                                  vesting[index]
                                                    .claimableAmounts
                                                ).toFixed(10)}
                                              </Text>
                                            </Flex>
                                          </StatNumber>
                                        </Flex>
                                      </Stat>
                                      <IconBox
                                        as="box"
                                        h={"45px"}
                                        w={"45px"}
                                        bg={iconTeal}
                                      >
                                        <WalletIcon
                                          h={"24px"}
                                          w={"24px"}
                                          color={iconBoxInside}
                                        />
                                      </IconBox>
                                    </Flex>
                                    <Button
                                      mt="20px"
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
                                        claim(vesting[index].address);
                                      }}
                                      disabled={loading}
                                    >
                                      Claim
                                    </Button>
                                  </Flex>
                                </CardBody>
                              </Card>
                            </Flex>
                            <SimpleGrid
                              gap={{ sm: "12px" }}
                              columns={4}
                              w="100%"
                              p="5px"
                            >
                              <Flex direction="column">
                                <Flex alignItems="center">
                                  <IconBox
                                    as="box"
                                    h={"30px"}
                                    w={"30px"}
                                    bg={vesting[index].color}
                                    me="6px"
                                  >
                                    <ClockIcon
                                      h={"15px"}
                                      w={"15px"}
                                      color={iconBoxInside}
                                    />
                                  </IconBox>
                                  <Text
                                    fontSize="sm"
                                    color="gray.400"
                                    fontWeight="semibold"
                                  >
                                    Locked
                                  </Text>
                                </Flex>
                                <Text
                                  fontSize="lg"
                                  color={textColor}
                                  fontWeight="bold"
                                  mb="6px"
                                  my="6px"
                                >
                                  {locked}
                                </Text>
                              </Flex>
                              <Flex direction="column">
                                <Flex alignItems="center">
                                  <IconBox
                                    as="box"
                                    h={"30px"}
                                    w={"30px"}
                                    bg={vesting[index].color}
                                    me="6px"
                                  >
                                    <RocketIcon
                                      h={"15px"}
                                      w={"15px"}
                                      color={iconBoxInside}
                                    />
                                  </IconBox>
                                  <Text
                                    fontSize="sm"
                                    color="gray.400"
                                    fontWeight="semibold"
                                  >
                                    Claimed
                                  </Text>
                                </Flex>
                                <Text
                                  fontSize="lg"
                                  color={textColor}
                                  fontWeight="bold"
                                  mb="6px"
                                  my="6px"
                                >
                                  {claimed}
                                </Text>
                              </Flex>
                              <Flex direction="column">
                                <Flex alignItems="center">
                                  <IconBox
                                    as="box"
                                    h={"30px"}
                                    w={"30px"}
                                    bg={vesting[index].color}
                                    me="6px"
                                  >
                                    <WalletIcon
                                      h={"15px"}
                                      w={"15px"}
                                      color={iconBoxInside}
                                    />
                                  </IconBox>
                                  <Text
                                    fontSize="sm"
                                    color="gray.400"
                                    fontWeight="semibold"
                                  >
                                    Claimable
                                  </Text>
                                </Flex>
                                <Text
                                  fontSize="lg"
                                  color={textColor}
                                  fontWeight="bold"
                                  mb="6px"
                                  my="6px"
                                >
                                  {claimable}
                                </Text>
                              </Flex>
                              <Flex direction="column">
                                <Flex alignItems="center">
                                  <IconBox
                                    as="box"
                                    h={"30px"}
                                    w={"30px"}
                                    bg={vesting[index].color}
                                    me="6px"
                                  >
                                    <StatsIcon
                                      h={"15px"}
                                      w={"15px"}
                                      color={iconBoxInside}
                                    />
                                  </IconBox>
                                  <Text
                                    fontSize="sm"
                                    color="gray.400"
                                    fontWeight="semibold"
                                  >
                                    Token
                                  </Text>
                                </Flex>
                                <Text
                                  fontSize="lg"
                                  color={textColor}
                                  fontWeight="bold"
                                  mb="6px"
                                  my="6px"
                                >
                                  {vesting[index].symbol}
                                </Text>
                              </Flex>
                            </SimpleGrid>
                          </Flex>
                        </CardBody>
                      </Card>
                    );
                  }
                })}
              </Grid>
            </>
          ) : !kyc && vestingList ? (
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
              <KycCard textColor={textColor} functionality="Claim" />
            </Flex>
          ) : !kyc && vesting ? (
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
                          {parseFloat(
                            vesting["total"].totalLockedAmounts
                          ).toFixed(2)}{" "}
                          {vesting["total"].symbol}
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
          ) : vestingList && kyc && vesting == false ? (
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
              <UnavailableCard textColor={textColor} functionality="Claim" />
            </Flex>
          ) : vesting === undefined ? (
            <Progress
              mt="10%"
              borderRadius="10px"
              bg="linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)"
              isIndeterminate
            />
          ) : vestingList === undefined ? (
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
            functionality="Claim"
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
