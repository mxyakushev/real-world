import React, { useEffect, useState } from 'react';
import { Button, Heading, Box } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserRegister } from 'types';
import { useAppDispatch, useAppSelector, useAuth } from 'hooks';
import { register } from 'app/store/thunks';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput } from 'components/molecules';
import { errorMessageAuthStateSelector, loadingAuthStateSelector } from 'app';
import { routes } from 'routes';

export interface IFormValues {
  username: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required('required field')
    .min(5, 'minimum 5 characters')
    .max(30, 'maximum 30 characters'),
  email: yup
    .string()
    .required('required field')
    .min(5, 'minimum 5 characters')
    .max(30, 'maximum 30 characters'),
  password: yup
    .string()
    .required('required field')
    .min(8, 'minimum 8 characters')
    .max(30, 'maximum 30 characters'),
});

const Register = () => {
  const user = useAuth();
  const [showError, setShowError] = useState(false);
  const authErrorMessageFromBackend = useAppSelector(errorMessageAuthStateSelector);
  const authLoading = useAppSelector(loadingAuthStateSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError,
  } = useForm<IFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const submit: SubmitHandler<IFormValues> = async ({
    username,
    email,
    password,
  }): Promise<void> => {
    const body: IUserRegister = {
      user: {
        username,
        email,
        password,
      },
    };
    const response = await dispatch(register(body));
    if (response.meta.requestStatus === 'rejected') {
      setShowError(true);
      reset();
    }
    reset();
  };

  useEffect(() => {
    if (user) {
      navigate(routes.HOME);
    }
  }, [navigate, user]);

  return (
    <Box
      maxWidth="400px"
      w="100%"
      h="80%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mx="auto"
      textAlign="center"
      px={4}
    >
      {showError ? (
        <Box textAlign="center">
          <Heading mb={5}>{authErrorMessageFromBackend}</Heading>
          <Button
            onClick={() => {
              setShowError(false);
              setError('username', { type: 'focus' });
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
            Sign Up
          </Heading>
          <Link
            to="/login"
            style={{
              margin: '0 0 10px',
              display: 'inline-block',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            already have an account ?
          </Link>
          <FormInput
            control={control}
            errors={errors}
            name="username"
            placeholder="Username"
            type="text"
          />
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
          <Button type="submit" w="100%" disabled={authLoading} borderRadius={0}>
            register
          </Button>
        </form>
      )}
    </Box>
  );
};

export default Register;
