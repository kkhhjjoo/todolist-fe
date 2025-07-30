import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터에서 항상 최신 토큰을 헤더에 추가
api.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      request.headers['authorization'] = 'Bearer ' + token;
    }
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
