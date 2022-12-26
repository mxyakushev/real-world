import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Heading, Spinner, Button } from '@chakra-ui/react';
import { ArticleLikeButton, User, CommentList, FollowButton, TagListArticle } from 'components';
import { useAppDispatch, useAppSelector, useAuth } from 'hooks';
import {
  articleCommentsStateSelector,
  deleteArticle,
  errorArticlesStateSelector,
  errorMessageArticlesStateSelector,
  getAllArticles,
  getCommentsOnArticle,
  getSingleArticle,
  loadingArticlesStateSelector,
  singleArticleStateSelector,
} from 'app';
import { routes } from 'routes';

const Slug = () => {
  const { slug } = useParams();
  const data = useAppSelector(singleArticleStateSelector);
  const comments = useAppSelector(articleCommentsStateSelector);
  const isLoading = useAppSelector(loadingArticlesStateSelector);
  const isError = useAppSelector(errorArticlesStateSelector);
  const errorMessage = useAppSelector(errorMessageArticlesStateSelector);
  const dispatch = useAppDispatch();
  const user = useAuth();
  const navigate = useNavigate();

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
              {user?.user.username !== data.article.author.username && (
                <FollowButton username={data.article.author.username} />
              )}
              <ArticleLikeButton
                isLoaded={!isLoading}
                favorited={data.article.favorited}
                favoritesCount={data.article.favoritesCount}
                slug={slug || ''}
              />
              <Box pr={5} ml="auto">
                <TagListArticle isLoaded={!isLoading} tagList={data.article.tagList || []} />
              </Box>
            </Box>
          </Box>
          {user?.user.username === data.article.author.username && (
            <>
              <Button
                onClick={() =>
                  navigate(routes.NEW_ARTICLE, {
                    state: { article: data.article },
                  })
                }
              >
                edit
              </Button>
              <Button
                onClick={async () => {
                  await dispatch(deleteArticle(slug as string));
                  navigate(routes.HOME);
                }}
              >
                delete
              </Button>
            </>
          )}
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
