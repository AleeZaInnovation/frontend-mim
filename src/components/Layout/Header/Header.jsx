import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton = ({ url = '/', title = 'Dashboard', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  };
  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height={'12'}
        rounded="full"
        zIndex={'overlay'}
        position={'fixed'}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(5px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>
            Mim Drinking Water
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'}>
              <LinkButton
                onClose={onClose}
                url="/admin/dashboard"
                title="Dashboard"
              />
              <LinkButton
                onClose={onClose}
                url="/admin/create-transaction"
                title="New Transaction"
              />
              <LinkButton
                onClose={onClose}
                url="/admin/create-party"
                title="New Party"
              />
              <LinkButton
                onClose={onClose}
                url="/admin/parties"
                title="All Parties"
              />
              <LinkButton
                onClose={onClose}
                url="/admin/party-transaction"
                title="Party Transaction"
              />
              <LinkButton
                onClose={onClose}
                url="/admin/type-wise-transaction"
                title="Type Wise Report"
              />
              <LinkButton
                onClose={onClose}
                url="/admin/account-wise-transaction"
                title="Account Wise Report"
              />
              <LinkButton
                onClose={onClose}
                url="/admin/income-statement"
                title="Income Statement"
              />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About" />
            </VStack>
            <HStack
              justifyContent={'space-evenly'}
              position="absolute"
              bottom={'2rem'}
              width="80%"
            >
              {isAuthenticated ? (
                <>
                  <VStack>
                    <HStack>
                      <Link onClick={onClose} to="/profile">
                        <Button variant={'ghost'} colorScheme={'yellow'}>
                          Profile
                        </Button>
                      </Link>
                      <Button variant={'ghost'} onClick={logoutHandler}>
                        <RiLogoutBoxLine />
                        Logout
                      </Button>
                    </HStack>
                    {user && user.role === 'admin' && (
                      <Link onClick={onClose} to="/admin/dashboard">
                        <Button colorScheme={'purple'} variant="ghost">
                          <RiDashboardFill style={{ margin: '4px' }} />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                  </VStack>
                </>
              ) : (
                <>
                  <Link onClick={onClose} to="/login">
                    <Button colorScheme={'yellow'}>Login</Button>
                  </Link>
                  <p>OR</p>
                  <Link onClick={onClose} to="/register">
                    <Button colorScheme={'yellow'}>Sing Up</Button>
                  </Link>
                </>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
