import { Committee } from "../models/committee";
import { Task } from "../models/task";
import { User } from "../models/user";
import { APIService } from "./apiService";

const TaskService = APIService.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllTasks: builder.query<Task[], void>({
      query: () => ({
        url: "tasks/",
        method: "get",
      }),
      providesTags: ["Task"],
    }),
    fetchTasksByCommittee: builder.query<
      Task[],
      Partial<Task> & Pick<Committee, "id">
    >({
      query: (committeeId) => ({
        url: `tasks/?committee=${committeeId}`,
        method: "get",
      }),
      providesTags: ["Task"],
    }),
    fetchTasksByAssignee: builder.query<
      Task[],
      Partial<Task> & Pick<User, "id">
    >({
      query: (committeeId) => ({
        url: `tasks/?assignees=${committeeId}`,
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
  }),
});

export const {
  useFetchAllTasksQuery,
  useFetchTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = TaskService;
