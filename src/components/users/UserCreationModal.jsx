import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
} from '@chakra-ui/react';

// passing props dari parent component supaya bisa dipakai di child component
const UserCreationModal = ({
  isOpen,
  onClose,
  initialRef,
  fullname,
  setFullname,
  email,
  setEmail,
  password,
  setPassword,
  phone,
  setPhone,
  position,
  setPosition,
  positionOptions,
  handleFormSubmit,
}) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new user</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input ref={initialRef} placeholder='Full name' onChange={(e) => setFullname(e.target.value)} value={fullname} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Phone</FormLabel>
            <Input placeholder='Phone' onChange={(e) => setPhone(e.target.value)} value={phone} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Position</FormLabel>
            <Select placeholder='Select position' onChange={(e) => setPosition(Number(e.target.value))} value={position}>
              {positionOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={handleFormSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserCreationModal;
