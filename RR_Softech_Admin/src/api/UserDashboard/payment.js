import apiClient from "../auth";

export async function fetchPaymentProvider() {
  const res = await apiClient.get("payment-providers/");
  return res.data;
}
export async function postIntiPayment(payload,id) {
  const res = await apiClient.post(`milestones/${id}/initiate_payment/`,payload);
  return res.data;
}