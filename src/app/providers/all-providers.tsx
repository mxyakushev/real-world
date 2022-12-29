import { PropsWithChildren, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/montserrat';
import { ErrorBoundary } from '../../components/organisms/error-boundary';
import { ErrorBoundaryFallback } from '../../components/molecules/error-boundary-fallback';

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
          <ChakraProvider theme={theme} resetCSS>
            <ErrorBoundary fallback={<ErrorBoundaryFallback />}> {children}</ErrorBoundary>
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};
