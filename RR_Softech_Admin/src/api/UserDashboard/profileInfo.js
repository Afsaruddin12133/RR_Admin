import apiClient from './../auth';

export async function fetchProfileInfo() {
  const res = await apiClient.get("users/me/");
  return res.data;
}
export async function fetchEachProfile(id) {
  const res = await apiClient.get(`users/management/${id}`);
  return res.data;
}

export async function editProfileInfo(payload) {
  const res = await apiClient.patch("users/me/",payload);
  return res.data;
}
