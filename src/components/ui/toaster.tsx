"use client"

import {
  Toaster as ChakraToaster,
  Flex,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react"

export const toaster = createToaster({
  placement: "bottom",
  max: 3,
  pauseOnPageIdle: true,
  duration: 3000,
  offsets: { left: "20px", top: "20px", right: "20px", bottom: "20px" },
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }}>
            <Flex align="center" flex="1" p={2}>
              {toast.type === "loading" ? (
                <Spinner size="sm" color="blue.solid" mr={3} />
              ) : (
                <Toast.Indicator boxSize="6" mr={3} />
              )}
              <Stack gap="1" maxWidth="100%">
                {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                {toast.description && (
                  <Toast.Description>{toast.description}</Toast.Description>
                )}
              </Stack>
            </Flex>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
