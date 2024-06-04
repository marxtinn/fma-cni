import React from "react";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import Logo from "../../assets/images/Logo_Indonesia_Super_Corridor.png";
import SupportServiceImage from "../../assets/images/Support_Service.svg";

function WelcomeSection() {
  return (
    <Box p={20} display="flex" flexDir="column" w={"100%"} alignItems={"center"} justifyContent={"center"}>
      <Stack>
        <Image
          src={Logo}
          alt="ISC Logo"
          width={200}
          style={{ objectFit: "contain" }}
          m="auto"
        />

      </Stack>
      <Image
        src={SupportServiceImage}
        alt="Support Service"
        boxSize={300}
        style={{ objectFit: "contain" }}
        w={"2xl"}
      />
      <Text fontSize="3xl" textAlign="center" fontWeight={"bold"}>
        Facility Management App
      </Text>
    </Box>
  );
}

export default WelcomeSection;
