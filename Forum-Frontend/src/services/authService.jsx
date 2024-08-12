import axios from './axiosConfig';

export const signup = (userData) => {
  return axios.post('/auth/signup', userData);
};

export const login = (userData) => {
  return axios.post('/auth/login', userData);
};
