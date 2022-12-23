import React, { FC, useState } from 'react';
import { Box, Button, Skeleton } from '@chakra-ui/react';
import { AiOutlineLike } from 'react-icons/ai';
import { useAppDispatch, useAuth } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { likeArticle, dislikeArticle } from 'app';

interface IProps {
  isLoaded: boolean;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
}

export const ArticleLikeButton: FC<IProps> = ({ isLoaded, favorited, favoritesCount, slug }) => {
  const user = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (user && !favorited) {
      dispatch(likeArticle(slug));
    } else if (user && favorited) {
      dispatch(dislikeArticle(slug));
    } else {
      navigate('/login');
    }
  };

  return (
    <Skeleton isLoaded={isLoaded} height="40px">
      <Button
        display="flex"
        alignItems="center"
        backgroundColor={favorited ? 'red.200' : ''}
        onClick={handleLikeClick}
        _hover={{ backgroundColor: 'none' }}
      >
        <AiOutlineLike size={22} />
        <Box ml={1} fontSize="20px">
          {favoritesCount}
        </Box>
      </Button>
    </Skeleton>
  );
};
