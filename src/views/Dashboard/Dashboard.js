import React from "react";
import { NavLink } from "react-router-dom";
import QRCode from "qrcode.react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  Link,
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

import ConnectCard from "../../components/ConnectCard/ConnectCard";

// Assets
import ProfileBgImage from "../../assets/img/ProfileBackground.png";
// Custom icons
import {
  RocketIcon,
  WalletIcon,
  ClockIcon,
} from "../../components/Icons/Icons.js";

import {
  FaUserTimes,
  FaUserCheck,
  FaExternalLinkAlt,
  FaHourglassHalf,
} from "react-icons/fa";
import { useWeb3React } from "@web3-react/core";
import { useENS } from "../../utils/ens";
import { useKYC } from "../../utils/offchain";
import { useVesting } from "../../utils/vesting";

import { CHAIN_INFO } from "../../utils/constants";

function Dashboard() {
  const { account, active, chainId } = useWeb3React();

  //fetch ens name if exist
  const ens = useENS();

  //fetch kyc status
  const kyc = useKYC();

  //fetch vesting
  const vesting = useVesting();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const subAddressColor = useColorModeValue("gray.400", "gray.300");
  const iconTeal = useColorModeValue(
    "linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)",
    "linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)"
  );
  const iconBoxInside = useColorModeValue("white", "white");

  return active ? (
    <Flex direction="column">
      <Box
        mb={{ sm: "205px", md: "75px", xl: "70px" }}
        borderRadius="15px"
        px="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        <Box
          bgImage={ProfileBgImage}
          w="100%"
          h="300px"
          borderRadius="25px"
          bgPosition="50%"
          bgRepeat="no-repeat"
          position="relative"
          display="flex"
          justifyContent="center"
        >
          <Flex
            direction={{ sm: "column", md: "row" }}
            mx="1.5rem"
            maxH="330px"
            w={{ sm: "90%", xl: "95%" }}
            justifyContent={{ sm: "center", md: "space-between" }}
            align="center"
            backdropFilter="saturate(200%) blur(50px)"
            position="absolute"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            border="2px solid"
            borderColor={borderProfileColor}
            bg={bgProfile}
            p="24px"
            borderRadius="20px"
            transform={{
              sm: "translateY(45%)",
              md: "translateY(110%)",
              lg: "translateY(160%)",
            }}
          >
            <Flex
              align="center"
              mb={{ sm: "10px", md: "0px" }}
              direction={{ sm: "column", md: "row" }}
              w={{ sm: "100%" }}
              textAlign={{ sm: "center", md: "start" }}
            >
              <Flex me={{ md: "22px" }}>
                <QRCode value={account} size={80} renderAs={"svg"} />
              </Flex>
              <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
                <Link
                  href={CHAIN_INFO[chainId].explorer + "address/" + account}
                  isExternal
                >
                  <Text
                    fontSize={{ sm: "lg", lg: "xl" }}
                    color={textColor}
                    fontWeight="bold"
                    ms={{ sm: "8px", md: "0px" }}
                    _hover={{ color: "#7f3bd5" }}
                  >
                    {ens ? (
                      <>
                        {ens}
                        <Text
                          fontSize={{ sm: "sm", md: "md" }}
                          color={subAddressColor}
                          fontWeight="semibold"
                          _hover={{ color: "#7f3bd5" }}
                        >
                          {account}
                          <Icon
                            as={FaExternalLinkAlt}
                            ml="8px"
                            w={3}
                            h={3}
                            color={subAddressColor}
                          />
                        </Text>
                      </>
                    ) : account === null ? (
                      <>"-"</>
                    ) : (
                      <>
                        {account}
                        <Icon
                          as={FaExternalLinkAlt}
                          ml="10px"
                          w={4}
                          h={4}
                          color={subAddressColor}
                        />
                      </>
                    )}
                  </Text>
                </Link>
              </Flex>
            </Flex>
            <Flex
              direction={{ sm: "column", lg: "row" }}
              w={{ sm: "100%", md: "50%", lg: "auto" }}
            >
              {kyc ? (
                <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
                  <Flex
                    align="center"
                    w={{ lg: "135px" }}
                    borderRadius="15px"
                    justifyContent="center"
                    py="10px"
                    cursor="pointer"
                  >
                    <Text fontSize="xs" color="green.300" fontWeight="bold">
                      KYC : VERIFIED
                    </Text>
                    <Icon as={FaUserCheck} ml="6px" color="green.300" />
                  </Flex>
                </Button>
              ) : kyc === undefined ? (
                <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
                  <Flex
                    align="center"
                    w={{ lg: "150px" }}
                    borderRadius="15px"
                    justifyContent="center"
                    py="10px"
                    cursor="pointer"
                  >
                    <Text fontSize="xs" color="orange.300" fontWeight="bold">
                      KYC : LOADING
                    </Text>
                    <Icon as={FaHourglassHalf} ml="6px" color="orange.300" />
                  </Flex>
                </Button>
              ) : (
                <Link href={CHAIN_INFO[chainId].kycLink} isExternal>
                  <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
                    <Flex
                      align="center"
                      w={{ sm: "100%", lg: "200px" }}
                      bg="hsla(0,0%,100%,.3)"
                      borderRadius="15px"
                      justifyContent="center"
                      py="10px"
                      boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
                      border="1px solid gray.200"
                      cursor="pointer"
                    >
                      <Text fontSize="xs" color="red.600" fontWeight="bold">
                        KYC : UNVERIFIED
                      </Text>
                      <Icon as={FaUserTimes} ml="6px" color="red.600" />
                    </Flex>
                  </Button>
                </Link>
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>

      {vesting ? (
        <>
          <Flex flexDirection="column" mb="24px">
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
                      <ClockIcon h={"24px"} w={"24px"} color={iconBoxInside} />
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
                      <RocketIcon h={"24px"} w={"24px"} color={iconBoxInside} />
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
                      <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
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
                let claimed = parseFloat(vesting[index].claimedAmounts).toFixed(
                  18
                );
                let locked = parseFloat(vesting[index].lockedAmounts).toFixed(
                  18
                );

                return (
                  <Card p="16px">
                    <CardHeader p="12px 5px" mb="12px">
                      <Text fontSize="lg" color={textColor} fontWeight="bold">
                        {vesting[index].name}
                      </Text>
                    </CardHeader>
                    <CardBody px="5px">
                      <Flex direction="column">
                        <Text color={textColor}>Claimed : {claimed}</Text>
                        <Text color={textColor}>Claimable : {claimable}</Text>
                        <Text color={textColor}>Locked : {locked}</Text>
                      </Flex>
                    </CardBody>
                  </Card>
                );
              }
            })}
          </Grid>
        </>
      ) : vesting === undefined ? (
        <Progress
          borderRadius="10px"
          bg="linear-gradient(73.05deg, #7f3bd5 -2.78%, #fe1ae7 101.85%)"
          isIndeterminate
        />
      ) : (
        <Grid templateColumns={{ sm: "1fr", xl: "1fr" }} gap="22px">
          <Card p="16px">
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
            <CardBody px="5px">
              <Flex direction="column"></Flex>
            </CardBody>
          </Card>
        </Grid>
      )}
    </Flex>
  ) : (
    <Flex
      justifyContent="center"
      align="center"
      mt={{
        sm: "25%",
        xl: "10%",
      }}
    >
      <ConnectCard textColor={textColor} />
    </Flex>
  );
}

export default Dashboard;
