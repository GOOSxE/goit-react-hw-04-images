// *
import axios from 'axios';
import propTypes from 'prop-types';
const URL = 'https://pixabay.com/api/';
const API_KEY = '36723883-919c3de6b45800de9c777a63e';
export const fetchImages = async (searchQuery, page, perPage) => {
  const { data } = await axios.get(
    `${URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=${
      perPage || 12
    }&image-type=photo&orientation=horizontal&safesearch=true`
  );
  return data;
};
// export default class ImageApiService {
//   constructor() {
//     this.page = 1;
//     this.searchQuery = '';
//     this.perPage = 12;
//   }
//   async fetchImages() {
//     const { data } = await axios.get(
//       `${URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&image-type=photo&orientation=horizontal&safesearch=true`
//     );
//     return data;
//   }
//   resetPageNumber() {
//     this.page = 1;
//   }
//   incrementPageNumber() {
//     this.page += 1;
//   }
// }
fetchImages.propTypes = {
  searchQuery: propTypes.string.isRequired,
  page: propTypes.number.isRequired,
  perPage: propTypes.number,
};
