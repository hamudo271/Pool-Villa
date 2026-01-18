const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }
  return process.env.NODE_ENV === 'production'
    ? 'https://pool-villa-production.up.railway.app'
    : 'http://localhost:4000';
};

export const API_URL = getApiUrl();
