import React, { FC, useEffect } from 'react';
import { MdPersonAddAlt } from 'react-icons/md';
import { Box, Button } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector, useAuth } from 'hooks';
import {
  follow,
  getProfile,
  profileLoadingStateSelector,
  profileStateSelector,
  unfollow,
} from 'app';
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

  useEffect(() => {
    dispatch(getProfile(username));
  }, [dispatch, username]);

  const handleLikeClick = () => {
    if (user && !profile?.profile.following) {
      dispatch(follow(profile?.profile.username || ''));
    } else if (user && profile?.profile.following) {
      dispatch(unfollow(profile.profile.username));
    } else {
      navigate('/login');
    }
  };

  if (profileLoading) {
    return <h1>loading</h1>;
  }

  return (
    <Button ml={4} mr={2} onClick={handleLikeClick}>
      <MdPersonAddAlt size={22} />
      <Box ml={1}>{profile?.profile.following ? 'Followed' : 'Follow'}</Box>
    </Button>
  );
};
