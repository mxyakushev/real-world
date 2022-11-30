import axios from 'axios';
import { API_URL } from 'http';

const getTags = async () => {
  const response = await axios.get(`${API_URL}/tags`);
  return response.data.tags;
};

export const tagsService = {
  getTags,
};
