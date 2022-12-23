import { instance } from 'http';

const getTags = async () => {
  const response = await instance.get('/tags');
  return response.data.tags;
};

export const tagsService = {
  getTags,
};
