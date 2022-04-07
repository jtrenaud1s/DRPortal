import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/axios";

export const APIService = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Task", "User", "Committee"],
  endpoints: () => ({})
});

export default APIService;
