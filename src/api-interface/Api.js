import axios from 'axios';
import { has } from 'lodash';

let api_key = process.env.REACT_APP_NASA_API_KEY;

export const apiGet = (url) => new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: {
          api_key: api_key,
        },
        headers: {
          Accept: 'application/json',
        },
        timeout: 10000,
        withCredentials: false,
      })
      .then(function (response) {
        if (!has(response, 'data')) {
          // axios allways has data... some big error here...
          reject(response);
        }

        if (has(response.data, 'error')) {
          // server response with an error
          reject(response.data.error);
        }

        resolve(response.data);
      })
      .catch(function (error) {
        if (error.message) {
          reject(error.message);
        }

        if (error.config) {
          const { method, url } = error.config;
          const errorMessage = `Request ${method}: ${url} failed.`;
          reject(errorMessage);
        }

        reject('Something went wrong.');
      });
  });
