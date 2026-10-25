import apiClient, { getListData } from "../../../lib/api/client";

export const getLeads = async () => {
  const { data } = await apiClient.get("/leads/");
  return getListData(data);
};

export const createLead = async (lead) => {
  const { data } = await apiClient.post("/leads/", lead);
  return data;
};

export const updateLead = async (leadId, lead) => {
  const { data } = await apiClient.patch(`/leads/${leadId}/`, lead);
  return data;
};

export const deleteLead = async (leadId) => {
  const { data } = await apiClient.delete(`/leads/${leadId}/`);
  return data;
};
