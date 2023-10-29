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

const AccountTraModal = ({
  isOpen,
  onClose,
  type,
  transaction,
  party,
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
                        <Th isNumeric>{amount}</Th>
                      </Tr>
                    </Thead>
                    All {type}s Transaction
                  </TableCaption>

                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Poster</Th>
                      <Th>Account Name</Th>
                      <Th>Mobile</Th>
                      <Th isNumeric>Rate</Th>
                      <Th isNumeric>Delivery Date</Th>
                      <Th isNumeric>Quantity</Th>
                      <Th isNumeric>Amount</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {transaction &&
                      transaction.map(item =>
                        (item?.balance > 0)(
                          <Row
                            key={item._id}
                            item={item}
                            loading={loading}
                            credit={item?.credit}
                            debit={item?.debit}
                            party={party}
                          />
                        )
                      )}
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

export default AccountTraModal;

function Row({ item, party, credit, debit }) {
  return (
    <Tr>
      <Td>{new Date(item?.createdAt).toDateString()}</Td>
      <Td>
        <Image maxH={'10vh'} maxW={'10vh'} src={item.avatar.url} />
      </Td>
      <Td>{item?.name}</Td>
      <Td>{item?.mobile}</Td>
      <Td isNumeric>{item?.rate}</Td>
      <Td isNumeric>
        {' '}
        {party &&
          party?.map(p =>
            p?.debit === item?._id ? (
              <Tr>
                <Tr>{new Date(p?.createdAt).toDateString()}</Tr>
              </Tr>
            ) : (
              ''
            )
          )}
      </Td>
      <Td isNumeric>
        {' '}
        {party &&
          party?.map(p =>
            p?.debit === item?._id ? (
              <Tr>
                <Tr>{p?.quantity}</Tr>
              </Tr>
            ) : (
              ''
            )
          )}
      </Td>
      <Td isNumeric>{item?.balance}</Td>
    </Tr>
  );
}
