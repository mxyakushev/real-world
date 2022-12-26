import React, { FC } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { IAuthor } from 'types';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useAppDispatch, useAuth } from 'hooks';
import { deleteOneComment } from 'app';

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
    <Box mb={5} maxWidth="800px" mx="auto" borderWidth={2} borderRadius={5} overflow="hidden">
      <Box display="flex" justifyContent="end" px={3} pt={2}>
        {user?.user.username === author.username && (
          <RiDeleteBin2Line
            size={24}
            onClick={() => {
              dispatch(deleteOneComment({ id, slug }));
            }}
          />
        )}
      </Box>
      <Box fontSize="18px" mb={3} p={5} pt={0} pb={0}>
        {body}
      </Box>
      <Box
        px={5}
        py={2}
        backgroundColor="#e5e5e5"
        cursor="pointer"
        _hover={{ backgroundColor: 'red.300' }}
      >
        <Box>
          <Image src={author.image} w={10} />
          <Box>
            <span>{author.username}</span>
            <span>{createdAt.toString().slice(0, 10)}</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
