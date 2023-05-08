import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { getArticlesLiked, getArticlesProfile } from '../app';

export const useProfileTabData = (tabName?: string, username?: string) => {
  const [offset, setOffset] = useState(0);
  const [range, setRange] = useState(5);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tabName === 'articles' && username) {
      dispatch(getArticlesProfile({ limit: 10, offset: offset * 10, username }));
    }
    if (tabName === 'liked' && username) {
      dispatch(getArticlesLiked({ limit: 10, offset: offset * 10, username }));
    }
  }, [dispatch, offset, tabName, username]);

  return { offset, setOffset, range, setRange };
};
