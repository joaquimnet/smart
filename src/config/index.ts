export const BACKEND_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://joaquimnet.herokuapp.com';
