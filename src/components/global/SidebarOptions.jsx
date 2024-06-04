import React from "react";
import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const SidebarOptions = ({ label, icon, url }) => {
  return (
    <ChakraLink as={ReactRouterLink} to={url} _hover={"unstyled"}>
      <Box
        p={2}
        cursor="pointer"
        _hover={{ bgColor: "#3181ce", textColor: "white" }}
        borderRadius="md"
        textColor="#0133cc"
      >
        <Flex align="center">
          {icon && <Icon as={icon} justifyContent={"center"} mx="2" />}
          <Text fontSize={"md"}>{label}</Text>
        </Flex>
      </Box>
    </ChakraLink>
  );
}

export default SidebarOptions;
