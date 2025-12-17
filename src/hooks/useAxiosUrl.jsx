import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const useAxiosUrl = () => {
    return axiosPublic;
};

export default useAxiosUrl;