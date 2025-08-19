import api from "./api";

// User / NGO Auth
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// Admin Auth
export const loginAdmin = async (data) => {
  const res = await api.post("/auth/admin/login", data);
  return res.data;
};
