import apiClient from "../auth";

export async function postAvailabilities(payload) {
  const res = await apiClient.post("availabilities/",payload);
  return res.data;
}
export async function showAvailabilities() {
  const res = await apiClient.get("availabilities/");
  return res.data;
}
export async function deleteAvailabilities(id) {
  const res = await apiClient.delete(`availabilities/${id}`);
  return res.data;
}