import React from 'react';
import Layout from '../components/global/dashboardLayout';
import { Flex, Text, Box, Icon } from '@chakra-ui/react';
import { formatDateIndo } from '../helpers/formatDate';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { ReportTableDashboard } from '../components/report/ReportTableDashboard';

function ReportListPage() {
  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="x-large">Report</Text>
        <Flex justifyContent="center" alignItems="center">
          <Icon as={CalendarDaysIcon} h="24px" w="24px" mr={2} />
          <Text fontWeight="semibold" fontSize="medium" height="inherit">{formatDateIndo()}</Text>
        </Flex>
      </Flex>
      <Box mt={10}>
        <Text mb={4} fontSize="medium" fontWeight="semibold" > Note: Disini tampilkan semua data patroli/cleaning yang statusnya sudah selesai. <br /> Perlu modifikasi table di database & edit models di backend.</Text>
        <ReportTableDashboard />
      </Box>
    </Layout>
  )
};

export default ReportListPage;