import apiClient from "../auth";

export async function fetchReviews() {
  const res = await apiClient.get("reviews/");
  return res.data;
}