import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

export default function Courses() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
const {loading,courses,error,message} = useSelector(state=>state.course)
  const addToPlaylistHandler = async (courseID) => {
    await dispatch(addToPlaylist(courseID));
    dispatch(loadUser());
  };
  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    if(error){
      toast.error(error);
      dispatch({type:"clearError"});
    }
    if(message){
      toast.success(message);
      dispatch({type:"clearError"});
    }
  }, [dispatch, category, keyword,error,message]);
  const Course = ({
    views,
    title,
    imageSrc,
    description,
    id,
    addToPlaylistHandler,
    creator,
    lectureCount,
    loading,
  }) => {
    return (
      <VStack className="course" alignItems={['center', 'flex-start']}>
        <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
        <Heading
          textAlign={['center', 'left']}
          maxW="200px"
          size={'sm'}
          fontFamily={'sans-serif'}
          noOfLines={3}
          children={title}
        />
        <Text noOfLines={2} children={description} />
        <HStack>
          <Text
            fontWeight={'bold'}
            textTransform={'uppercase'}
            children="Creator"
          />
          <Text
            fontFamily={'body'}
            textTransform={'uppercase'}
            children={creator}
          />
        </HStack>
        <Heading
          textAlign={'center'}
          size={'xs'}
          children={`Lecture - ${lectureCount}`}
          textTransform={'uppercase'}
        />
        <Heading
          size={'xs'}
          children={`Views - ${views}`}
          textTransform={'uppercase'}
        />
        <Stack direction={['column', 'row']} alignItems={'center'}>
          <Link to={`/course/${id}`}>
            <Button colorScheme={'yellow'}>Watch Now </Button>
          </Link>
          <Button
          isLoading={loading}
            variant={'ghost'}
            colorScheme="yellow"
            onClick={() => addToPlaylistHandler(id)}
          >
            Add to playlist
          </Button>
        </Stack>
      </VStack>
    );
  };

  const categories = [
    'Web Development',
    'Artificial Intellegence',
    'Data Structure Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];
  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course...."
        type={'text'}
        focusBorderColor="yellow.500"
      />
      <HStack
        overflow={'auto'}
        paddingY={'8'}
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {
          courses.length>0 ? (courses.map(item=>(
            <Course
            key={item._id}
            title={item.title}
            description={item.description}
            views={item.views}
            imageSrc={item.poster.url}
            id={item._id}
            creator={item.createdBy}
            lectureCount={item.numOfVideos}
            addToPlaylistHandler={addToPlaylistHandler}
            isLoading={loading}
          />
          ))):( <Heading mt="4" children="Courses Not Found!"/>)
        }
      </Stack>
    </Container>
  );
}
