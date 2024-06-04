import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from '../components/global/dashboardLayout';
import { Flex, Text, Box, Icon, useToast, Button, useDisclosure } from '@chakra-ui/react';
import TableTemplate from '../components/global/TableTemplate';
import Pagination from '../components/global/Pagination';
import { formatDateIndo, formatTimestamp } from '../helpers/formatDate';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import SearchBar from '../components/global/SearchBar';
import CheckpointCreationModal from '../components/checkpoint/CheckpointCreationModal';
import ConfirmDeleteModal from '../components/global/ConfirmDeleteModal';

function CheckpointListPage() {
  const token = sessionStorage.getItem("token");
  const toast = useToast();

  // Untuk buka/tutup modal
  const initialRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State for delete confirmation modal
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose
  } = useDisclosure();
  const [checkPointToDelete, setCheckpointToDelete] = useState(null)

  // Toast
  const ToastMessage = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 2000,
      isClosable: false,
    });
  };

  // Config untuk pagination
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const param = useParams();
  const navigate = useNavigate();
  const defaultPage = parseInt(params.get("page")) - 1 || 0;
  const defaultSort = params.get("sortby") || "name";
  const defaultOrder = params.get("orderby") || "ASC";
  const defaultFilter = params.get("filter") || "";

  // State untuk Pagination
  const [allCheckpointData, setAllCheckpointData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(defaultPage);
  const [size] = useState(4);
  const [sortby, setSortby] = useState(defaultSort);
  const [order, setOrder] = useState(defaultOrder);
  const [filter, setFilter] = useState(defaultFilter);

  const paginate = (pageNumber) => {
    setPage(pageNumber.selected);
    params.set("page", pageNumber.selected + 1);
    navigate({ search: params.toString() });
  };

  // State untuk Form
  const [name, setName] = useState("");
  const [location_id, setLocation_id] = useState(Number(""))
  const [allLocationData, setAllLocationData] = useState([])
  const [uuid, setUuid] = useState("")

  const [editMode, setEditMode] = useState(false);
  const [editingCheckpoint, setEditingCheckpoint] = useState(null);

  // Data Fetching
  const fetchAllLocationOptions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/locations/location-options`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setAllLocationData(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCheckpoints = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/checkpoints/all-checkpoints`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          size,
          sortby,
          order,
          filter,
        },
      });
      setAllCheckpointData(response.data.data);
      setTotalData(response.data.datanum);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Edit Click
  const handleEditClick = (checkpoint) => {
    setEditMode(true);
    setEditingCheckpoint(checkpoint);
    setName(checkpoint.name);
    setLocation_id(checkpoint.location_id)
    setUuid(checkpoint.uuid);
    onOpen();
  }

  // Submit data
  const handleFormSubmit = async () => {
    try {
      if (!name || !location_id) {
        ToastMessage("Error", "Please fill all the fields.", "error");
      } else {
        const requestData = {
          name: name,
          location_id: location_id
        };

        let response;
        if (editMode && editingCheckpoint) {
          // Edit existing user
          response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/checkpoints/edit`, {
            uuid: uuid,
            name: name,
            location_id: location_id,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
        } else {
          // Create new user
          response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/checkpoints/create`, requestData, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
        }

        if (response.data.success) {
          ToastMessage("Successful", editMode ? "Checkpoint updated successfully." : "New checkpoint created.", "success");
          fetchAllCheckpoints(); // Refresh user list after creation/update
        } else {
          ToastMessage("Error", editMode ? "Failed to update user." : "Failed to create user.", "error");
        }
      }
    } catch (error) {
      console.log(error);
      ToastMessage("Error", error.message, "error");
    } finally {
      setName("");
      setLocation_id("");
      setEditMode(false);
      setEditingCheckpoint(null);
      onClose();
    }
  };

  //  Delete Checkpoint
  const handleDeleteClick = (uuid) => {
    setCheckpointToDelete(uuid);
    onDeleteModalOpen();
  }

  const confirmDeleteCheckpoint = async () => {
    try {
      console.log(checkPointToDelete);
      const deleteByUuid = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/checkpoints/delete/${checkPointToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchAllLocationOptions();
      fetchAllCheckpoints();
      ToastMessage("Successful", "Checkpoint deleted successfully.", "success");
    } catch (error) {
      console.log(error);
      ToastMessage("Error", "Failed to delete checkpoint.", "error")
    } finally {
      setCheckpointToDelete(null);
      onDeleteModalClose();
    }
  }


  useEffect(() => {
    fetchAllLocationOptions();
  }, [])

  useEffect(() => {
    fetchAllCheckpoints();
  }, [page, sortby, order, filter, param.uuid]);

  const locationOptions = allLocationData.map((val, idx) => {
    return { value: val.value, label: val.label }
  })

  const columns = ['No', 'Name', 'QR', 'Location', 'Created', 'Controls', 'Status'];

  const data = allCheckpointData.map((checkpoint, index) => ({
    No: page * size + index + 1,
    Name: checkpoint.name,
    QR: checkpoint.uuid,
    Location: checkpoint.location?.name,
    Created: formatTimestamp(checkpoint.createdAt),
    Controls: checkpoint,
    Status: checkpoint.is_active,
    uuid: checkpoint.uuid
  }));

  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="x-large">Checkpoints</Text>
        <Flex justifyContent="center" alignItems="center">
          <Icon as={CalendarDaysIcon} h="24px" w="24px" mr={2} />
          <Text fontWeight="semibold" fontSize="medium" height="inherit">{formatDateIndo()}</Text>
        </Flex>
      </Flex>
      <Box mt={10}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <SearchBar
            placeholder="Search checkpoint"
          />
          <Button onClick={() => { setEditMode(false); onOpen(); }} colorScheme="green" size="md"> Add Checkpoint</Button>

          {/*------------ Create User Modal ------------*/}
          <CheckpointCreationModal
            isOpen={isOpen}
            onClose={onClose}
            initialRef={initialRef}
            name={name}
            setName={setName}
            location_id={location_id}
            setLocation_id={setLocation_id}
            locationOptions={locationOptions}
            handleFormSubmit={handleFormSubmit}
          />
        </Flex>

        {/*------------ User Table Data ------------*/}
        <Box height="550px" display="flex" flexDirection="column" justifyContent="space-between">
          <Box flex="1" overflowY="auto">
            <TableTemplate columns={columns} data={data} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} dataType="checkPoint" />
          </Box>
          <Flex justify="center" mt={4} mb={4}>
            <Pagination paginate={paginate} size={size} totalData={totalData} />
          </Flex>
        </Box>

        {/*------------ Confirm Delete Modal ------------*/}
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          onConfirm={confirmDeleteCheckpoint}
        />
      </Box>
    </Layout>
  );
}

export default CheckpointListPage;
