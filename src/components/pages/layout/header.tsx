import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAuth } from 'hooks';
import { authService } from 'services';
import { removeUser } from 'app';

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const user = useAuth();
  const logout = () => {
    authService.logout();
    dispatch(removeUser());
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} mb={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
          <Link to="/">Home</Link>
          {user ? (
            <Link to="/settings">Settings</Link>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </HStack>
        {user && (
          <Flex alignItems="center">
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Avatar size="sm" src={user.image} />
              </MenuButton>
              <MenuList>
                <MenuItem>About Me</MenuItem>
                <MenuItem>My Articles</MenuItem>
                <MenuItem>Favorite Articles</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <Link to="/">Home</Link>
            {user ? (
              <Link to="/settings">Settings</Link>
            ) : (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
