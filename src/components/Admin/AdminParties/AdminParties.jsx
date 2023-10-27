import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import cursor from '../../../assets/images/cursor.png';
import PartyModal from './PartyModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { getAllParties, getAParty } from '../../../redux/actions/partySlice';

const AdminParties = () => {
  const data = useSelector(state => state?.party?.parties?.parties);
  const party = useSelector(state => state?.party?.party?.party);
  const { error, message, loading } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [partyId, setPartyId] = useState('');
  const [partyName, setPartyName] = useState('');
  const [partyImage, setPartyImage] = useState('');

  const partyDetailsHandler = (partyId, name, url) => {
    dispatch(getAParty(partyId));
    onOpen();
    setPartyId(partyId);
    setPartyName(name);
    setPartyImage(url);
  };
  const deleteButtonHandler = partyId => {
    // dispatch(deleteCourse(courseId));
    // dispatch(getAllParties());
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
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Parties"
          my="16"
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available parties in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Name</Th>
                <Th isNumeric>Mobile</Th>
                <Th>Address</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {data &&
                data.map((item, index) => (
                  <Row
                    partyDetailsHandler={partyDetailsHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    key={item?._id}
                    sn={index}
                    item={item}
                    loading={loading}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <PartyModal
          isOpen={isOpen}
          onClose={onClose}
          id={partyId}
          partyName={partyName}
          loading={loading}
          party={party}
          partyImage={partyImage}
        />
      </Box>
    </Grid>
  );
};

export default AdminParties;

function Row({
  key,
  item,
  sn,
  partyDetailsHandler,
  deleteButtonHandler,
  loading,
}) {
  return (
    <Tr>
      <Td>#{sn + 1}</Td>
      <Td>
        <Image src={item.avatar.url} />
      </Td>
      <Td>{item.name}</Td>
      <Td isNumeric>{item.mobile}</Td>
      <Td>{item.address}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() =>
              partyDetailsHandler(item._id, item.name, item.avatar.url)
            }
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            View Parties
          </Button>

          <Button
            isLoading={loading}
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
