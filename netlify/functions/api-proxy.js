const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // OPTIONS 요청 처리 (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // 백엔드 API URL
    const backendUrl = 'https://todo-list-demo-e11643ecaddb.herokuapp.com';

    // 요청 경로 추출
    const path = event.path.replace('/.netlify/functions/api-proxy', '');
    const url = `${backendUrl}${path}`;

    // 요청 옵션 설정
    const options = {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // POST/PUT 요청의 경우 body 추가
    if (
      event.body &&
      (event.httpMethod === 'POST' || event.httpMethod === 'PUT')
    ) {
      options.body = event.body;
    }

    // 백엔드로 요청 전송
    const response = await fetch(url, options);
    const data = await response.text();

    return {
      statusCode: response.status,
      headers,
      body: data,
    };
  } catch (error) {
    console.error('API Proxy Error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
