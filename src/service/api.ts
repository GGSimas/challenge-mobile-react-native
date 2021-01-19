import axios from 'axios';

const api = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public',
  params: {
    apikey: '6929bbd137d95f6c0e9515db4f9c07c9',
    ts: '1611016199022',
    hash: '03db90f0c9df8dc271483b56392a43be',
  },
});

export default api;
