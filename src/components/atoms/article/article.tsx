import React, { FC } from 'react';
import { IArticle } from 'types';
import { Link } from 'react-router-dom';

interface IProps {
  article: IArticle;
}

export const Article: FC<IProps> = ({ article }) => {
  const {
    title,
    body,
    id,
    author,
    description,
    favoritesCount,
    favorited,
    slug,
    createdAt,
    updatedAt,
    tagList,
  } = article;
  return (
    <Link to={`/articles/${slug}`} className="p-3 border-2 block border-black m-3">
      <div>
        <img src={author.image} alt="img" />
        {author.username}
      </div>
      <div>{id}</div>
      <div>{title}</div>
      <div className="font-bold">{body}</div>
      <div>{description}</div>
      <div>{favorited}</div>
      <div>{favoritesCount}</div>
      <div className="font-bold">{slug}</div>
      <div>{createdAt.toString().slice(0, 10)}</div>
      <div>{updatedAt.toString().slice(0, 10)}</div>
      <div>{tagList}</div>
    </Link>
  );
};
