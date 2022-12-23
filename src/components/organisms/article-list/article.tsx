import React, { FC } from 'react';
import { IArticle } from 'types';
import { useNavigate } from 'react-router-dom';
import { Box, Skeleton } from '@chakra-ui/react';
import { User, ArticleLikeButton, TagList } from 'components';

interface IProps {
  article: IArticle;
  isLoaded: boolean;
}

export const Article: FC<IProps> = ({ article, isLoaded}) => {
  const { title, author, description, favoritesCount, favorited, slug, createdAt, tagList } =
    article;
  const navigate = useNavigate();

  return (
    <Box
      mb={5}
      borderWidth={2}
      borderColor="#ebebeb"
      padding={5}
      borderRadius={5}
      onClick={() => {
        navigate(`/articles/${slug}`);
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
      <TagList isLoaded={isLoaded} tagList={tagList} />
    </Box>
  );
};
