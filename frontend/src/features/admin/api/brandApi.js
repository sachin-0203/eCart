import apiClient, { getListData } from "../../../lib/api/client";
import BACKEND_URL from "../../../../config";

export const getBrandImageUrl = (logo) => {
  if (!logo) return "";
  if (/^https?:\/\//i.test(logo)) return logo;
  if (logo.startsWith("/")) return `${BACKEND_URL}${logo}`;
  return new URL(logo, `${BACKEND_URL}/`).toString();
};

export const getBrands = async () => {
  const { data } = await apiClient.get("/brand/");
  return getListData(data);
};

export const createBrand = async ({ name, is_active = true, logo = null }) => {
  const payload = new FormData();
  payload.append("name", name);
  payload.append("is_active", String(Boolean(is_active)));

  if (logo instanceof File) {
    payload.append("logo", logo);
  }

  const { data } = await apiClient.post("/brand/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteBrand = async (brandId) => {
  const { data } = await apiClient.patch(`/brand/${brandId}/`, {is_active: false});
  return data;
};
