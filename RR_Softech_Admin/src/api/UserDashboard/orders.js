
import apiClient from './../auth';

export async function fetchOrders() {
  const res = await apiClient.get("orders/");
  return res.data;
}
