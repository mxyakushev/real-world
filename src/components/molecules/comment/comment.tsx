import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { IAuthor } from 'types';
import { User } from '../user';

interface IProps {
  createdAt: Date;
  body: 'string';
  author: IAuthor;
}
export const Comment: FC<IProps> = ({ body, author, createdAt }) => {
  return (
    <Box mb={5} maxWidth="800px" mx="auto" borderWidth={2} borderRadius={5} overflow="hidden">
      <Box fontSize="18px" mb={3} p={5} pb={0}>
        {body}
      </Box>
      <Box
        px={5}
        py={2}
        backgroundColor="#e5e5e5"
        cursor="pointer"
        _hover={{ backgroundColor: 'red.300' }}
      >
        <User isLoaded author={author} createdAt={createdAt} size="sm" />
      </Box>
    </Box>
  );
};
