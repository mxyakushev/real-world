import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const ErrorBoundaryFallback = () => {
  const navigate = useNavigate();
  const handlePageRefresh = () => {
    navigate(0);
  };
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100vh"
      width="100%"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Server error !
      </AlertTitle>
      <AlertDescription maxWidth="sm" mb={2}>
        We are doing our best to fix this issue.
      </AlertDescription>
      <Button onClick={handlePageRefresh}>Reload</Button>
    </Alert>
  );
};
