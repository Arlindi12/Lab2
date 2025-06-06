import axios from 'axios';

const API = axios.create({ baseURL: 'https://localhost:7254/api' });

export default API;
