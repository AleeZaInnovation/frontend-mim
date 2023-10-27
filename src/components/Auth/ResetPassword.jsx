
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const {  error, message, loading } = useSelector(state => state.profile);

    const params = useParams();
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = async e => {
      e.preventDefault();
      dispatch(resetPassword(params.token,password));
      navigate('/profile');
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' })
      }
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' })
      }
    }, [dispatch, error, message]);
  

  return (
    <Container py={'16'} h="90vh">
      <form onSubmit={submitHandler}>
        <Heading
          children="Reset Password"
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New Password"
            type={'password'}
            focusBorderColor="yellow.500"
          />

          <Button
            isLoading={loading}
            type="submit"
            w={'full'}
            colorScheme="yellow"
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};