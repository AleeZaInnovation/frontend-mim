import {
  Button,
  Container,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

import { useState } from 'react';
import { fileUploadCss } from '../../Auth/Register';
import cursor from '../../../assets/images/cursor.png';
import { newTransaction } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getAParty, getAllParties } from '../../../redux/actions/partySlice';

const CreateTransaction = () => {
  const ref = useRef();
  const partyData = useSelector(state => state?.party?.parties?.parties);
  const { error, message, loading } = useSelector(state => state.admin);
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [newBalance, setNewBalance] = useState('');
  const [debit, setDebitAccount] = useState('');
  const [credit, setCreditAccount] = useState('');
  const [date, setDate] = useState('');
  const [transactionType, setTransactionType] = useState('Account Receivable');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  let item = partyData?.find(item => item._id === debit);

  const dispatch = useDispatch();
  const finalRate = Number(rate ? rate : item?.rate);
  const balance = newBalance ? newBalance : quantity * finalRate;
  const transactionTypes = ['Sale', 'Sale Return', 'Receive', 'Payment'];

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('description', description);
    myForm.append('debit', debit);
    myForm.append('credit', credit);
    myForm.append('rate', finalRate);
    myForm.append('quantity', quantity);
    myForm.append('balance', balance);
    myForm.append('createdAt', date);
    myForm.append('transactionType', transactionType);
    myForm.append('file', image);
    dispatch(newTransaction(myForm)).then(() => {
      setDescription('');
      setRate('');
      setQuantity('');
      setImagePrev('');
      setTransactionType('');
    });
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

  const checkAccount = (debit, credit) => {
    if (debit === credit) {
      toast.error('Please check again account both are same !!!');
      setDebitAccount('');
      setCreditAccount('');
    }
  };
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
            children="Create Transaction"
            my="16"
            textAlign={['center', 'left']}
          />

          <VStack m="auto" spacing={'8'}>
            <Input
              type="text"
              ref={ref}
              placeholder="Date"
              onChange={({ target }) => setDate(target?.value)}
              onFocus={() => {
                if (ref.current) {
                  ref.current.type = 'date';
                }
              }}
              onBlur={() => {
                if (ref.current) {
                  ref.current.type = date ? 'date' : 'text';
                }
              }}
              value={date}
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
            <div className={item?.name ? 'd-flex' : 'd-none'}>
              {item?.name} Previous Balance is tk {item?.balance}
            </div>
            <Select
              focusBorderColor="purple.300"
              value={credit}
              onChange={e => setCreditAccount(e.target.value)}
            >
              <option value="">Select Account</option>

              {partyData?.map(item => (
                <option key={item} value={item._id}>
                  {item?.name} -- {item?.mobile}
                </option>
              ))}
            </Select>
            <Input
              value={rate}
              onChange={e => setRate(e.target.value)}
              placeholder={'Per jar tk ' + ' ' + finalRate}
              type={'number'}
              focusBorderColor="purple.300"
            />{' '}
            <Input
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="Quantity"
              type={'number'}
              focusBorderColor="purple.300"
            />{' '}
            <Input
              value={newBalance}
              onChange={e => setNewBalance(e.target.value)}
              placeholder={'Total Amount tk ' + ' ' + balance}
              type={'number'}
              focusBorderColor="purple.300"
            />{' '}
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
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Input
              accept="image/*"
              type={'file'}
              focusBorderColor="purple.300"
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'purple',
                },
              }}
              onChange={changeImageHandler}
            />
            {imagePrev && (
              <Image src={imagePrev} boxSize="64" objectFit={'contain'} />
            )}
            <Button
              isLoading={loading}
              w="full"
              colorScheme={'purple'}
              type="submit"
              onClick={() => checkAccount(debit, credit)}
            >
              Create
            </Button>
          </VStack>
        </form>
      </Container>

      {/* <Sidebar /> */}
    </Grid>
  );
};

export default CreateTransaction;
