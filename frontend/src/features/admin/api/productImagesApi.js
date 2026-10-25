import apiClient from "../../../lib/api/client";
import BACKEND_URL from "../../../../config";

export const uploadProductImage = async (productId, image) => {
  const formData = new FormData();
  formData.append("product", productId);
  formData.append("image", image);

  const { data } = await apiClient.post("/product-images/upload/", formData);
  return data;
};

export const updateProductImage = async (imageId, image) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await apiClient.patch(`/product-image/${imageId}/`, formData);
  return data;
};

export const deleteProductImage = async (imageId) => {
  const { data } = await apiClient.delete(`/product-image/${imageId}/`);
  return data;
};

export const getProductImageUrl = (image) => {
  if (/^https?:\/\//i.test(image)) return image;
  return new URL(image, `${BACKEND_URL}/`).toString();
};
