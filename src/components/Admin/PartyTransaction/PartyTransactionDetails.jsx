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

const PartyTransactionDetails = ({
  isOpen,
  onClose,
  party,
  transaction,
  startDate,
  endDate,
  loading,
}) => {
  const handleClose = () => {
    onClose();
  };

  const [debitAmount, setDebitAmount] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const balance = debitAmount - creditAmount;
  useEffect(() => {
    let debitsum = 0;
    for (let index = 0; index < transaction?.length; index++) {
      if (party?._id === transaction[index]?.debit?._id) {
        debitsum = debitsum + Number(transaction[index].balance);
        setDebitAmount(debitsum);
      }else{
      }
    }
  }, [transaction]);
  useEffect(() => {
    let creditsum = 0;
    for (let index = 0; index < transaction?.length; index++) {
      if (party?._id === transaction[index]?.credit?._id) {
        creditsum = creditsum + Number(transaction[index].balance);
        setCreditAmount(creditsum);
      }else{
      }
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
        <ModalHeader>{party?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my={'5'}>
                <Heading children={party?.name} />
                <Heading
                  children={`#${party?.address}`}
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
                        <Th>Amount</Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th isNumeric>{debitAmount ? debitAmount : '---'}</Th>
                        <Th isNumeric>{creditAmount ? creditAmount : '---'}</Th>
                      </Tr>
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
                        <Th isNumeric>{balance > 0 ? balance : '---'}</Th>
                        <Th isNumeric>{balance < 0 ? balance * -1 : '---'}</Th>
                      </Tr>
                    </Thead>
                    Parties transaction from {startDate} to {endDate}
                  </TableCaption>

                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Poster</Th>
                      <Th>Transaction With</Th>
                      <Th>Transaction Type</Th>
                      <Th>Note</Th>
                      <Th isNumeric>Debit</Th>
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
                          credit={
                            party?._id === item?.debit?._id
                              ? item?.credit
                              : item?.debit
                          }
                          debitBalance={
                            party?._id === item?.debit?._id ? item?.balance : ''
                          }
                          creditBalance={
                            party?._id === item?.credit?._id
                              ? item?.balance
                              : ''
                          }
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

export default PartyTransactionDetails;

function Row({ item, credit, debitBalance, creditBalance }) {
  return (
    <Tr>
      <Td>{new Date(item?.createdAt).toDateString()}</Td>
      <Td>
        <Image src={item.avatar.url} />
      </Td>
      <Td>{credit?.name}</Td>
      <Td>{item?.transactionType}</Td>
      <Td>{item?.description}</Td>
      <Td isNumeric>{debitBalance}</Td>
      <Td isNumeric>{creditBalance}</Td>
    </Tr>
  );
}
