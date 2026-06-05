import axios from "axios";

const API = axios.create({
  baseURL: "https://be-anvaya-crm.vercel.app/api",
});

export const getLeads = (params) =>
  API.get("/leads", { params });