import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';

const TypeTraModel = ({
  isOpen,
  onClose,
  type,
  transaction,
  startDate,
  endDate,
  loading,
}) => {
  const handleClose = () => {
    onClose();
  };

  const [amount, setAmount] = useState('');
  const [count, setCount] = useState('');
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < transaction?.length; index++) {
      sum = sum + Number(transaction[index].balance);
      setAmount(sum);
    }
  }, [transaction]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < transaction?.length; index++) {
      sum = sum + Number(transaction[index].quantity);
      setCount(sum);
    }
  }, [transaction]);

  return (
    <Modal
      isOpen={isOpen}
      size="full"
      onClose={handleClose}
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my={'5'}>
                <Heading children={type} />
                <Heading
                  children={`#${type}s Wise Report`}
                  
                  size={'sm'}
                  opacity={0.4}
                />
              </Box>
              <Heading children={'Transaction'} size={'lg'} />
              <TableContainer w={['100vw', 'full']}>
                <Table variant={'simple'} size="lg">
                  <TableCaption>
                    <Thead>
                      <Tr>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th>Balance</Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th isNumeric>{(count>0)?(count):""}</Th>
                        <Th isNumeric>{(amount)}</Th>
                      </Tr>
                    </Thead>
                    All {type}s Transaction From {startDate} to {endDate}
                  </TableCaption>

                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Poster</Th>
                      <Th>Debit Party</Th>
                      <Th>Credit Party</Th>
                      <Th>Note</Th>
                      <Th isNumeric>Quantity</Th>
                      <Th isNumeric>Credit</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {transaction &&
                      transaction.map(item => (
                        <Row
                          key={item._id}
                          item={item}
                          loading={loading}
                          credit={item?.credit}
                          debit={item?.debit}
                        />
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box></Box>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TypeTraModel;

function Row({ item, credit, debit }) {
  return (
    <Tr>
      <Td>{new Date(item?.createdAt).toDateString()}</Td>
      <Td>
        <Image src={item.avatar.url} />
      </Td>
      <Td>{debit?.name}</Td>
      <Td>{credit?.name}</Td>
      <Td isNumeric>{item?.description}</Td>
      <Td isNumeric>{item?.quantity}</Td>
      <Td isNumeric>{item?.balance}</Td>
    </Tr>
  );
}
