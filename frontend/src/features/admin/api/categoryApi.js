import apiClient, { getListData } from "../../../lib/api/client";
import BACKEND_URL from "../../../../config";

export const getCategoryImageUrl = (image) => {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  if (image.startsWith("/")) return `${BACKEND_URL}${image}`;
  return new URL(image, `${BACKEND_URL}/`).toString();
};

export const getCategories = async () => {
  const { data } = await apiClient.get("/category/");
  return getListData(data);
};

export const createCategory = async ({
  name,
  parent = null,
  is_active = true,
  image = null,
}) => {
  const payload = new FormData();
  payload.append("name", name);

  if (parent) {
    payload.append("parent", String(parent));
  }

  payload.append("is_active", String(Boolean(is_active)));

  if (image instanceof File) {
    payload.append("image", image);
  }

  const { data } = await apiClient.post("/category/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteCategory = async (categoryId) => {
  const { data } = await apiClient.patch(`/category/${categoryId}/`, {
    is_active: false,
  });
  return data;
};
