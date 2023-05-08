import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from './useAuth';
import { useAppDispatch } from './useAppDispatch';
import { dislikeArticle, likeArticle } from '../app';

export const useHandleLike = (favorited: boolean, slug: string) => {
  const user = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [disabledBtn, setDisabledBtn] = useState(false);

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.stopPropagation();
      setDisabledBtn(true);
      if (user && !favorited) {
        await dispatch(likeArticle(slug));
      } else if (user && favorited) {
        await dispatch(dislikeArticle(slug));
      } else {
        navigate('/login');
      }
    } finally {
      setDisabledBtn(false);
    }
  };

  return { handleLikeClick, disabledBtn };
};
