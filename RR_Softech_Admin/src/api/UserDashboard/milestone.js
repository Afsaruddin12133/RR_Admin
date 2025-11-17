import apiClient from "../auth";

export async function patchMilestone(payload) {
  const res = await apiClient.patch("reviews/",payload);
  return res.data;
}
