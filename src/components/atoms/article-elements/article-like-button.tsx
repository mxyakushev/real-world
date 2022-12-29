import React, { FC, useState } from 'react';
import { Box, Button, Skeleton, useColorMode } from '@chakra-ui/react';
import { AiOutlineLike } from 'react-icons/ai';
import { useAppDispatch, useAuth } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { dislikeArticle, likeArticle } from 'app';

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
  const [disabledBtn, setDisabledBtn] = useState(false);
  const { colorMode } = useColorMode();
  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.stopPropagation();
      setDisabledBtn(true);
      if (user && !favorited) {
        await dispatch(likeArticle(slug));
      } else if (user && favorited) {
        await dispatch(dislikeArticle(slug));
      } else {
        navigate('/login');
      }
    } finally {
      setDisabledBtn(false);
    }
  };

  return (
    <Skeleton isLoaded={isLoaded} height="40px">
      <Button
        display="flex"
        alignItems="center"
        backgroundColor={favorited ? (colorMode === 'light' ? 'red.200' : 'red.500') : ''}
        borderRadius={0}
        onClick={handleLikeClick}
        _hover={{ backgroundColor: 'none' }}
        disabled={disabledBtn}
      >
        <AiOutlineLike size={22} />
        <Box ml={1} fontSize="20px">
          {favoritesCount}
        </Box>
      </Button>
    </Skeleton>
  );
};
