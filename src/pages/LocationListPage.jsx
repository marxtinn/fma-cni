import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from '../components/global/dashboardLayout';
import { Flex, Text, Box, Icon, useToast, Button } from '@chakra-ui/react';
import TableTemplate from '../components/global/TableTemplate';
import Pagination from '../components/global/Pagination';
import { formatDateIndo, getDateToday } from '../helpers/formatDate';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import SearchBar from '../components/global/SearchBar';


function LocationListPage(props) {
  const token = sessionStorage.getItem("token");
  const toast = useToast();


  // Config untuk pagination
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const param = useParams();
  const navigate = useNavigate();
  const defaultPage = parseInt(params.get("page")) - 1 || 0;
  const defaultSort = params.get("sortby") || "sortbyName";
  const defaultOrder = params.get("orderby") || "ASC";
  const defaultFilter = params.get("filter") || "";

  // State untuk Pagination
  const [allLocationData, setAllLocationData] = useState([])
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(defaultPage);
  const [size] = useState(5);
  const [sortby, setSortby] = useState(defaultSort);
  const [order, setOrder] = useState(defaultOrder);
  const [filter, setFilter] = useState(defaultFilter);

  const paginate = (pageNumber) => {
    setPage(pageNumber.selected);
    params.set("page", pageNumber.selected + 1);
    navigate({ search: params.toString() })
  }

  // Data Fetching
  const fetchAllLocations = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/locations/all-locations`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log(response);
      setAllLocationData(response?.data?.data);
      setTotalData(response?.data?.datanum);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllLocations();
  }, [])

  useEffect(() => {
    fetchAllLocations();
  }, [page, sortby, order, filter, param.uuid])

  useEffect(() => {
    setAllLocationData([]);
  }, [page])


  const columns = ['No', 'Name', 'Address', 'City', 'Province', 'Country', "Zip"];

  const data = allLocationData.map((location, index) => ({
    No: page * size + index + 1,
    Name: location.name,
    Address: location.address,
    City: location.city,
    Province: location.province,
    Country: location.country,
    Zip: location.postal_code,
  }))

  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="x-large">Locations</Text>
        <Flex justifyContent="center" alignItems="center">
          <Icon as={CalendarDaysIcon} h="24px" w="24px" mr={2} />
          <Text fontWeight="semibold" fontSize="medium" height="inherit">{formatDateIndo()}</Text>
        </Flex>
      </Flex>
      <Box mt={10}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>

          <SearchBar
            placeholder="Search location"
          />
          <Button colorScheme="green"> Add Location</Button>

        </Flex>
        <Box height="550px" display="flex" flexDirection="column" justifyContent="space-between">
          <Box flex="1" overflowY="auto">
            <TableTemplate columns={columns} data={data} />
          </Box>
          <Flex justify="center" mt={4} mb={4}>
            <Pagination
              paginate={paginate}
              size={size}
              totalData={totalData}
            />
          </Flex>
        </Box>
      </Box>
    </Layout>
  )
};

export default LocationListPage;