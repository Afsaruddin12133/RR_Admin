import apiClient from "../auth";

export async function fetchChatting() {
  const res = await apiClient.get("chat-messages/");
  return res.data;
}
export async function postChatting(payload) {
  const res = await apiClient.post("chat-messages/",payload);
  return res.data;
}
