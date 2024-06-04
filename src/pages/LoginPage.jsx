import { Flex, Container } from "@chakra-ui/react";
import React from "react";
import LoginForm from "../components/login/LoginForm";
import LoginWelcomeSection from "../components/login/LoginWelcomeSection"

function Landing() {
  return (
    <Container maxW={"7xl"} h="100vh" alignContent={"center"}>
      <Flex flexDir={"row"}>
        {/* --- Welcome Section --- */}
        <Flex
          flexDir={"column"}
          w={"full"}
          minHeight={"screen"}
          justify={"center"}
        >
          <LoginWelcomeSection />
        </Flex>
        {/* --- Sign In Section ---*/}
        <LoginForm />
      </Flex>
    </Container>
  );
}

export default Landing;
