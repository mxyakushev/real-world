import React, { FC } from 'react';
import { Box, Button, Skeleton } from '@chakra-ui/react';
import { useHandleLike } from 'hooks';
import { BiDislike, BiLike } from 'react-icons/bi';

interface IProps {
  isLoaded: boolean;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
}

export const ArticleLikeButton: FC<IProps> = ({ isLoaded, favorited, favoritesCount, slug }) => {
  const { handleLikeClick, disabledBtn } = useHandleLike(favorited, slug);

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
