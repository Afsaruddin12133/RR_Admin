import apiClient from "../auth";

export async function fetchEmployee() {
  const res = await apiClient.get("public-employees/");
  return res.data;
}