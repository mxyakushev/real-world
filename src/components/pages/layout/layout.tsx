import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useAppDispatch } from 'hooks';
import { tagsThunk } from 'app';
import { Header } from './header';

export const Layout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(tagsThunk());
  });
  return (
    <Box h="100%" w="100%">
      <Header />
      <Outlet />
    </Box>
  );
};
