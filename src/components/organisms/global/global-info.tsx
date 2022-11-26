import React, { Dispatch, FC, SetStateAction } from 'react';
import { IArticle } from 'types';
import { ArticleList } from 'components';
import { Button } from '@chakra-ui/react';

interface IProps {
  articles: IArticle[];
  setOffset: Dispatch<SetStateAction<number>>;
}

export const GlobalInfo: FC<IProps> = ({ articles, setOffset }) => {
  return (
    <div>
      <ArticleList articles={articles} />
      <Button
        onClick={() => {
          setOffset((prevState) => (prevState === 0 ? prevState : prevState - 1));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        -
      </Button>
      <Button
        onClick={() => {
          setOffset((prevState) => prevState + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        +
      </Button>
    </div>
  );
};
