import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

export const GET = (url: string, searchParam?: any) => {
  return instance.get(url);
};

export const POST = (url: string, payload?: any) => {
  return instance.post(url, payload);
};

export const PUT = (url: string, payload?: any) => {
  return instance.put(url, payload);
};
