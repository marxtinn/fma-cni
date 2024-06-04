import React from 'react';
import {
  Box,
  Input,
} from '@chakra-ui/react';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <Box position="relative" width="300px">
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size="md"
        borderColor="gray.300"
      />
    </Box>
  );
};

export default SearchBar;
