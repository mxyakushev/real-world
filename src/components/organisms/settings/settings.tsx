import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserChange } from 'types';
import { useAppDispatch, useAppSelector, useAuth } from 'hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from 'components/molecules';
import { changeProfileSettings, loadingAuthStateSelector } from 'app';

interface IFormValues {
  email: string;
  password: string;
  image: string;
  username: string;
  bio: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('required field')
    .min(5, 'minimum 5 characters')
    .email('invalid email')
    .max(30, 'maximum 30 characters'),
  image: yup.string().required('required field'),
  username: yup.string().required('required field'),
});

const Settings = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(loadingAuthStateSelector);
  const user = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.user.email,
      password: '',
      image: user?.user.image,
      username: user?.user.username,
      bio: user?.user.bio,
    },
  });
  const submit: SubmitHandler<IFormValues> = async ({
    email,
    password,
    image,
    username,
    bio,
  }): Promise<void> => {
    const body: IUserChange = {
      user: {
        email,
        password,
        image,
        username,
        bio,
      },
    };
    dispatch(changeProfileSettings(body));
  };

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
      <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
        <Heading as="h2" size="2xl" mb={2}>
          Profile Settings
        </Heading>
        <FormInput control={control} errors={errors} name="image" placeholder="image" type="text" />
        <FormInput
          control={control}
          errors={errors}
          name="username"
          placeholder="username"
          type="text"
        />
        <FormInput control={control} errors={errors} name="bio" placeholder="bio" type="text" />
        <FormInput
          control={control}
          errors={errors}
          name="email"
          placeholder="email"
          type="email"
        />
        <FormInput
          control={control}
          errors={errors}
          name="password"
          placeholder="password"
          type="text"
        />
        <Button type="submit" w="100%" disabled={isLoading}>
          change
        </Button>
      </form>
    </Box>
  );
};

export default Settings;
