import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../types/Task";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Tasks"],
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
    }),
    getTaskById: builder.query({
      query: (id) => `/tasks/${id}`,
    }),
    getTasksByStatus: builder.query({
      query: (status) => `/tasks?status=${status}`,
    }),
    getTasksByPriority: builder.query({
      query: (priority) => `/tasks?priority=${priority}`,
    }),
    addTask: builder.mutation({
      query: (task: Task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Tasks"]
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetTaskByIdQuery,
  useGetTasksByStatusQuery,
  useGetTasksByPriorityQuery,
} = apiSlice;
