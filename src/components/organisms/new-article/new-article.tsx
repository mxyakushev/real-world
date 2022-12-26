import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IPublishArticle } from 'types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { createOneArticle, editArticle } from 'app/store/thunks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from 'components/molecules';
import { loadingArticlesStateSelector } from 'app';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from 'routes';

interface IFormValues {
  title: string;
  about: string;
  text: string;
  tags: string;
}

const schema = yup.object().shape({
  title: yup.string().required('required field'),
  about: yup.string().required('required field'),
  text: yup.string().required('required field'),
  tags: yup.string().required('required field'),
});

const NewArticle = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(loadingArticlesStateSelector);
  const navigate = useNavigate();
  const dataToEdit = useLocation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      title: dataToEdit.state ? dataToEdit.state.article.title : '',
      about: dataToEdit.state ? dataToEdit.state.article.description : '',
      text: dataToEdit.state ? dataToEdit.state.article.body : '',
      tags: dataToEdit.state ? dataToEdit.state.article.tagList.toString() : '',
    },
  });
  const submit: SubmitHandler<IFormValues> = async ({
    title,
    about,
    text,
    tags,
  }): Promise<void> => {
    const body: IPublishArticle = {
      article: {
        title,
        description: about,
        body: text,
        tagList: [tags],
      },
    };
    if (dataToEdit.state) {
      await dispatch(editArticle({ body, slug: dataToEdit.state.article.slug }));
    } else {
      await dispatch(createOneArticle(body));
    }
    navigate(routes.HOME);
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
          {dataToEdit.state ? 'Edit Article' : 'Create Article'}
        </Heading>
        <FormInput
          control={control}
          errors={errors}
          name="title"
          placeholder="Article Title"
          type="text"
        />
        <FormInput
          control={control}
          errors={errors}
          name="about"
          placeholder="What's this article about"
          type="text"
        />
        <FormInput
          control={control}
          errors={errors}
          name="text"
          placeholder="Write your article"
          type="text"
        />
        <FormInput
          control={control}
          errors={errors}
          name="tags"
          placeholder="Enter tags"
          type="text"
        />
        <Button type="submit" w="100%" disabled={isLoading}>
          publish
        </Button>
      </form>
    </Box>
  );
};

export default NewArticle;
