import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
    TiSocialYoutubeCircular,
    TiSocialInstagramCircular,
  } from 'react-icons/ti';
  import { DiGithub } from 'react-icons/di';
export const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading children="All Rights Reserved" color={'white'} />
          <Heading
            fontFamily={'body'}
            size="sm"
            children="@AleeZainnovation"
            color={'yellow.400'}
          />
        </VStack>

        <HStack
          spacing={['2', '10']}
          justifyContent="center"
          color={'white'}
          fontSize="50"
        >
          <a href="https://www.youtube.com/mohammedalee" target={'blank'}>
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://www.instagram.com/a3eek" target={'blank'}>
            <TiSocialInstagramCircular />
          </a>
          <a href="https://github.com/theamik" target={'blank'}>
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};
