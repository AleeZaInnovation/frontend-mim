import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Input,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import cursor from '../../../assets/images/cursor.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AccountTraModal from './AccountTraDetails';
import { incomeStatement, traAccount } from '../../../redux/actions/partySlice';

const IncomeStatement = () => {
  const saleParty = useSelector(state => state?.party?.profitLoss?.saleParty);
  const incomeParty = useSelector(
    state => state?.party?.profitLoss?.incomeParty
  );
  const expenseParty = useSelector(
    state => state?.party?.profitLoss?.expenseParty
  );
  const transactions = useSelector(
    state => state?.party?.profitLoss?.transactions
  );
  const { error, message, loading } = useSelector(state => state.admin);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();
  const [saleAmount, setSaleAmount] = useState([]);
  const [incomeAmount, setIncomeAmount] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState([]);
  console.log(saleAmount);
  const profit = incomeAmount - expenseAmount;

  const profitLoss = (startDate, endDate) => {
    dispatch(
      incomeStatement({
        startDate: startDate,
        endDate: endDate,
      })
    );
    let saleSum = 0;
    for (let i = 0; i < transactions?.length; i++) {
      for (let j = 0; j < saleParty.length; j++) {
        if (saleParty[j]._id === transactions[i].debit) {
          saleSum = saleSum + Number(transactions[i].balance);
          setSaleAmount(saleSum);
        }
      }
    }
    let incomeSum = 0;
    for (let i = 0; i < transactions?.length; i++) {
      for (let j = 0; j < incomeParty.length; j++) {
        if (incomeParty[j]._id === transactions[i].debit) {
          incomeSum = incomeSum + Number(transactions[i].balance);
          setIncomeAmount(incomeSum);
        }
      }
    }
    let expenseSum = 0;
    for (let i = 0; i < transactions?.length; i++) {
      for (let j = 0; j < expenseParty.length; j++) {
        if (expenseParty[j]._id === transactions[i].debit) {
          expenseSum = expenseSum + Number(transactions[i].balance);
          setExpenseAmount(expenseSum);
        }
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Container maxW={'container.lg'} padding={'20'} boxShadow={'lg'}>
        <form>
          <Heading
            textTransform={'uppercase'}
            children="Income Statement"
            my="5"
            textAlign={['center', 'left']}
          />
          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size="lg">
              <Thead>
                <Tr>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Search</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Input
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      placeholder="From Date"
                      type={'date'}
                      focusBorderColor="purple.300"
                      required
                    />
                  </Td>
                  <Td>
                    <Input
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      placeholder="From Date"
                      type={'date'}
                      focusBorderColor="purple.300"
                      required
                    />
                  </Td>
                  <Td>
                    <Button
                      isLoading={loading}
                      w="full"
                      colorScheme={'purple'}
                      onClick={() => profitLoss(startDate, endDate)}
                    >
                      Search
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </form>
        <Box>
          <Heading
            children={'Sales'}
            fontFamily={'cursive'}
            m="8"
            textAlign={['center', 'left']}
          />
          {saleParty &&
            saleParty?.map((item, index) => {
              return (
                <Stack
                  direction={['column', 'row']}
                  my="8"
                  borderRadius={'lg'}
                  boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
                  justifyContent={['flex-start', 'space-between']}
                  p={['4', '8']}
                >
                  <Box>
                    <Heading size={'sm'} children={item?.name} />
                  </Box>
                  <Box></Box>
                  <Box></Box>
                  <Box></Box>
                  {/* {transactions &&
                    transactions?.map(p => {
                      console.log(p);

                      if (item?._id === p?.debit) {
                        return (
                          <Button
                            isLoading={loading}
                            color={'purple.600'}
                            children={p?.balance}
                          ></Button>
                        );
                        for (
                          let index = 0;
                          index < p?.balance?.length;
                          index++
                        ) {
                          const sum = 0 + p?.balance[index];
                        }
                      }
                    })} */}
                </Stack>
              );
            })}
          <Stack
            direction={['column', 'row']}
            my="8"
            borderRadius={'lg'}
            boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
            justifyContent={['flex-start', 'space-between']}
            p={['4', '8']}
          >
            <Box>
              <Heading size={'md'} children={'Total Sale'} />
            </Box>
            <Box></Box>
            <Box></Box>
            <Box></Box>
            <Button
              isLoading={loading}
              color={'purple.600'}
              children={Number(saleAmount)}
            ></Button>
          </Stack>
          <Heading
            children={'Income'}
            fontFamily={'cursive'}
            m="8"
            textAlign={['center', 'left']}
          />
          {incomeParty &&
            incomeParty?.map((item, index) => {
              return (
                <Stack
                  direction={['column', 'row']}
                  my="8"
                  borderRadius={'lg'}
                  boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
                  justifyContent={['flex-start', 'space-between']}
                  p={['4', '8']}
                >
                  <Box>
                    <Heading size={'sm'} children={item?.name} />
                  </Box>
                  <Box></Box>
                  <Box></Box>
                  <Box></Box>
                  {/* {transactions &&
                    transactions?.map(p => {
                      console.log(p);

                      if (item?._id === p?.debit) {
                        return (
                          <Button
                            isLoading={loading}
                            color={'purple.600'}
                            children={p?.balance}
                          ></Button>
                        );
                        for (
                          let index = 0;
                          index < p?.balance?.length;
                          index++
                        ) {
                          const sum = 0 + p?.balance[index];
                        }
                      }
                    })} */}
                </Stack>
              );
            })}
          <Stack
            direction={['column', 'row']}
            my="8"
            borderRadius={'lg'}
            boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
            justifyContent={['flex-start', 'space-between']}
            p={['4', '8']}
          >
            <Box>
              <Heading size={'md'} children={'Total Income'} />
            </Box>
            <Box></Box>
            <Box></Box>
            <Box></Box>
            <Button
              isLoading={loading}
              color={'purple.600'}
              children={Number(incomeAmount)}
            ></Button>
          </Stack>
          <Heading
            children={'Expense'}
            fontFamily={'cursive'}
            m="8"
            textAlign={['center', 'left']}
          />
          {expenseParty &&
            expenseParty?.map((item, index) => {
              return (
                <Stack
                  direction={['column', 'row']}
                  my="8"
                  borderRadius={'lg'}
                  boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
                  justifyContent={['flex-start', 'space-between']}
                  p={['4', '8']}
                >
                  <Box>
                    <Heading size={'sm'} children={item?.name} />
                  </Box>
                  <Box></Box>
                  <Box></Box>
                  <Box></Box>
                  {/* {transactions &&
                    transactions?.map(p => {
                      console.log(p);

                      if (item?._id === p?.debit) {
                        return (
                          <Button
                            isLoading={loading}
                            color={'purple.600'}
                            children={p?.balance}
                          ></Button>
                        );
                        for (
                          let index = 0;
                          index < p?.balance?.length;
                          index++
                        ) {
                          const sum = 0 + p?.balance[index];
                        }
                      }
                    })} */}
                </Stack>
              );
            })}
          <Stack
            direction={['column', 'row']}
            my="8"
            borderRadius={'lg'}
            boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
            justifyContent={['flex-start', 'space-between']}
            p={['4', '8']}
          >
            <Box>
              <Heading size={'md'} children={'Total Expense'} />
            </Box>
            <Box></Box>
            <Box></Box>
            <Box></Box>
            <Button
              isLoading={loading}
              color={'purple.600'}
              children={Number(expenseAmount)}
            ></Button>
          </Stack>
          <Stack
            direction={['column', 'row']}
            my="8"
            borderRadius={'lg'}
            boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
            justifyContent={['flex-start', 'space-between']}
            p={['4', '8']}
          >
            <Box>
              <Heading size={'lg'} children={'Profit or Loss'} />
            </Box>
            <Box></Box>
            <Box></Box>
            <Box></Box>
            <Button
              isLoading={loading}
              color={'purple.600'}
              children={profit ? profit : '0.00'}
            ></Button>
          </Stack>
        </Box>
      </Container>

      {/* <Sidebar /> */}
    </Grid>
  );
};

export default IncomeStatement;
