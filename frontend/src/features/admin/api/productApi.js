import apiClient, { getListData } from "../../../lib/api/client";
import BACKEND_URL from "../../../../config";

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

export const getProductImageUrl = (image) => {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  return new URL(image, `${BACKEND_URL}/`).toString();
};

export const getProductImage = (product) => {
  if (!product) return "";

  const firstImage = Array.isArray(product.images)
    ? product.images.find((image) => image)?.image ?? product.images[0]
    : null;

  const imageUrl = firstImage?.image ?? firstImage ?? product.image;

  return imageUrl ? getProductImageUrl(imageUrl) : "";
};

export const getProductImages = (product) => {
  if (!product) return [];

  const images = Array.isArray(product.images) ? product.images : [];
  const normalizedImages = images
    .map((image) => (typeof image === "string" ? image : image?.image))
    .filter(Boolean);

  if (product.image && !normalizedImages.includes(product.image)) {
    normalizedImages.unshift(product.image);
  }

  return [...new Set(normalizedImages)].map((image) => getProductImageUrl(image));
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
