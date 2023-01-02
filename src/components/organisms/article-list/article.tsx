import React, { FC } from 'react';
import { IArticle } from 'types';
import { useNavigate } from 'react-router-dom';
import { Box, Skeleton, useColorMode } from '@chakra-ui/react';
import { ArticleLikeButton, TagListArticle, User } from 'components';
import { useAppDispatch } from 'hooks';
import { resetSingleArticle } from 'app';

interface IProps {
  article: IArticle;
  isLoaded: boolean;
}

export const Article: FC<IProps> = ({ article, isLoaded }) => {
  const { title, author, description, favoritesCount, favorited, slug, createdAt, tagList } =
    article;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();

  return (
    <Box
      mb={5}
      borderColor={colorMode === 'dark' ? '#232b3b' : '#ebebeb'}
      padding={5}
      borderWidth={1}
      backgroundColor={colorMode === 'dark' ? '#232b3b' : '#fff'}
      borderRadius={10}
      onClick={() => {
        dispatch(resetSingleArticle());
        navigate(`/singleArticle/${slug}`);
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box mb={3}>
          <User isLoaded={isLoaded} author={author} createdAt={createdAt} />
        </Box>
        <ArticleLikeButton
          isLoaded={isLoaded}
          favorited={favorited}
          favoritesCount={favoritesCount}
          slug={slug}
        />
      </Box>
      <Box fontWeight="700" mb={3} cursor="pointer">
        <Skeleton isLoaded={isLoaded}>
          {title.length < 300 ? title : `${title.slice(0, 300)}.....`}
        </Skeleton>
      </Box>
      <Box mb={3}>
        <Skeleton isLoaded={isLoaded} cursor="pointer">
          {description}
        </Skeleton>
      </Box>
      <TagListArticle isLoaded={isLoaded} tagList={tagList} />
    </Box>
  );
};
