import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auto refresh
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      const res = await axios.post(
        "http://localhost:5000/auth/refresh",
        { token: refreshToken }
      );

      localStorage.setItem("accessToken", res.data.accessToken);

      err.config.headers.Authorization =
        "Bearer " + res.data.accessToken;

      return axios(err.config);
    }

    return Promise.reject(err);
  }
);

export default api;