import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Heading, Spinner, useColorMode } from '@chakra-ui/react';
import { ArticleLikeButton, CommentList, FollowButton, TagListArticle, User } from 'components';
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
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';

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
  const { colorMode } = useColorMode();

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
    <Box p={3}>
      {data && comments && (
        <>
          <Box
            mb={5}
            borderWidth={1}
            borderColor={colorMode === 'dark' ? '#232b3b' : '#ebebeb'}
            backgroundColor={colorMode === 'dark' ? '#232b3b' : '#fff'}
            borderRadius={10}
            p={0}
          >
            <Box fontSize="20px" fontWeight="700" mb={5} px={5} pt={5}>
              {data.article.title}
            </Box>
            <Box fontSize="18px" mb={5} px={5}>
              {data.article.body}
            </Box>
            <Box display="flex" alignItems="center" flexWrap="wrap" mb={5} px={5}>
              <Box w="full">
                <Box mb={5} mr={4}>
                  <User
                    isLoaded={!isLoading}
                    author={data.article.author}
                    createdAt={data.article.createdAt}
                  />
                </Box>
                <Box display="flex" mb={5}>
                  {user?.user.username !== data.article.author.username && (
                    <Box mr={4}>
                      <FollowButton username={data.article.author.username} />
                    </Box>
                  )}
                  <Box mr={4}>
                    <ArticleLikeButton
                      isLoaded={!isLoading}
                      favorited={data.article.favorited}
                      favoritesCount={data.article.favoritesCount}
                      slug={slug || ''}
                    />
                  </Box>
                  {user?.user.username === data.article.author.username && (
                    <>
                      <Button
                        mr={4}
                        onClick={() =>
                          navigate(routes.NEW_ARTICLE, {
                            state: { article: data.article },
                          })
                        }
                      >
                        <BiEditAlt size={24} />
                      </Button>
                      <Button
                        onClick={async () => {
                          await dispatch(deleteArticle(slug as string));
                          navigate(routes.HOME);
                        }}
                      >
                        <RiDeleteBin2Line size={24} />
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
              <Box pr={5} ml={-2}>
                <TagListArticle isLoaded={!isLoading} tagList={data.article.tagList || []} />
              </Box>
            </Box>
          </Box>
          <Heading size="xl" textAlign="center" mb={5}>
            Comments
          </Heading>
          <Box>
            <CommentList comments={comments} slug={slug || ''} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Slug;
