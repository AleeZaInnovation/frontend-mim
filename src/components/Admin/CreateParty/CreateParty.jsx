import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { fileUploadCss } from '../../Auth/Register';
import cursor from '../../../assets/images/cursor.png';
import { createParty } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CreateParty = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState('');
  const [category, setCategory] = useState('Cash');
  const [accountType, setAccountType] = useState('Account Receivable');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const { error, message, loading } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const categories = ['Cash', 'Due', 'Ledger'];

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
    myForm.append('name', name);
    myForm.append('address', address);
    myForm.append('mobile', mobile);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('rate', rate);
    myForm.append('accountType', accountType);
    myForm.append('file', image);
    dispatch(createParty(myForm)).then(() => {
      setName('');
      setMobile('');
      setAddress('');
      setDescription('');
      setRate('');
      setImagePrev('');
    });
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
            children="Create Party"
            my="16"
            textAlign={['center', 'left']}
          />

          <VStack m="auto" spacing={'8'}>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              type={'text'}
              focusBorderColor="purple.300"
            />{' '}
            <Input
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Address"
              type={'text'}
              focusBorderColor="purple.300"
            />{' '}
            <Input
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              placeholder="Mobile"
              type={'text'}
              focusBorderColor="purple.300"
            />{' '}
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Input
              value={rate}
              onChange={e => setRate(e.target.value)}
              placeholder="Rate"
              type={'number'}
              focusBorderColor="purple.300"
            />{' '}
            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Category</option>

              {categories.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Select
              focusBorderColor="purple.300"
              value={accountType}
              onChange={e => setAccountType(e.target.value)}
            >
              <option value="" >Account Type</option>

              {accountTypes.map(item => (
                <option key={item} value={item} >
                  {item}
                </option>
              ))}
            </Select>
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
            >
              Create
            </Button>
          </VStack>
        </form>
      </Container>

    </Grid>
  );
};

export default CreateParty;
