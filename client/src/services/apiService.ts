import { createApi } from "@reduxjs/toolkit/query/react";
import { Task } from "../models/task";
import { User } from "../models/user";
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
    updateTask: builder.mutation<Task, Partial<Task> & Pick<Task, "id">>({
      query: (id, ...patch) => ({
        url: `tasks/${id}`,
        method: "patch",
        body: patch,
      }),
    }),
    deleteTask: builder.mutation<Task, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "post",
      }),
    }),

    fetchAllUsers: builder.query<User[], void>({
      query: () => ({
        url: "tasks/",
        method: "get",
      }),
    }),
    fetchUser: builder.query<User, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "get",
      }),
    }),
    createUser: builder.mutation<User, void>({
      query: (initialPost) => ({
        url: "tasks/",
        method: "post",
        body: initialPost,
      }),
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, "id">>({
      query: (id, ...patch) => ({
        url: `tasks/${id}`,
        method: "patch",
        body: patch,
      }),
    }),
    deleteUser: builder.mutation<User, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "post",
      }),
    }),
  }),
});

export const { useFetchAllTasksQuery } = APIService;
