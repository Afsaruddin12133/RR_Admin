
import apiClient from './../auth';


export async function fetchTransactionsall() {
  const res = await apiClient.get("/transactions");
  return res.data;
}
export async function fetchTransactions(ProductId) {
  const res = await apiClient.get(`transactions/${ProductId}`);
  return res.data;
}
