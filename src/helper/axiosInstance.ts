import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? '/api' // proxy works in dev
  : 'https://tenders.guru/api/es'; // full path needed in production

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data?.data ?? response.data;
}, function (error: Error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export const getContent = async <T>(url: string): Promise<T> => {
  return axiosInstance.get<T>(url) as unknown as Promise<T>; // Interceptor already unwraps `.data?.data`
};
