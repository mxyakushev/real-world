import React, { FC } from 'react';
import { Box, CloseButton, useColorMode } from '@chakra-ui/react';
import { IAuthor } from 'types';
import { useAppDispatch, useAuth } from 'hooks';
import { deleteOneComment } from 'app';
import { User } from '../user';

interface IProps {
  body: 'string';
  author: IAuthor;
  id: number;
  slug: string;
}
export const Comment: FC<IProps> = ({ slug, id, body, author }) => {
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const user = useAuth();
  return (
    <Box mb={5} maxWidth="800px" mx="auto" borderWidth={1} borderRadius={10} overflow="hidden">
      <Box px={5} py={2} backgroundColor={colorMode === 'light' ? '#e5e5e5' : '#171923'}>
        <Box display="flex" alignItems="center">
          <User author={author} isLoaded />
          {user?.user.username === author.username && (
            <CloseButton
              size="lg"
              ml="auto"
              onClick={() => {
                dispatch(deleteOneComment({ id, slug }));
              }}
            />
          )}
        </Box>
      </Box>
      <Box fontSize="18px" mb={3} p={5} pt={2} pb={0}>
        {body}
      </Box>
    </Box>
  );
};
