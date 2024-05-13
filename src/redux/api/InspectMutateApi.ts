import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery";
import { apiUris } from "@/utils/uris";
export const InspectMutateApi = createApi({
  reducerPath: "InspectMutateApi",
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  tagTypes: [],
  endpoints(build) {
    return {
      inspectSaveInspection: build.mutation<any, any>({
        query: ({ data, id }) => ({
          url: apiUris.inspectors.saveInspect + id,
          method: "post",
          data: data,
        }),
      }),
      inspectDeleteInspection: build.mutation<any, number>({
        query: (data) => ({
          url: apiUris.inspectors.deleteInspection + data,
          method: "get",
        }),
      }),
    };
  },
});

export const {
  endpoints,
  useInspectSaveInspectionMutation,
  useInspectDeleteInspectionMutation,
} = InspectMutateApi;
