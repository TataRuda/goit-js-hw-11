import axios from 'axios';
export { fetchImages }; 

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '35540331-8f9965a5a422b1cb6ad9cd0a3';

async function fetchImages(query, page, perPage) {
    try {
    const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`); 
    return response
    } catch (error) {
    console.error(error);
    }
  }

 