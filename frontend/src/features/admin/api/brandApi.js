import apiClient, { getListData } from "../../../lib/api/client";
import BACKEND_URL from "../../../../config";

export const getBrandImageUrl = (logo) => {
  if (!logo) return "";
  if (/^https?:\/\//i.test(logo)) return logo;
  if (logo.startsWith("/")) return `${BACKEND_URL}${logo}`;
  return new URL(logo, `${BACKEND_URL}/`).toString();
};

export const getBrands = async ({ includeInactive = false } = {}) => {
  const { data } = await apiClient.get("/brand/", {
    params: includeInactive ? { include_inactive: "true" } : undefined,
  });
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

export const updateBrand = async (brandId, { name, is_active, logo = null }) => {
  const payload = new FormData();

  if (name !== undefined) payload.append("name", name);
  if (is_active !== undefined) payload.append("is_active", String(Boolean(is_active)));
  if (logo instanceof File) payload.append("logo", logo);

  const { data } = await apiClient.patch(`/brand/${brandId}/`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
