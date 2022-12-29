import React, { FC, useState } from 'react';
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
    <Button onClick={handleLikeClick} mb={2} disabled={disabledBtn} borderRadius={0}>
      <MdPersonAddAlt size={22} />
      <Box ml={1}>{profile?.profile.following ? 'Followed' : 'Follow'}</Box>
    </Button>
  );
};
