import axios from "axios";

const BASE_URL = "https://global.genzsoft.top/api/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function registerUser(payload) {
  const res = await apiClient.post("users/register/", payload);
  return res.data;
}

export async function loginUser(payload) {
  const res = await apiClient.post("token/", payload);
  return res.data;
}

export async function refreshTokenApi(refresh) {
  const res = await apiClient.post("token/refresh/", { refresh });
  return res.data;
}

export async function changePasswordApi(accessToken, body) {
  const res = await apiClient.patch("users/change-password/", body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
}
export async function forgotPassword(payload) {
  const res = await apiClient.post("users/request-reset-password/", payload);
  return res.data;
}

export default apiClient;
