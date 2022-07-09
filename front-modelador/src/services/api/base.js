/* eslint-disable prettier/prettier */
import axios from 'axios';
import config from '@config';

const apiConfig = config.api;

export default axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 20000,
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  responseType: 'json',
});
