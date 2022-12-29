import React, { FC } from 'react';
import { Avatar, Box, Button, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';
import { IAuthor } from 'types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks';
import { resetProfile } from 'app';

type Size = 'sm';
interface IProps {
  isLoaded: boolean;
  author: IAuthor;
  createdAt: Date;
  size?: Size;
}
export const User: FC<IProps> = ({ isLoaded, author, createdAt, size }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleUserClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(resetProfile());
    navigate(`/profile/${author.username}`);
  };
  return (
    <Box display="flex" alignItems="center">
      <SkeletonCircle size={size === 'sm' ? '8' : '10'} isLoaded={isLoaded}>
        <Avatar boxSize={size === 'sm' ? '32px' : '40px'} src={author.image} />
      </SkeletonCircle>
      <Stack spacing={size === 'sm' ? 0.5 : 1} ml={2} fontSize={size === 'sm' ? '14px' : '18px'}>
        <Skeleton isLoaded={isLoaded}>
          <Button onClick={handleUserClick} variant="link">
            {author.username}
          </Button>
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Box fontSize={size === 'sm' ? '11px' : '14px'}>{createdAt.toString().slice(0, 10)}</Box>
        </Skeleton>
      </Stack>
    </Box>
  );
};
