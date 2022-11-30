import React, { FC } from 'react';
import { Box, Button, Skeleton } from '@chakra-ui/react';
import { AiOutlineLike } from 'react-icons/ai';
import { useAuth } from 'hooks';
import { useNavigate } from 'react-router-dom';

interface IProps {
  isLoaded: boolean;
  favorited: boolean;
  favoritesCount: number;
}

export const ArticleLikeButton: FC<IProps> = ({ isLoaded, favorited, favoritesCount }) => {
  const user = useAuth();
  const navigate = useNavigate();
  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (user) {
      console.log('like');
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
      >
        <AiOutlineLike size={22} />
        <Box ml={1} fontSize="20px">
          {favoritesCount}
        </Box>
      </Button>
    </Skeleton>
  );
};
