import { useRoutes } from 'react-router-dom';
import { generateRoutes } from 'routes';
import { Suspense } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

export const App = () => {
  return (
    <Suspense
      fallback={
        <Box display="flex" alignItems="center" justifyContent="center" w="100%" h="100vh">
          <Spinner size="xl" />
        </Box>
      }
    >
      {useRoutes(generateRoutes)}
    </Suspense>
  );
};
