import React, { useEffect } from 'react';
import { Input, Button, Heading } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { FieldValues, SubmitHandler, useForm, Controller } from 'react-hook-form';
import { IUserLogin } from 'types';
import { useAppDispatch, useAuth } from 'hooks';
import { login } from 'app/store/thunks';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { routes } from 'routes';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';

const schema = yup.object().shape({
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

export const Login = () => {
  const user = useAuth();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const submit: SubmitHandler<FieldValues> = ({ email, password }): void => {
    const body: IUserLogin = {
      user: {
        email,
        password,
      },
    };
    dispatch(login(body));
  };

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || routes.HOME);
    }
  }, [location, navigate, user]);

  return (
    <div className="w-full h-3/4 flex items-center justify-center">
      <form onSubmit={handleSubmit(submit)} className="w-1/3 p-5 border rounded">
        <Heading as="h2" size="2xl" className="mb-2 text-center">
          Sign In
        </Heading>
        <Link to="/register" className="block text-center mb-4 transition hover:underline">
          need an account ?
        </Link>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <div className="mb-2">
              <Input {...field} className="mb-1" placeholder="email" type="email" size="md" />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }: { message: string }) => (
                  <div className="text-red-500">
                    <WarningIcon w={5} h={5} />
                    <span className="ml-2">{message}</span>
                  </div>
                )}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <div className="mb-2">
              <Input {...field} className="mb-1" placeholder="password" type="password" size="md" />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }: { message: string }) => (
                  <div className="text-red-500">
                    <WarningIcon w={5} h={5} />
                    <span className="ml-2">{message}</span>
                  </div>
                )}
              />
            </div>
          )}
        />
        <div className="w-full flex justify-end">
          <Button type="submit">login</Button>
        </div>
      </form>
    </div>
  );
};
