import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://cataas.com",
});

export const fetchCats = async (limit = 10) => {
  try {
    const res = await axiosClient.get(`/api/cats?limit=${limit}&type=small`);
    console.log("Raw Cataas response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch cats", err);
    return [];
  }
};
