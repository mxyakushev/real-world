import { instance } from 'http';
import { IPublishArticle } from '../types';

const getArticles = async ({ limit, offset }: { limit: number; offset: number }) => {
  const response = await instance
    .get(`/articles?limit=${limit}&offset=${offset}`)
    .catch((err) => console.log(err));
  return response?.data;
};

const getArticlesByTag = async ({
  limit,
  offset,
  tag,
}: {
  limit: number;
  offset: number;
  tag: string;
}) => {
  const response = await instance
    .get(`/articles?tag=${tag}&limit=${limit}&offset=${offset}`)
    .catch((err) => console.log(err));
  return response?.data;
};

const createArticle = async (body: IPublishArticle) => {
  const response = await instance.post(`/articles`, body).catch((err) => console.log(err));
  return response?.data;
};

const editArticle = async ({
  body,
  slug,
}: {
  body: Omit<IPublishArticle, 'tags'>;
  slug: string;
}) => {
  const response = await instance.put(`/articles/${slug}`, body).catch((err) => console.log(err));
  return response?.data;
};
const getArticlesProfile = async ({
  limit,
  offset,
  username,
}: {
  limit: number;
  offset: number;
  username: string;
}) => {
  const response = await instance
    .get(`/articles?author=${username}&limit=${limit}&offset=${offset}`)
    .catch((err) => console.log(err));
  return response?.data;
};

const getArticlesFavorited = async ({
  limit,
  offset,
  username,
}: {
  limit: number;
  offset: number;
  username: string;
}) => {
  const response = await instance
    .get(`/articles?favorited=${username}&limit=${limit}&offset=${offset}`)
    .catch((err) => console.log(err));
  return response?.data;
};

const getArticleSlug = async (slug: string) => {
  const response = await instance.get(`/articles/${slug}`).catch((err) => console.log(err));
  return response?.data;
};

const getArticlesFeed = async ({ limit, offset }: { limit: number; offset: number }) => {
  const response = await instance
    .get(`/articles/feed?limit=${limit}&offset=${offset}`)
    .catch((err) => console.log(err));
  return response?.data;
};

const getCommentsOnArticle = async (slug: string) => {
  const response = await instance
    .get(`/articles/${slug}/comments`)
    .catch((err) => console.log(err));
  return response?.data;
};

const commentArticle = async ({ slug, body }: { slug: string; body: string }) => {
  const response = await instance
    .post(`/articles/${slug}/comments`, { comment: { body } })
    .catch((err) => console.log(err));
  return response?.data.comment;
};

const commentDelArticle = async ({ slug, id }: { slug: string; id: number }) => {
  await instance.delete(`/articles/${slug}/comments/${id}`).catch((err) => console.log(err));
  return id;
};

const likeArticle = async (slug: string) => {
  const response = await instance
    .post(`/articles/${slug}/favorite`)
    .catch((err) => console.log(err));
  return response?.data;
};

const dislikeArticle = async (slug: string) => {
  const response = await instance
    .delete(`/articles/${slug}/favorite`)
    .catch((err) => console.log(err));
  return response?.data;
};

const deleteArticle = async (slug: string) => {
  const response = await instance.delete(`/articles/${slug}`).catch((err) => console.log(err));
  return response?.data;
};
export const articleService = {
  getArticleSlug,
  getArticles,
  getCommentsOnArticle,
  likeArticle,
  dislikeArticle,
  getArticlesFeed,
  commentArticle,
  commentDelArticle,
  getArticlesProfile,
  getArticlesFavorited,
  createArticle,
  deleteArticle,
  editArticle,
  getArticlesByTag,
};
