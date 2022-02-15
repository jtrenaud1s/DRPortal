import { createApi } from "@reduxjs/toolkit/query/react";
import { Committee } from "../models/committee";
import { Task } from "../models/task";
import { User } from "../models/user";
import { axiosBaseQuery } from "../utils/axios";

export const APIService = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Task", "User", "Committee"],
  endpoints: (builder) => ({
    fetchAllTasks: builder.query<Task[], void>({
      query: () => ({
        url: "tasks/",
        method: "get",
      }),
      providesTags: ["Task"],
    }),
    fetchTask: builder.query<Task, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "get",
      }),
      providesTags: ["Task"],
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
        url: "users/",
        method: "get",
      }),
      providesTags: ["User"],
    }),
    fetchUser: builder.query<User, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "get",
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation<User, void>({
      query: (initialPost) => ({
        url: "users/",
        method: "post",
        body: initialPost,
      }),
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, "id">>({
      query: (id, ...patch) => ({
        url: `users/${id}`,
        method: "patch",
        body: patch,
      }),
    }),
    deleteUser: builder.mutation<User, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "post",
      }),
    }),

    fetchAllCommittees: builder.query<Committee[], void>({
      query: () => ({
        url: "committees/",
        method: "get",
      }),
      providesTags: ["User"],
    }),
    fetchCommittee: builder.query<Committee, number>({
      query: (id) => ({
        url: `committees/${id}`,
        method: "get",
      }),
      providesTags: ["User"],
    }),
    createCommittee: builder.mutation<Committee, void>({
      query: (initialPost) => ({
        url: "committees/",
        method: "post",
        body: initialPost,
      }),
    }),
    updateCommittee: builder.mutation<
      Committee,
      Partial<Committee> & Pick<Committee, "id">
    >({
      query: (id, ...patch) => ({
        url: `committees/${id}`,
        method: "patch",
        body: patch,
      }),
    }),
    deleteCommittee: builder.mutation<User, number>({
      query: (id) => ({
        url: `committees/${id}`,
        method: "post",
      }),
    }),
  }),
});

export const {
  useFetchAllTasksQuery,
  useCreateCommitteeMutation,
  useCreateTaskMutation,
  useCreateUserMutation,
  useDeleteCommitteeMutation,
  useDeleteTaskMutation,
  useDeleteUserMutation,
  useFetchAllCommitteesQuery,
  useFetchAllUsersQuery,
  useFetchCommitteeQuery,
  useFetchTaskQuery,
  useFetchUserQuery,
  useUpdateCommitteeMutation,
  useUpdateTaskMutation,
  useUpdateUserMutation,
} = APIService;
