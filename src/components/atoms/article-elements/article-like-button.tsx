import React, { FC, useState } from 'react';
import { Box, Button, Skeleton } from '@chakra-ui/react';
import { useAppDispatch, useAuth } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { dislikeArticle, likeArticle } from 'app';
import { BiDislike, BiLike } from 'react-icons/bi';

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
      <Button display="flex" alignItems="center" onClick={handleLikeClick} disabled={disabledBtn}>
        {favorited ? <BiDislike size={22} /> : <BiLike size={22} />}
        <Box ml={1} fontSize="20px">
          {favoritesCount}
        </Box>
      </Button>
    </Skeleton>
  );
};
