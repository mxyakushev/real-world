import { PropsWithChildren, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app';
import { ChakraProvider, extendTheme, Spinner } from '@chakra-ui/react';
import '@fontsource/montserrat';
import { ErrorBoundary } from '../../components/organisms/error-boundary';

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
  },
});

export const AllProviders = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <StrictMode>
      <ErrorBoundary fallback={<Spinner size="xl" />}>
        <Provider store={store}>
          <BrowserRouter>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  );
};
