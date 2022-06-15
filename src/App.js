import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';

import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { AuthProvider } from './contexts/AuthProvider';
import { ImageViewerProvider } from './contexts/ImageViewerProvider';

// ----------------------------------------------------------------------
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ImageViewerProvider>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <ThemeProvider>
                <ScrollToTop />
                <BaseOptionChartStyle />
                <Router />
              </ThemeProvider>
            </SnackbarProvider>
          </ImageViewerProvider>
        </AuthProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
