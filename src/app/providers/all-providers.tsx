import { PropsWithChildren, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/montserrat';

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
  },
});

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
