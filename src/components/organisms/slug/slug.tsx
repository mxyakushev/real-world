import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetArticleSlugQuery, useGetCommentSlugQuery } from 'app';
import { Box, Button, Heading, Spinner } from '@chakra-ui/react';
import { ArticleLikeButton, TagList, User, CommentList } from 'components';
import { MdPersonAddAlt } from 'react-icons/md';

const Slug = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetArticleSlugQuery({ slug: slug || '' });
  const { data: comments, isLoading: commentLoading } = useGetCommentSlugQuery({
    slug: slug || '',
  });

  if (isLoading || commentLoading) {
    return (
      <Box display="flex" w="100%" h="90%" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!data || !comments) {
    return (
      <Box display="flex" w="100%" h="90%" alignItems="center" justifyContent="center">
        <Heading>Something went wrong</Heading>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Box borderWidth={2} borderRadius={5} mb={5}>
        <Box fontSize="20px" fontWeight="700" mb={5} px={5} pt={5}>
          {data.article.title}
        </Box>
        <Box fontSize="18px" mb={5} px={5}>
          {data.article.body}
        </Box>
        <Box display="flex" alignItems="center" mb={5} px={5}>
          <User
            isLoaded={!isLoading}
            author={data.article.author}
            createdAt={data.article.createdAt}
          />
          <Button ml={4} mr={2}>
            <MdPersonAddAlt size={22} />
            <Box ml={1}>Follow</Box>
          </Button>
          <ArticleLikeButton
            isLoaded={!isLoading}
            favorited={data.article.favorited}
            favoritesCount={data.article.favoritesCount}
          />
          <Box pr={5} ml="auto">
            <TagList isLoaded={!isLoading} tagList={data.article.tagList || []} />
          </Box>
        </Box>
      </Box>
      <Heading size="xl" textAlign="center" mb={5}>
        Comments
      </Heading>
      <Box px={5}>
        <CommentList comments={comments} />
      </Box>
    </Box>
  );
};

export default Slug;
