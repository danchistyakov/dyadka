import axios from 'axios';

const $data = axios.create({
  baseURL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
});

const $auth = axios.create({
  baseURL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = localStorage.getItem('token');
  return config;
};

$auth.interceptors.request.use(authInterceptor);

export {$data, $auth};
