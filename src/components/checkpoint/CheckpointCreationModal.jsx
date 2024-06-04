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

const CheckpointCreationModal = ({
  isOpen,
  onClose,
  initialRef,
  name,
  setName,
  location_id,
  setLocation_id,
  locationOptions,
  handleFormSubmit,
}) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new checkpoint</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input ref={initialRef} placeholder='Set name' onChange={(e) => setName(e.target.value)} value={name} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Location</FormLabel>
            <Select placeholder='Select location' onChange={(e) => setLocation_id(Number(e.target.value))} value={location_id}>
              {locationOptions.map(option => (
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

export default CheckpointCreationModal;
