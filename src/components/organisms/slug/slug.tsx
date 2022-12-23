import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Heading, Spinner } from '@chakra-ui/react';
import { ArticleLikeButton, TagList, User, CommentList } from 'components';
import { MdPersonAddAlt } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  articleCommentsStateSelector,
  errorArticlesStateSelector,
  errorMessageArticlesStateSelector,
  getAllArticles,
  getCommentsOnArticle,
  getSingleArticle,
  loadingArticlesStateSelector,
  singleArticleStateSelector,
} from 'app';

const Slug = () => {
  const { slug } = useParams();
  const data = useAppSelector(singleArticleStateSelector);
  const comments = useAppSelector(articleCommentsStateSelector);
  const isLoading = useAppSelector(loadingArticlesStateSelector);
  const isError = useAppSelector(errorArticlesStateSelector);
  const errorMessage = useAppSelector(errorMessageArticlesStateSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (slug != null) {
      dispatch(getAllArticles({ limit: 10, offset: 0 }));
      dispatch(getSingleArticle(slug));
      dispatch(getCommentsOnArticle(slug));
    }
  }, [dispatch, slug]);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" h="90vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" w="100%" h="90%" alignItems="center" justifyContent="center">
        <Heading>{errorMessage}</Heading>
      </Box>
    );
  }

  return (
    <Box p={5}>
      {data && comments && (
        <>
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
                slug={slug || ''}
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
            <CommentList comments={comments} slug={slug || ''} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Slug;
