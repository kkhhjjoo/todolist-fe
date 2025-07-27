import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_PROXY || 'http://localhost:4000'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CORS credentials 지원
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log('Starting Request', request);
    return request;
  },
  function (error) {
    console.log('REQUEST ERROR', error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log('RESPONSE ERROR', error);
    return Promise.reject(error);
  }
);

export default api;
