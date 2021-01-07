import axios from 'axios';
import promise from 'promise';

import { toast } from 'react-toastify';
// Add a request interceptor 
var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent 
  //If the header does not contain the token and the url not public, redirect to login  
  var accessToken = localStorage.token;

  //if token is found add it to the header
  if (accessToken) {
    if (config.method !== 'OPTIONS') {
          config.headers.authorization = 'Bearer ' + accessToken;
        }
  }
  return config;
}, function (error) {
   // Do something with request error 
   return promise.reject(error);
});
//Add a response interceptor

axiosInstance.interceptors.response.use((response) => {
    return response
 }, function (error) {
     if (!error.response) {
        toast.error(error.message);
     } else {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.refreshToken;
            const API_URL = process.env.REACT_APP_URL;
            return axios.post( API_URL + '/refresh',
                {
                    "refreshToken": refreshToken
                })
                .then(res => {
                    const newToken = res.data.token;
                    localStorage.setItem('token', newToken);
                    if (res.status === 200) {
                        originalRequest.headers['authorization'] = 'Bearer ' + newToken;
                        return axios(originalRequest);
                    }
                }, () => {
                })
        }
     }
    return Promise.reject(error);
 });

export default axiosInstance;