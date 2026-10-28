import apiClient, {getListData} from "../../../lib/api/client";

export const getMenProducts = async () => {
  const { data } = await apiClient.get("/products/?product_type=men");
  return getListData(data);
};