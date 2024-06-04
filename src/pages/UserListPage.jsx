import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/global/dashboardLayout';
import axios from 'axios';
import {
  Flex,
  Text,
  Box,
  Icon,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDateIndo, getDateToday } from '../helpers/formatDate';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import TableTemplate from '../components/global/TableTemplate';
import Pagination from "../components/global/Pagination";
import Loading from "../components/global/Loading";
import SearchBar from '../components/global/SearchBar';
import UserCreationModal from '../components/users/UserCreationModal';
import ConfirmDeleteModal from '../components/global/ConfirmDeleteModal'; // Import the confirmation modal

function UserListPage(props) {
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
  const [userToDelete, setUserToDelete] = useState(null);

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
  const [allUsersData, setAllUsersData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(defaultPage);
  const [size] = useState(5);
  const [sortby, setSortby] = useState(defaultSort);
  const [order, setOrder] = useState(defaultOrder);
  const [filter, setFilter] = useState(defaultFilter);

  // State for search suggestions
  const [suggestions, setSuggestions] = useState([]);

  // State untuk Form
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState(Number(""));
  const [allPositions, setAllPositions] = useState([]);
  const [uuid, setUuid] = useState("")

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch Semua Posisi
  const fetchAllPositionOptions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/positions/allpositions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setAllPositions(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Semua User
  const fetchUserList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/list?page=${page}&size=${size}&sortby=${sortby}&order=${order}&name=${filter}&uuid=${param.uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAllUsersData(response?.data?.data);
      setTotalData(response?.data?.datanum);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch All Position Options on Component Mount
  useEffect(() => {
    fetchAllPositionOptions();
  }, []);

  // Fetch User List on Pagination Change
  useEffect(() => {
    fetchUserList();
  }, [page, sortby, order, filter, param.uuid]);

  // Clear old data when page changes
  useEffect(() => {
    setAllUsersData([]);
  }, [page]);

  // Print opsi untuk select
  const positionOptions = allPositions.map((val, idx) => {
    return { value: val.value, label: val.label };
  });

  // Pagination
  const paginate = (pageNumber) => {
    setPage(pageNumber.selected);
    params.set("page", pageNumber.selected + 1);
    navigate({ search: params.toString() });
  };

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

  // Handle Edit Click
  const handleEditClick = (user) => {
    setEditMode(true);
    setEditingUser(user);
    setFullname(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setPosition(user.position_id);
    setUuid(user.uuid);
    onOpen();
  };

  // Submit data
  const handleFormSubmit = async () => {
    try {
      if (!fullname || !email || !password || !phone || !position) {
        ToastMessage("Error", "Please fill all the fields.", "error");
      } else {
        const requestData = {
          name: fullname,
          email: email,
          password: password,
          phone: phone,
          join_date: getDateToday(),
          position_id: position,
        };

        let response;
        if (editMode && editingUser) {
          // Edit existing user
          response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/user/edit`, {
            uuid: uuid,
            name: fullname,
            email: email,
            password: password,
            phone: phone,
            position_id: position,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
        } else {
          // Create new user
          response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/register`, requestData, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
        }

        if (response.data.success) {
          ToastMessage("Successful", editMode ? "User updated successfully." : "New user created.", "success");
          fetchUserList(); // Refresh user list after creation/update
        } else {
          ToastMessage("Error", editMode ? "Failed to update user." : "Failed to create user.", "error");
        }
      }
    } catch (error) {
      console.log(error);
      ToastMessage("Error", error.message, "error");
    } finally {
      setFullname("");
      setEmail("");
      setPassword("");
      setPhone("");
      setPosition(Number(""));
      setEditMode(false);
      setEditingUser(null);
      onClose();
    }
  };

  // Block user
  const editUserIsBlocked = async (uuid) => {
    try {
      const update = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/block`,
        { uuid },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchAllPositionOptions();
      fetchUserList();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete user
  const handleDeleteClick = (uuid) => {
    setUserToDelete(uuid);
    onDeleteModalOpen();
  };

  // Confrim Delete
  const confirmDeleteUser = async () => {
    try {
      const deleteByUuid = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/user/delete/${userToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchAllPositionOptions();
      fetchUserList();
      ToastMessage("Successful", "User deleted successfully.", "success");
    } catch (error) {
      console.log(error);
      ToastMessage("Error", "Failed to delete user.", "error");
    } finally {
      setUserToDelete(null);
      onDeleteModalClose();
    }
  };

  // Fetch Suggestions for Search Bar
  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/list?name=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuggestions(response.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Search Change with Debouncing
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setFilter(query); // Update local state for instant UI feedback
    debouncedFetchSuggestions(query); // Debounced API call
  };

  // Debounce function to limit the rate of API calls
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 1000);

  // Print Table User
  const columns = [
    "No",
    "Name",
    "Position",
    "Email",
    "Phone",
    "Controls",
    "Status",
  ];

  const data = allUsersData.map((user, index) => ({
    No: page * size + index + 1,
    Name: user.name,
    Position: user.position?.name,
    Email: user.email,
    Phone: user.phone,
    Controls: user,
    Status: user.is_blocked,
    uuid: user.uuid
  }));


  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="x-large">Users</Text>
        <Flex justifyContent="center" alignItems="center">
          <Icon as={CalendarDaysIcon} h="24px" w="24px" mr={2} />
          <Text fontWeight="semibold" fontSize="medium" height="inherit">{formatDateIndo()}</Text>
        </Flex>
      </Flex>
      <Box mt={10}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>

          <SearchBar value={filter}
            onChange={handleSearchChange}
            placeholder="Search user"
            suggestions={suggestions} />
          <Button onClick={() => { setEditMode(false); onOpen(); }} colorScheme="green" size="md">Add User</Button>

          {/*------------ Create User Modal ------------*/}
          <UserCreationModal
            isOpen={isOpen}
            onClose={onClose}
            initialRef={initialRef}
            fullname={fullname}
            setFullname={setFullname}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            phone={phone}
            setPhone={setPhone}
            position={position}
            setPosition={setPosition}
            positionOptions={positionOptions}
            handleFormSubmit={handleFormSubmit}
            isEditMode={editMode}
          />
        </Flex>

        {/*------------ User Table Data ------------*/}
        <Box height="550px" display="flex" flexDirection="column" justifyContent="space-between">
          <Box flex="1" overflowY="auto">

            <TableTemplate columns={columns} data={data} handleEditClick={handleEditClick} editUserIsBlocked={editUserIsBlocked} handleDeleteClick={handleDeleteClick} dataType="user" />
          </Box>
          <Flex justify="center" mt={4} mb={4}>
            <Pagination
              paginate={paginate}
              size={size}
              totalData={totalData}
            />
          </Flex>
        </Box>

        {/*------------ Confirm Delete Modal ------------*/}
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          onConfirm={confirmDeleteUser}
        />

      </Box>
    </Layout>
  );
};

export default UserListPage;
