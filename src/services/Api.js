import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29295423-17b569e792d85c50ff51a3d1b';

export const getImages = async (query, page) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      page,
      per_page: 12,
    },
  });

  return response.data;
};
