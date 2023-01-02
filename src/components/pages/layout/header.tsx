import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAuth } from 'hooks';
import { authService } from 'services';
import { getAllArticles, removeUser, resetProfile } from 'app';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useAuth();
  const logout = () => {
    navigate('/');
    authService.logout();
    dispatch(removeUser());
    dispatch(getAllArticles({ limit: 10, offset: 0 }));
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center">
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
        <Button
          onClick={() => toggleColorMode()}
          ml={4}
          backgroundColor={colorMode === 'light' ? 'gray.200' : ''}
          borderRadius={200}
          height="40px"
          width="40px"
          p={0}
        >
          {colorMode === 'dark' ? <HiOutlineSun size={22} /> : <HiOutlineMoon size={22} />}
        </Button>
        {user && (
          <Flex alignItems="center" ml="auto">
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Avatar boxSize="40px" src={user.user.image} />
              </MenuButton>
              <MenuList>
                <Box py={2} px={3} fontWeight="700">
                  username: {user.user.username}
                </Box>
                <MenuItem
                  onClick={() => {
                    dispatch(resetProfile());
                    navigate(`/profile/${user.user.username}`);
                  }}
                >
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
            <NavLink to="/" onClick={onClose}>
              Home
            </NavLink>
            {user ? (
              <>
                <NavLink to="/settings" onClick={onClose}>
                  Settings
                </NavLink>
                <NavLink to="/new-article" onClick={onClose}>
                  New Article
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/register" onClick={onClose}>
                  Register
                </NavLink>
                <NavLink to="/login" onClick={onClose}>
                  Login
                </NavLink>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
