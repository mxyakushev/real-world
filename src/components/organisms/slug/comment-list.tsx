import { FC, useMemo } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { IComments } from 'types';
import { Comment, CommentForm } from 'components';
import { Link } from 'react-router-dom';
import { useAppSelector, useAuth } from 'hooks';
import { loadingCommentsArticlesStateSelector } from 'app';

interface IProps {
  comments: IComments;
  slug: string;
}

export const CommentList: FC<IProps> = ({ comments, slug }) => {
  const user = useAuth();
  const commentsLoading = useAppSelector(loadingCommentsArticlesStateSelector);

  const showComments = useMemo(() => {
    return comments?.comments.map(({ id, body, author }) => {
      return <Comment key={Math.random()} body={body} author={author} id={id} slug={slug} />;
    });
  }, [comments?.comments, slug]);

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
        <CommentForm slug={slug} />
      )}
      {commentsLoading ? <Heading textAlign="center">Loading comments...</Heading> : showComments}
    </Box>
  );
};
