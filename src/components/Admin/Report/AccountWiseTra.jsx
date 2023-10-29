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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AccountTraModal from './AccountTraDetails';
import { traAccount } from '../../../redux/actions/partySlice';

const AccountWiseTra = () => {
  const transaction = useSelector(state => state?.party?.accountTra?.party);
  const party = useSelector(state => state?.party?.accountTra?.transactions);
  const { error, message, loading } = useSelector(state => state.admin);
  const accountTypes = [
    'Account Payable',
    'Account Receivable',
    'Expense',
    'Income',
    'Asset',
    'Liability',
    'Loan Received',
    'Loan Given',
  ];
  const [accountType, setAccountType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const typeTraDetails = (accountType, startDate, endDate) => {
    dispatch(
      traAccount({
        type: accountType,
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
        <form>
          <Heading
            textTransform={'uppercase'}
            children="Account Type"
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
              value={accountType}
              onChange={e => setAccountType(e.target.value)}
            >
              <option value="">Account Type</option>

              {accountTypes.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>

            <Button
              isLoading={loading}
              w="full"
              colorScheme={'purple'}
              onClick={() => typeTraDetails(accountType,startDate,endDate)}
            >
              Search
            </Button>
          </VStack>
        </form>
        <AccountTraModal
          isOpen={isOpen}
          onClose={onClose}
          loading={loading}
          type={accountType}
          transaction={transaction}
          party={party}
        />
      </Container>

      {/* <Sidebar /> */}
    </Grid>
  );
};

export default AccountWiseTra;
