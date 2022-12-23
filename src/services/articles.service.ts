import { instance } from 'http';

const getArticles = async ({ limit, offset }: { limit: number; offset: number }) => {
  const response = await instance
    .get(`/articles?limit=${limit}&offset=${offset}`)
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

export const articleService = {
  getArticleSlug,
  getArticles,
  getCommentsOnArticle,
  likeArticle,
  dislikeArticle,
  getArticlesFeed,
  commentArticle,
  commentDelArticle,
};
