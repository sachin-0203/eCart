import axios from "axios";
import BACKEND_URL from "../../../../config";

const productsEndpoint = `${BACKEND_URL}/api/products/`;
const leadEndpoint = `${BACKEND_URL}/api/leads/`;
const ordersEndpoint = `${BACKEND_URL}/api/orders/`;
const cartsEndpoint = `${BACKEND_URL}/api/cart/`;

const getErrorMessage = (error) => {
  const data = error.response?.data;

  if (typeof data === "string") return data;
  if (data?.detail) return data.detail;

  if (data && typeof data === "object") {
    return Object.entries(data)
      .map(([field, messages]) => {
        const text = Array.isArray(messages) ? messages.join(" ") : messages;
        return `${field}: ${text}`;
      })
      .join(" ");
  }

  return error.message || "The request could not be completed.";
};

const request = async (config) => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
};


// Product ----------------------------
export const getProducts = async () => {
  const data = await request({ method: "get", url: productsEndpoint });
  return Array.isArray(data) ? data : data.results || [];
};

export const getOrders = async () => {
  const data = await request({ method: "get", url: ordersEndpoint });
  return Array.isArray(data) ? data : data.results || [];
};

export const getCarts = async () => {
  const data = await request({ method: "get", url: cartsEndpoint });
  return Array.isArray(data) ? data : data.results || [];
};

export const getProduct = (productId) =>
  request({ method: "get", url: `${productsEndpoint}${productId}/` });

export const createProduct = (product) =>
  request({ method: "post", url: productsEndpoint, data: product });

export const updateProduct = (productId, product) =>
  request({
    method: "put",
    url: `${productsEndpoint}${productId}/`,
    data: product,
  });

export const deleteProduct = (productId) =>
  request({ method: "delete", url: `${productsEndpoint}${productId}/` });


// Lead ----------------------------------
export const getLeads = async () => {
  const data = await request({ method: "get", url: leadEndpoint });
  return Array.isArray(data) ? data : data.results || [];
};

export const updateLead = (leadId, lead) =>
  request({
    method: "patch",
    url: `${leadEndpoint}${leadId}/`,
    data: lead,
  });

export const deleteLead = (leadId) =>
  request({ method: "delete", url: `${leadEndpoint}${leadId}/` });