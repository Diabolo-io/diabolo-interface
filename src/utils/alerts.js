import { useToast } from "@chakra-ui/react";

import Toast from "../Toast/Toast";

export function useAlerts() {
  const toast = useToast();

  toast({
    position: "bottom-left",
    render: () => (
      <Toast
        title="Connected"
        description="successfully connected wallet"
        item={
          <Button
            onClick={() => {
              toast.closeAll();
            }}
            type="button"
          >
            X
          </Button>
        }
        titleColor="gray.400"
        color="white"
        bg="gray.700"
      />
    ),
    duration: 5000,
  });
}
