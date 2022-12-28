import { Box, Button, Heading, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserLogin } from 'types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { login } from 'app/store/thunks';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from 'components/molecules';
import { loadingAuthStateSelector } from 'app';

interface IFormValues {
  email: string;
  password: string;
}

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
  const authLoading = useAppSelector(loadingAuthStateSelector);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<IFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const submit: SubmitHandler<IFormValues> = async ({ email, password }): Promise<void> => {
    const body: IUserLogin = {
      user: {
        email,
        password,
      },
    };
    const response = await dispatch(login(body));
    if (response.meta.requestStatus === 'rejected') {
      toast({ title: `Email or password is invalid`, status: 'error', isClosable: true });
      setError('email', { message: '' });
      setError('password', { message: '' });
    }
  };

  return (
    <Box
      maxWidth="400px"
      w="100%"
      h="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mx="auto"
      textAlign="center"
      px={4}
    >
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
        <Button type="submit" w="100%" disabled={authLoading} borderRadius={0}>
          login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
