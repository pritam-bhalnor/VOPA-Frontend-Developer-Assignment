import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: '/api',
    // timeout: 5000,
    // headers: { 'X-Custom-Header': 'foobar' }
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
