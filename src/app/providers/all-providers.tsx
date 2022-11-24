import { PropsWithChildren, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app';
import { ChakraProvider } from '@chakra-ui/react';

export const AllProviders = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>{children}</ChakraProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};
