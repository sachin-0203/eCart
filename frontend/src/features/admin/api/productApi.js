import apiClient, { getListData } from "../../../lib/api/client";

export const getProducts = async () => {
  const { data } = await apiClient.get("/products/");
  return getListData(data);
};

export const getProduct = async (productId) => {
  const { data } = await apiClient.get(`/products/${productId}/`);
  return data;
};

export const getProductBySlug = async (slug) => {
  const { data } = await apiClient.get("/products/", { params: { slug } });
  return getListData(data)[0] ?? null;
};

export const createProduct = async (product) => {
  const { data } = await apiClient.post("/products/", product);
  return data;
};

export const updateProduct = async (productId, product) => {
  const { data } = await apiClient.put(`/products/${productId}/`, product);
  return data;
};

export const deleteProduct = async (productId) => {
  const { data } = await apiClient.delete(`/products/${productId}/`);
  return data;
};
