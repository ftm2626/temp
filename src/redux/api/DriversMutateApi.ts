import { apiUris } from "@/utils/uris";
import {
  acceptableServiceApiResT,
  currentServiceApiResT,
  requestServiceApiResT,
  requestServiceApiSendT,
} from "@/interface/driversApi.interface";
import { DriversQueryApi } from "./DriversQueryApi";
export const DriversMutateApi = DriversQueryApi.injectEndpoints({
  endpoints(build) {
    return {
      postRequestService: build.mutation<
        requestServiceApiResT,
        requestServiceApiSendT
      >({
        query: (data) => ({
          url: apiUris.driver.createReceptUri,
          method: "post",
          data: data,
        }),
        invalidatesTags: ["currentServicesList"],
      }),
      acceptService: build.mutation<acceptableServiceApiResT, number>({
        query: (data) => ({
          url: apiUris.driver.acceptServicesUri + data,
          method: "get",
        }),
        invalidatesTags: ["acceptableServicesList"],
      }),
      rejectService: build.mutation<acceptableServiceApiResT, number>({
        query: (data) => ({
          url: apiUris.driver.rejectServicesUri + data,
          method: "get",
        }),
        invalidatesTags: ["acceptableServicesList"],
      }),
      startService: build.mutation<currentServiceApiResT, number>({
        query: (data) => ({
          url: apiUris.driver.startServiceUri + data,
          method: "get",
        }),
        invalidatesTags: ["currentServicesList"],
      }),
      endService: build.mutation<currentServiceApiResT, number>({
        query: (data) => ({
          url: apiUris.driver.stopServiceUri + data,
          method: "get",
        }),
        invalidatesTags: ["currentServicesList"],
      }),
      submitCalender: build.mutation<any, any>({
        query: (data) => ({
          url: apiUris.driver.submitCalender,
          method: "post",
          data,
        }),
        invalidatesTags: ["calenderInfoList"],
      }),
      storeLocation: build.mutation<currentServiceApiResT, any>({
        query: (data) => ({
          url: apiUris.driver.locationsUri,
          method: "post",
          data: { locations: data },
        }),
      }),
    };
  },
});

export const {
  usePostRequestServiceMutation,
  useAcceptServiceMutation,
  useRejectServiceMutation,
  useStartServiceMutation,
  useEndServiceMutation,
  useStoreLocationMutation,
  useSubmitCalenderMutation,
  endpoints,
} = DriversMutateApi;
