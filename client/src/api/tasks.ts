import { Task } from "../types";
import Axios from "../utils/axios";

export const getAll = () => {
  return Axios.get("/tasks");
};

export const get = (id: number) => {
  return Axios.get(`/tutorials/${id}`);
};

export const create = (data: Task) => {
  return Axios.post("/tutorials", data);
};

export const update = (id: number, data: Task) => {
  return Axios.put(`/tutorials/${id}`, data);
};

export const remove = (id: number) => {
  return Axios.delete(`/tutorials/${id}`);
};
