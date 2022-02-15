import { createApi } from "@reduxjs/toolkit/query/react";
import { Task } from "../models/task";
import { axiosBaseQuery } from "../utils/axios";

export const APIService = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    fetchAllTasks: builder.query<Task[], void>({
      query: () => ({
        url: "tasks/",
        method: "get",
      }),
    }),
    fetchTask: builder.query<Task, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "get",
      }),
    }),
    createTask: builder.mutation<Task, void>({
      query: (initialPost) => ({
        url: "tasks/",
        method: "post",
        body: initialPost,
      }),
    }),
    updateTask: builder.mutation<Task, Partial<Task> & Pick<Task, 'id'>>({
      query: (id, ...patch) => ({
        url: `tasks/${id}`,
        method: "post",
        body: patch,
      }),
    }),
  }),
});

export const { useFetchAllTasksQuery } = APIService;
