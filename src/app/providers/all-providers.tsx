import { PropsWithChildren, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import '@fontsource/outfit';
import { ErrorBoundary } from '../../components/organisms/error-boundary';
import { ErrorBoundaryFallback } from '../../components/molecules/error-boundary-fallback';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  fonts: {
    heading: 'Outfit',
    body: 'Outfit',
  },
});

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
