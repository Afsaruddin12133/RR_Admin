import apiClient from "../auth";

export async function postFeedback(payload) {
  const res = await apiClient.post("reviews/",payload);
  return res.data;
}
