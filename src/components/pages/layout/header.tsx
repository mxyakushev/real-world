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
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAuth } from 'hooks';
import { authService } from 'services';
import { getAllArticles, removeUser } from 'app';

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAuth();
  const logout = () => {
    navigate('/');
    authService.logout();
    dispatch(removeUser());
    dispatch(getAllArticles({ limit: 10, offset: 0 }));
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
          <NavLink to="/">Home</NavLink>
          {user ? (
            <>
              <NavLink to="/settings">Settings</NavLink>
              <NavLink to="/new-article">New Article</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </HStack>
        {user && (
          <Flex alignItems="center">
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Avatar size="sm" src={user.user.image} />
                <Box>{user.user.username}</Box>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate(`/profile/${user.user.username}`)}>
                  About Me
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <NavLink to="/">Home</NavLink>
            {user ? (
              <NavLink to="/settings">Settings</NavLink>
            ) : (
              <>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
