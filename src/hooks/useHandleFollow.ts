import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './useAuth';
import { useAppDispatch } from './useAppDispatch';
import { follow, unfollow } from '../app';

export const useHandleFollow = (username: string, isFollowing: boolean | undefined) => {
  const user = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [disabledBtn, setDisabledBtn] = useState(false);

  const handleFollowClick = async () => {
    try {
      setDisabledBtn(true);
      if (user && !isFollowing) {
        await dispatch(follow(username));
      } else if (user && isFollowing) {
        await dispatch(unfollow(username));
      } else {
        navigate('/login');
      }
    } finally {
      setDisabledBtn(false);
    }
  };

  return { handleFollowClick, disabledBtn };
};
