import React from 'react';
import Layout from '../components/global/dashboardLayout';
import PatrolTableDashboard from '../components/overview/PatrolTableDashboard';
import CleaningTableDashboard from '../components/overview/CleaningTableDashboard';
import { Flex, Text, Box, Icon } from '@chakra-ui/react';
import { formatDateIndo } from '../helpers/formatDate';
import { CalendarDaysIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

function DashboardPage() {
  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="x-large">Dashboard</Text>
        <Flex justifyContent="center" alignItems="center">
          <Icon as={CalendarDaysIcon} h="24px" w="24px" mr={2} />
          <Text fontWeight="semibold" fontSize="medium" height="inherit">{formatDateIndo()}</Text>
        </Flex>
      </Flex>

      <Box mt={10}>
        <InformationCircleIcon width={40} />
        <Text mb={4} fontSize="medium" fontWeight="semibold">Note: Disini tampilkan semua patroli & cleaning yang statusnya ongoing. <br />
          Kalau mau di improve lagi bisa pakai progress bar. Setiap kali QR checkpoint di scan, hit API, progress bar bertambah, sampai selesai. <br />
          Untuk pemakaian komponen maupun fungsi eksternal, boleh merujuk ke file: UserListPage (FE), userController & userRouter + index.js (BE)</Text>
        <PatrolTableDashboard />
      </Box>

      <Box mt={10}>
        <Text mb={4} fontSize="medium" fontWeight="semibold">Ongoing Cleaning Maintenance</Text>
        <CleaningTableDashboard />
      </Box>
    </Layout>
  )
};

export default DashboardPage;