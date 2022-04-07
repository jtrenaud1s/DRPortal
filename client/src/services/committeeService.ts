import { Committee } from "../models/committee";
import { User } from "../models/user";
import { APIService } from "./apiService";

const CommitteeService = APIService.injectEndpoints({
  endpoints: (builder) => ({
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
    fetchCommitteesByMember: builder.query<
      Committee[],
      number
    >({
      query: (id) => ({
        url: `committees/?members=${id}`,
        method: "get",
      }),
      providesTags: ["User"],
    }),
    fetchCommitteesByHead: builder.query<
      Committee[],
      number
    >({
      query: (id) => ({
        url: `committees/?head=${id}`,
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
  useFetchAllCommitteesQuery,
  useFetchCommitteeQuery,
  useFetchCommitteesByHeadQuery,
  useFetchCommitteesByMemberQuery,
  useCreateCommitteeMutation,
  useUpdateCommitteeMutation,
  useDeleteCommitteeMutation,
} = CommitteeService;
