
import apiClient from './../auth';

export async function fetchOrders() {
  const res = await apiClient.get("orders/");
  return res.data;
}
export async function fetchOrdersById(id) {
  const res = await apiClient.get(`orders/${id}`);
  return res.data;
}


