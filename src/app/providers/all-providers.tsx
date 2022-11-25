import { PropsWithChildren, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

export const AllProviders = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};
