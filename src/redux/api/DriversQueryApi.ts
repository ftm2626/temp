import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery";
import { apiUris } from "@/utils/uris";
import {
  acceptableServicesApiResT,
  calenderApiResT,
  completeReceiptsApiResT,
  currentServicesApiResT,
  driverInfoApiResT,
  gpsParamsApiResT,
  incompleteReceiptsApiResT,
  passengersListApiResT,
} from "@/interface/driversApi.interface";

export const DriversQueryApi = createApi({
  reducerPath: "DriversQueryApi",
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  tagTypes: [
    "currentServicesList",
    "acceptableServicesList",
    "carInfoList",
    "incompleteList",
    "completedList",
    "passNameList",
    "calenderInfoList",
    "gpsInfo",
  ],
  endpoints(build) {
    return {
      getCurrentService: build.query<currentServicesApiResT, null>({
        query: () => ({ url: apiUris.driver.currentServicesUri }),
        providesTags: ["currentServicesList"],
      }),
      getAcceptableService: build.query<acceptableServicesApiResT, null>({
        query: () => ({ url: apiUris.driver.accepableServicesUri }),
        providesTags: ["acceptableServicesList"],
      }),
      getCarInfo: build.query<driverInfoApiResT, null>({
        query: () => ({ url: apiUris.driver.driverInfoUri }),
        providesTags: ["carInfoList"],
      }),
      getIncompeleteServices: build.query<incompleteReceiptsApiResT, null>({
        query: () => ({ url: apiUris.driver.incompleteReceptsUri }),
        providesTags: ["incompleteList"],
      }),
      getCompeleteServices: build.query<completeReceiptsApiResT, null>({
        query: () => ({ url: apiUris.driver.completeReciptsUri }),
        providesTags: ["completedList"],
      }),
      getClientNames: build.query<passengersListApiResT, null>({
        query: () => ({ url: apiUris.driver.passengersListUri }),
        providesTags: ["passNameList"],
      }),
      getCalenderInfo: build.query<calenderApiResT, null>({
        query: () => ({
          url: apiUris.driver.getCalender,
          method: "get",
        }),
        providesTags: ["calenderInfoList"],
      }),
      gpsInfo: build.query<gpsParamsApiResT, null>({
        query: () => ({
          url: apiUris.driver.gpsParamsUri,
          method: "get",
        }),
        providesTags: ["gpsInfo"],
      }),
    };
  },
});

export const {
  useGetCurrentServiceQuery,
  useGetAcceptableServiceQuery,
  useGetCarInfoQuery,
  useGetIncompeleteServicesQuery,
  useGetCompeleteServicesQuery,
  useGetClientNamesQuery,
  useGpsInfoQuery,
  useGetCalenderInfoQuery,
  endpoints,
} = DriversQueryApi;
