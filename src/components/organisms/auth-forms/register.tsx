import React, { useEffect } from 'react';
import { Input, Button, Heading } from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm, Controller } from 'react-hook-form';
import { IUserRegister } from 'types';
import { useAppDispatch, useAuth } from 'hooks';
import { register } from 'app/store/thunks';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { ErrorMessage } from '@hookform/error-message';
import { WarningIcon } from '@chakra-ui/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

export const Register = () => {
  const user = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const submit: SubmitHandler<FieldValues> = ({ username, email, password }): void => {
    const body: IUserRegister = {
      user: {
        username,
        email,
        password,
      },
    };
    dispatch(register(body));
  };

  useEffect(() => {
    if (user) {
      navigate(routes.HOME);
    }
  }, [navigate, user]);

  return (
    <div className="w-full h-3/4 flex items-center justify-center">
      <form onSubmit={handleSubmit(submit)} className="w-1/3 p-5 border rounded">
        <Heading as="h2" size="2xl" className="mb-2 text-center">
          Sign Up
        </Heading>
        <Link to="/login" className="block text-center mb-4 transition hover:underline">
          already have an account ?
        </Link>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <div className="mb-2">
              <Input {...field} className="mb-1" placeholder="username" type="text" size="md" />
              <ErrorMessage
                errors={errors}
                name="username"
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
          <Button type="submit">register</Button>
        </div>
      </form>
    </div>
  );
};
