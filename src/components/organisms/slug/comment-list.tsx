import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { IComments } from 'types';
import { Comment } from 'components';
import { Link } from 'react-router-dom';

interface IProps {
  comments: IComments;
}
export const CommentList: FC<IProps> = ({ comments }) => {
  return (
    <Box pb={5}>
      <Box textAlign="center" mb={5}>
        <Link to="/login" style={{ color: '#767bf4' }}>
          Sign in
        </Link>{' '}
        or{' '}
        <Link to="/register" style={{ color: '#767bf4' }}>
          Sign up
        </Link>{' '}
        to add comments on this article.
      </Box>
      {comments?.comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            createdAt={comment.createdAt}
            body={comment.body}
            author={comment.author}
          />
        );
      })}
    </Box>
  );
};
