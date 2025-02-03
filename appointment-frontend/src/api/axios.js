// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// // Add response interceptor to standardize data structure
// api.interceptors.response.use(
//     (response) => {
//         // If the response has a data.data structure, return that
//         if (response.data && response.data.data) {
//             return response.data;
//         }
//         // Otherwise return the original response
//         return response;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default api;