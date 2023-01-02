import React, { FC, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector, useAuth } from 'hooks';
import { follow, profileLoadingStateSelector, profileStateSelector, unfollow } from 'app';
import { useNavigate } from 'react-router-dom';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';

interface IProps {
  username: string;
  width?: boolean;
}

export const FollowButton: FC<IProps> = ({ username, width }) => {
  const dispatch = useAppDispatch();
  const user = useAuth();
  const navigate = useNavigate();
  const profile = useAppSelector(profileStateSelector);
  const profileLoading = useAppSelector(profileLoadingStateSelector);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const handleLikeClick = async () => {
    try {
      setDisabledBtn(true);
      if (user && !profile?.profile.following) {
        await dispatch(follow(username));
      } else if (user && profile?.profile.following) {
        await dispatch(unfollow(username));
      } else {
        navigate('/login');
      }
    } finally {
      setDisabledBtn(false);
    }
  };

  if (profileLoading) {
    return <Button disabled>Loading</Button>;
  }

  return (
    <Button onClick={handleLikeClick} mb={2} disabled={disabledBtn} width={width ? '100%' : ''}>
      {profile?.profile.following ? (
        <RiUserUnfollowLine size={22} />
      ) : (
        <RiUserFollowLine size={22} />
      )}
      <Box ml={1}>{profile?.profile.following ? 'Followed' : 'Follow'}</Box>
    </Button>
  );
};
