import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Switch, Image as ChakraImage, Tooltip } from '@chakra-ui/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import DefaultUserImage from "../../assets/images/defaultUserPic.jpg";
import { QRCodeCanvas } from 'qrcode.react';

const TableTemplate = ({ columns, data, handleEditClick, editUserIsBlocked, handleDeleteClick, dataType }) => {


  // Set max lebar kolom table sesuai dengan nama kolomnya.
  const columnWidths = {
    No: '50px',
    Name: '200px',
    Position: '150px',
    Email: '200px',
    Phone: '150px',
    Status: '100px',
    Controls: '150px',
    QR: '64px',
  };

  return (
    <Table variant="striped" colorScheme='blue'>
      {/* Map setiap kolom */}
      <Thead>
        <Tr>
          {columns.map((column) => (
            <Th key={column} textAlign="center" width={columnWidths[column]} minWidth={columnWidths[column]}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      {/* Map setiap baris */}
      <Tbody fontSize="small">
        {data.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <Td key={colIndex} textAlign="center">
                {column === 'Image' ? (
                  <ChakraImage
                    boxSize="50px"
                    objectFit="contain"
                    src={DefaultUserImage}
                    alt={`${row.Name}'s profile picture`}
                    borderRadius="full"
                    mx="auto"
                  />
                ) : column === 'Status' ? (
                  <Switch
                    size="lg"
                    colorScheme='green'
                    defaultChecked={dataType === 'user' ? !row[column] : row[column]}
                    onChange={() => editUserIsBlocked(row.uuid)} />
                ) : column === 'QR' ? (
                  <QRCodeCanvas value={row[column]} size={64} />
                ) : column !== 'Controls' ? (
                  row[column]
                ) : (
                  <Box display="flex" justifyContent="space-evenly" gap={2} alignItems="center" width="full">
                    <Tooltip label="Edit" closeDelay={0}>
                      <Button colorScheme="blue" size="sm" onClick={() => handleEditClick(row.Controls)}>
                        <PencilSquareIcon height={16} width={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip label="Delete" closeDelay={0}>
                      <Button colorScheme="red" size="sm" onClick={() => handleDeleteClick(row.uuid)}>
                        <TrashIcon height={16} width={16} />
                      </Button>
                    </Tooltip>
                  </Box>
                )}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableTemplate;
