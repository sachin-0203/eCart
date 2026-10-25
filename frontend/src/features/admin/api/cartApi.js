import apiClient, { getListData } from "../../../lib/api/client";

export const getCarts = async () => {
  const { data } = await apiClient.get("/cart/");
  return getListData(data);
};

export const getCart = async (cartId) => {
  const { data } = await apiClient.get(`/cart/${cartId}/`);
  return data;
};

export const createCart = async (cart) => {
  const { data } = await apiClient.post("/cart/", cart);
  return data;
};

export const updateCart = async (cartId, cart) => {
  const { data } = await apiClient.put(`/cart/${cartId}/`, cart);
  return data;
};

export const deleteCart = async (cartId) => {
  const { data } = await apiClient.delete(`/cart/${cartId}/`);
  return data;
};

export const getCartItems = async () => {
  const { data } = await apiClient.get("/cart-item/");
  return getListData(data);
};

export const addCartItem = async (item) => {
  const { data } = await apiClient.post("/cart-item/", item);
  return data;
};

export const updateCartItem = async (itemId, item) => {
  const { data } = await apiClient.put(`/cart-item/${itemId}/`, item);
  return data;
};

export const deleteCartItem = async (itemId) => {
  const { data } = await apiClient.delete(`/cart-item/${itemId}/`);
  return data;
};
