import React, { FC } from 'react';
import { MdPersonAddAlt } from 'react-icons/md';
import { Box, Button } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector, useAuth } from 'hooks';
import { follow, profileLoadingStateSelector, profileStateSelector, unfollow } from 'app';
import { useNavigate } from 'react-router-dom';

interface IProps {
  username: string;
}

export const FollowButton: FC<IProps> = ({ username }) => {
  const dispatch = useAppDispatch();
  const user = useAuth();
  const navigate = useNavigate();
  const profile = useAppSelector(profileStateSelector);
  const profileLoading = useAppSelector(profileLoadingStateSelector);

  const handleLikeClick = () => {
    if (user && !profile?.profile.following) {
      dispatch(follow(username));
    } else if (user && profile?.profile.following) {
      dispatch(unfollow(username));
    } else {
      navigate('/login');
    }
  };

  if (profileLoading) {
    return <Button disabled>Loading</Button>;
  }

  return (
    <Button onClick={handleLikeClick} mb={2}>
      <MdPersonAddAlt size={22} />
      <Box ml={1}>{profile?.profile.following ? 'Followed' : 'Follow'}</Box>
    </Button>
  );
};
