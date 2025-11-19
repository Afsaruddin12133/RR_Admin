import apiClient from "../auth";

export async function fetchPaymentProvider() {
  const res = await apiClient.get("payment-providers/");
  return res.data;
}