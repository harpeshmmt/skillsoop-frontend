import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export default instance;

export const GET = (url: string, searchParam?: any) => {
  return instance.get(url);
};
