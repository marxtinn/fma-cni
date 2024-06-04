import React from 'react';
import { Box, Flex, Avatar, Image, Divider, Center, Text, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SideBarOptions from "./SidebarOptions";
import { sidebarOptions } from "../../helpers/sidebarOptions";
import { HomeModernIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import Logo_ISC from "../../assets/images/Logo_Indonesia_Super_Corridor.png";

function Sidebar() {
  const name = sessionStorage.getItem("name");
  const navigate = useNavigate();
  const toast = useToast()

  const ToastMessage = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3500,
      isClosable: false
    })
  }

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/'); // Adjust the path as per your application's routing
    ToastMessage("Signed Out", `Until next time, ${name}!`, "success")
  };


  return (
    <Flex flexDir={"column"} justifyContent={"space-between"} h={"100%"} borderRadius="xl" shadow="2xl" bgColor="gray.200">
      <Box>
        {/* Mini Logo */}
        <Box display={"flex"} justifyContent={"center"} w={"100%"} alignItems={"center"} p={4} mb={4}>
          <Box>
            <Center>
              <HomeModernIcon height={36} color='#0133cc' />
              <Divider orientation='vertical' h="36px" mx={2} borderColor={"black"} />
            </Center>
          </Box>
          <Image src={Logo_ISC} w={24} style={{ objectFit: "contain" }} />
        </Box>

        {/* User Name */}
        <Box display={"flex"} flexDir="column" justifyContent={"center"} w={"100%"} alignItems={"center"}>
          <Avatar bgColor="#3182ce" size={"lg"} />
          <Text size="md" mt={2} fontWeight="semibold">{name}</Text>
        </Box>

        {/* Navigation Options */}
        {sidebarOptions.map((option, idx) => (
          <Box key={idx} mt={4} w="75%" mx="auto" shadow="base" rounded="md">
            <SideBarOptions label={option.label} icon={option.icon} url={option.url} />
          </Box>
        ))}
      </Box>

      {/* Avatar & Logout Button */}
      <Flex justify="center" my={8} w="100%" alignItems="center" flexDirection="column">
        <Button colorScheme="blue" borderRadius="md" w="75%" onClick={handleLogout}>
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Text size="lg">
              Sign Out
            </Text>
            <ArrowRightEndOnRectangleIcon width="20px" height="20px" />
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
