import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const PartyModal = ({
  isOpen,
  onClose,
  id,
  partyName,
  loading,
  party,
  partyImage,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      size="full"
      onClose={handleClose}
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{partyName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my={'5'}>
                <Heading children={partyName} />
                <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
              </Box>
              <Heading children={'Details'} size={'lg'} />
              <Heading children={party?.address} />
              <Heading
                children={`#${party?.mobile}`}
                size={'sm'}
                opacity={0.4}
              />
              <VideoCard
                image={partyImage}
                title={partyName}
                accountType={party?.accountType}
                balance={party?.balance}
                rate={party?.rate}
                description={party?.description}
                loading={loading}
              />
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

export default PartyModal;

function VideoCard({
  rate,
  description,
  balance,
  accountType,
  image,
  loading,
}) {
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
        <Heading size={'sm'} children={accountType} />
        <Text children={description} />
      </Box>
      <Box >
      <Image w={['50vw', 'full']} maxH={'30vh'} src={image} />
      </Box>
      <Heading size={'sm'} children={'Current Balance'} />
      <Button isLoading={loading} color={'purple.600'} children={balance}>
      </Button>
      <Heading size={'sm'} children={'Rate Per Jar'} />
      <Button isLoading={loading} color={'purple.600'} children={rate}>
      </Button>
    </Stack>
  );
}
