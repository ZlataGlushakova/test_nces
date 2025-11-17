import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useTask } from './contexts/TasksContext';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';

import { router } from './router';

function App() {
  const { loading, error, clearError } = useTask();
  const { enqueueSnackbar } = useSnackbar();

  // Обработка ошибок приложения
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { 
        variant: 'error',
        onClose: clearError
      });
    }
  }, [error, enqueueSnackbar, clearError]);

  // Глобальный обработчик ошибок
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      enqueueSnackbar('Произошла непредвиденная ошибка', { variant: 'error' });
    };

    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      enqueueSnackbar('Произошла ошибка в приложении', { variant: 'error' });
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleGlobalError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleGlobalError);
    };
  }, [enqueueSnackbar]);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <Typography variant="h5" gutterBottom color="primary.main">
          Загрузка приложения...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Пожалуйста, подождите
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;