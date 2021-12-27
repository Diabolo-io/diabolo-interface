import { Button, Text } from "@chakra-ui/react";
/*todo change button for switch button with all network*/
function SwitchNetwork(props) {
  const { text, chainId, rpcUrl, ...rest } = props;
  if (window.ethereum) {
    return (
      <Text {...rest}>
        {text && <>You're connected to an unsupported network.</>}
        <Button
          bg="radial-gradient( circle at 100% 100%, transparent 9px, #7f3bd4 9px, #7f3bd4 11px, transparent 11px ), linear-gradient(to right, #7f3bd4, #fe1ae7), radial-gradient( circle at 0% 100%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to bottom, #bf31ff, #bf31ff), radial-gradient( circle at 0% 0%, transparent 9px, #fe1ae7 9px, #fe1ae7 11px, transparent 11px ), linear-gradient(to left, #fe1ae7, #7f3bd4), radial-gradient( circle at 100% 0%, transparent 9px, #7f3bd4 9px, #7f3bd4 11px, transparent 11px ), linear-gradient(to top, #7f3bd4, #7f3bd4)"
          fontSize="xs"
          variant="no-hover"
          bgSize="11px 11px, calc(100% - 22px) 2px, 11px 11px, 2px calc(100% - 22px)"
          bgRepeat="no-repeat"
          bgPosition="top left, top center, top right, center right, bottom right, bottom center, bottom left, center left"
          px="10px"
          borderRadius="0px"
          display={{
            sm: "none",
            lg: "flex",
          }}
          onClick={async () => {
            try {
              // check if the chain to connect to is installed
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x" + chainId }], // chainId must be in hexadecimal numbers
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
                        chainId: "0x" + chainId,
                        rpcUrl: rpcUrl,
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
          Switch Networks
        </Button>
      </Text>
    );
  } else {
    // if no window.ethereum then MetaMask is not installed
    /*console.log("MetaMask is not installed. Please consider installing it: https://metamask.io/download.html");*/
  }
}

export default SwitchNetwork;
