const API_KEY = 'd251d69c57e985e15e16cb8049d11e66'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const API = {
  // Movie endpoints
  getMovies: (type) => {
    const endpoint = `${BASE_URL}/movie/${type}?api_key=${API_KEY}`;
    return fetch(endpoint).then(response => response.json());
  },

  // TV endpoints
  getTV: (type) => {
    const endpoint = `${BASE_URL}/tv/${type}?api_key=${API_KEY}`;
    return fetch(endpoint).then(response => response.json());
  },

  // Search endpoints
  search: (type, query) => {
    const endpoint = `${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    return fetch(endpoint).then(response => response.json());
  },

  // Get movie details
  getMovieDetails: (movieId) => {
    const endpoint = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    return fetch(endpoint).then(response => response.json());
  },

  // Get TV details
  getTVDetails: (tvId) => {
    const endpoint = `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`;
    return fetch(endpoint).then(response => response.json());
  },

  // Helper function to get full image URL
  getImageURL: (path) => path ? `${IMAGE_BASE_URL}${path}` : null,
};