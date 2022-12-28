import React, { FC } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { IAuthor } from 'types';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useAppDispatch, useAuth } from 'hooks';
import { deleteOneComment } from 'app';
import { User } from '../user';

interface IProps {
  createdAt: Date;
  body: 'string';
  author: IAuthor;
  id: number;
  slug: string;
}
export const Comment: FC<IProps> = ({ slug, id, body, author, createdAt }) => {
  const dispatch = useAppDispatch();
  const user = useAuth();
  return (
    <Box mb={5} maxWidth="800px" mx="auto" borderWidth={2} borderRadius={0} overflow="hidden">
      <Box display="flex" justifyContent="end" px={3} pt={2}>
        {user?.user.username === author.username && (
          <Button
            mb={2}
            onClick={() => {
              dispatch(deleteOneComment({ id, slug }));
            }}
          >
            <Box mr={2}>
              <RiDeleteBin2Line size={24} />
            </Box>
            Delete
          </Button>
        )}
      </Box>
      <Box
        fontSize="18px"
        mb={3}
        p={5}
        pt={2}
        pb={0}
        borderTopWidth={user?.user.username === author.username ? 2 : 0}
      >
        {body}
      </Box>
      <Box px={5} py={2} backgroundColor="#e5e5e5">
        <Box>
          <User author={author} createdAt={createdAt} isLoaded />
        </Box>
      </Box>
    </Box>
  );
};
