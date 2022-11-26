export interface IAuthor {
  id: number;
  email: string;
  username: string;
  bio: string;
  image: string;
}

export interface IArticle {
  title: string;
  body: string;
  description: string;
  tagList: string[];
  slug: string;
  author: IAuthor;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  favoritesCount: number;
  favorited: boolean;
}

export interface IArticles {
  articles: IArticle[];
  articlesCount: number;
}
