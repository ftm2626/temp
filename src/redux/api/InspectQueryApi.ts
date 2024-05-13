import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery";
import { apiUris } from "@/utils/uris";

export const InspectQueryApi = createApi({
  reducerPath: "InspectQueryApi",
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  tagTypes: [
    "DriversList",
    "InspectInfo",
    "InspectionsList",
    "InspectionDetails",
    "DriversDetails",
  ],
  endpoints(build) {
    return {
      getInspectDriversList: build.query<any, null>({
        query: () => ({ url: apiUris.inspectors.index }),
        providesTags: ["DriversList"],
      }),
      getInspectDriversDetails: build.query<any, number>({
        query: (data) => ({ url: apiUris.inspectors.driversDetails + data }),
        providesTags: ["DriversDetails"],
      }),
      getInspectInfo: build.query<any, number>({
        query: (data) => ({ url: apiUris.inspectors.getInspectInfo + data }),
        providesTags: ["InspectInfo"],
      }),
      getInspectInspectionList: build.query<any, null>({
        query: (data) => ({ url: apiUris.inspectors.inspectionsList + data }),
        providesTags: ["InspectionsList"],
      }),
      getInspectInspectionDetails: build.query<any, string>({
        query: (data) => ({ url: apiUris.inspectors.inspectionDetails + data }),
        providesTags: ["InspectionDetails"],
      }),
    };
  },
});

export const {
  endpoints,
  useGetInspectDriversDetailsQuery,
  useLazyGetInspectDriversDetailsQuery,
  useGetInspectInfoQuery,
  useGetInspectInspectionListQuery,
  useGetInspectInspectionDetailsQuery,
} = InspectQueryApi;
