import {
  Button,
  Container,
  Grid,
  Heading,
  Input,
  Select,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import cursor from '../../../assets/images/cursor.png';
import { newTransaction } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import TypeTraModel from './TypeTraDetails';
import {
  traType,
} from '../../../redux/actions/partySlice';

const TypeWiseTra = () => {
  const transaction = useSelector(
    state => state?.party?.typeTra?.transactions
  );
  const { error, message, loading } = useSelector(state => state.admin);
  const transactionTypes = ['Sale', 'Sale Return', 'Receive', 'Payment'];
  const [startDate, setStartDate] = useState('');
  const [debit, setDebitAccount] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('debit', debit);
    myForm.append('startDate', startDate);
    myForm.append('endDate', endDate);
    dispatch(newTransaction(myForm)).then(() => {
      setDebitAccount('');
    });
  };
  const typeTraDetails = (transactionType, startDate, endDate) => {
    dispatch(
      traType({
        type: transactionType,
        startDate: startDate,
        endDate: endDate,
      })
    );
    onOpen();
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
      <Container py="16">
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={'uppercase'}
            children="Transaction Type"
            my="16"
            textAlign={['center', 'left']}
          />

          <VStack m="auto" spacing={'8'}>
            <p>From</p>
            <Input
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              placeholder="From Date"
              type={'date'}
              focusBorderColor="purple.300"
            />
            <p>To</p>
            <Input
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              placeholder="From Date"
              type={'date'}
              focusBorderColor="purple.300"
            />
            <Select
              focusBorderColor="purple.300"
              value={transactionType}
              onChange={e => setTransactionType(e.target.value)}
            >
              <option value="">Transaction Type</option>

              {transactionTypes.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>

            <Button
              isLoading={loading}
              w="full"
              colorScheme={'purple'}
              onClick={() =>
                typeTraDetails(transactionType, startDate, endDate)
              }
            >
              Search
            </Button>
          </VStack>
        </form>
        <TypeTraModel
          isOpen={isOpen}
          onClose={onClose}
          loading={loading}
          type={transactionType}
          startDate={startDate}
          endDate={endDate}
          transaction={transaction}
        />
      </Container>

      {/* <Sidebar /> */}
    </Grid>
  );
};

export default TypeWiseTra;
