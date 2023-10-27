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
import PartyTransactionDetails from './PartyTransactionDetails';
import { getAllParties, partyTra } from '../../../redux/actions/partySlice';

const PartyTransaction = () => {
  const partyData = useSelector(state => state?.party?.parties?.parties);
  const transaction = useSelector(
    state => state?.party?.traParty?.transactions
  );
  console.log(transaction)
  const party = useSelector(state => state?.party?.traParty?.party);
  const { error, message, loading } = useSelector(state => state.admin);
  const [startDate, setStartDate] = useState('');
  const [debit, setDebitAccount] = useState('');
  const [endDate, setEndDate] = useState('');
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
  const partyTraDetails = (debit, startDate, endDate) => {
    dispatch(
      partyTra({ debit: debit, startDate: startDate, endDate: endDate })
    );
    onOpen();
  };
  useEffect(() => {
    dispatch(getAllParties());
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
            children="Party Transaction"
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
              value={debit}
              onChange={e => setDebitAccount(e.target.value)}
            >
              <option value="">Select Account</option>

              {partyData?.map(item => (
                <option key={item} value={item._id}>
                  {item.name} -- {item.mobile}
                </option>
              ))}
            </Select>

            <Button
              isLoading={loading}
              w="full"
              colorScheme={'purple'}
              onClick={() => partyTraDetails(debit, startDate, endDate)}
            >
              Search
            </Button>
          </VStack>
        </form>
        <PartyTransactionDetails
          isOpen={isOpen}
          onClose={onClose}
          loading={loading}
          party={party}
          startDate={startDate}
          endDate={endDate}
          transaction={transaction}
        />
      </Container>

      {/* <Sidebar /> */}
    </Grid>
  );
};

export default PartyTransaction;
