import React, { useEffect, useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { IUserLogin } from 'types';
import { useAppDispatch, useAppSelector, useAuth } from 'hooks';
import { login } from 'app/store/thunks';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { routes } from 'routes';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from 'components/molecules';
import { errorMessageAuthStateSelector, loadingAuthStateSelector } from 'app';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('required field')
    .min(5, 'minimum 5 characters')
    .email('invalid email')
    .max(30, 'maximum 30 characters'),
  password: yup
    .string()
    .required('required field')
    .min(8, 'minimum 8 characters')
    .max(30, 'maximum 30 characters'),
});

const Login = () => {
  const user = useAuth();
  const [showError, setShowError] = useState(false);
  const authErrorMessageFromBackend = useAppSelector(errorMessageAuthStateSelector);
  const authLoading = useAppSelector(loadingAuthStateSelector);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const submit: SubmitHandler<FieldValues> = async ({ email, password }): Promise<void> => {
    const body: IUserLogin = {
      user: {
        email,
        password,
      },
    };
    const response = await dispatch(login(body));
    if (response.meta.requestStatus === 'rejected') {
      setShowError(true);
      reset();
    }
    reset();
  };

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || routes.HOME);
    }
  }, [location, navigate, reset, user]);

  return (
    <Box
      w="400px"
      h="80%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mx="auto"
      textAlign="center"
    >
      {showError ? (
        <Box textAlign="center">
          <Heading mb={5}>{authErrorMessageFromBackend}</Heading>
          <Button
            onClick={() => {
              setShowError(false);
              setError('email', { type: 'focus' });
              setError('password', { type: 'focus' });
            }}
          >
            Go Back
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
          <Heading as="h2" size="2xl" mb={2}>
            Sign In
          </Heading>
          <Link
            to="/register"
            style={{
              margin: '0 0 10px',
              display: 'inline-block',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            no account ?
          </Link>
          <FormInput
            control={control}
            errors={errors}
            name="email"
            placeholder="Email"
            type="email"
          />
          <FormInput
            control={control}
            errors={errors}
            name="password"
            placeholder="Password"
            type="password"
          />
          <Button type="submit" w="100%" disabled={authLoading}>
            login
          </Button>
        </form>
      )}
    </Box>
  );
};

export default Login;
