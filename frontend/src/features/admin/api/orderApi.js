import apiClient, { getListData } from "../../../lib/api/client";

export const getOrders = async () => {
  const { data } = await apiClient.get("/orders/");
  return getListData(data);
};

export const getOrder = async (orderId) => {
  const { data } = await apiClient.get(`/orders/${orderId}/`);
  return data;
};
