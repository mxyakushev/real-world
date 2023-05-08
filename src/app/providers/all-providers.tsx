import { PropsWithChildren, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import '@fontsource/outfit';
import { ErrorBoundary, ErrorBoundaryFallback } from 'components';
import { theme } from '../theme';

export const AllProviders = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider theme={theme} resetCSS>
            <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
              <ColorModeScript initialColorMode={theme.config.initialColorMode} /> {children}
            </ErrorBoundary>
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};
