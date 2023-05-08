import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { getAllArticles, getArticlesByTag, getArticlesFeed } from '../app';

export const useArticleTabData = (tabName: string | undefined, tag: string) => {
  const [offset, setOffset] = useState(0);
  const [range, setRange] = useState(5);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tabName === 'global') {
      dispatch(getAllArticles({ limit: 10, offset: offset * 10 }));
    }
    if (tabName === 'feed') {
      dispatch(getArticlesFeed({ limit: 10, offset: offset * 10 }));
    }
    if (tabName === 'tag') {
      dispatch(getArticlesByTag({ limit: 10, offset: offset * 10, tag }));
    }
  }, [dispatch, offset, tabName, tag]);

  return { offset, setOffset, range, setRange };
};
