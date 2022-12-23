import React, { FC, useState } from 'react';
import { Box, Textarea, Button, Heading } from '@chakra-ui/react';
import { IComments } from 'types';
import { Comment } from 'components';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useAuth } from 'hooks';
import { commentArticle, loadingCommentsArticlesStateSelector } from 'app';

interface IProps {
  comments: IComments;
  slug: string;
}
export const CommentList: FC<IProps> = ({ comments, slug }) => {
  const user = useAuth();
  const dispatch = useAppDispatch();
  const [textareaValue, setTextareaValue] = useState('');
  const commentsLoading = useAppSelector(loadingCommentsArticlesStateSelector);
  const handleSubmitComment = () => {
    if (textareaValue.length > 0) {
      dispatch(commentArticle({ slug, body: textareaValue }));
    }
    setTextareaValue('');
  };
  return (
    <Box pb={5}>
      {!user ? (
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
      ) : (
        <Box
          textAlign="center"
          mb={5}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Textarea
            maxWidth="700px"
            placeholder="Enter the comment"
            mb={3}
            onChange={(e) => setTextareaValue(e.target.value)}
            value={textareaValue}
          />
          <Button maxWidth="700px" w="100%" onClick={handleSubmitComment}>
            Submit
          </Button>
        </Box>
      )}
      {commentsLoading ? (
        <Heading textAlign="center">Loading comments...</Heading>
      ) : (
        comments?.comments.map(({ id, createdAt, body, author }) => {
          return (
            <Comment
              key={Math.random()}
              createdAt={createdAt}
              body={body}
              author={author}
              id={id}
              slug={slug}
            />
          );
        })
      )}
    </Box>
  );
};
