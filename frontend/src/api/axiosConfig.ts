import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000"
})
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('authToken')

    if (token && !config.url?.startsWith("/api/auth")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {

    return Promise.reject(error)
  }


)
api.interceptors.response.use(
  respose => respose,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error)
  }

)


export default api;



