// *
import axios from 'axios';
import propTypes from 'prop-types';
const URL = 'https://pixabay.com/api/';
const API_KEY = '36723883-919c3de6b45800de9c777a63e';
export const fetchImages = async (searchQuery, page, perPage) => {
  const { data } = await axios.get(
    `${URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=${perPage}&image-type=photo&orientation=horizontal&safesearch=true`
  );
  return data;
};
fetchImages.propTypes = {
  searchQuery: propTypes.string.isRequired,
  page: propTypes.number.isRequired,
  perPage: propTypes.number.isRequired,
};
