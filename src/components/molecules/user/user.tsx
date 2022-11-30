import React, { FC } from 'react';
import { Box, Image, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';
import { IAuthor } from 'types';

type Size = 'sm';
interface IProps {
  isLoaded: boolean;
  author: IAuthor;
  createdAt: Date;
  size?: Size;
}
export const User: FC<IProps> = ({ isLoaded, author, createdAt, size }) => {
  return (
    <Box display="flex" alignItems="center">
      <SkeletonCircle size={size === 'sm' ? '8' : '10'} isLoaded={isLoaded}>
        <Image
          borderRadius="full"
          boxSize={size === 'sm' ? '32px' : '40px'}
          src={author.image}
          alt="img"
        />
      </SkeletonCircle>
      <Stack spacing={size === 'sm' ? 0.5 : 1} ml={2} fontSize={size === 'sm' ? '14px' : '18px'}>
        <Skeleton isLoaded={isLoaded}>{author.username}</Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Box fontSize={size === 'sm' ? '11px' : '14px'}>{createdAt.toString().slice(0, 10)}</Box>
        </Skeleton>
      </Stack>
    </Box>
  );
};
