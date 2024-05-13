import { apiUris } from "@/utils/uris";
import {
  RemoveServiceApiResT,
  ReportServiceListApiSendT,
  acceptServiceApiResT,
  acceptServiceApiSendT,
  registrationApiResT,
  registrationApiSendT,
  requestListApiResT,
  requestSupportApiResT,
  requestSupportApiSendT,
  storeAddressApiSendT,
} from "@/interface/passangersApi.interface";
import { PassQueryApi } from "./PassQueryApi";
export const PassMutateApi = PassQueryApi.injectEndpoints({
  endpoints(build) {
    return {
      passAcceptService: build.mutation<
        acceptServiceApiResT,
        { data: acceptServiceApiSendT; id: number }
      >({
        query: ({ data, id }) => ({
          url: apiUris.passanger.compeleteReceiptUri + id,
          method: "post",
          data: data,
        }),
        invalidatesTags: ["incompleteList"],
      }),
      passRemoveService: build.mutation<RemoveServiceApiResT, number>({
        query: (data) => ({
          url: apiUris.passanger.removeReceiptUri + data,
          method: "get",
        }),
        invalidatesTags: ["incompleteList"],
      }),
      passStoreRequest: build.mutation<
        registrationApiResT,
        registrationApiSendT
      >({
        query: (data) => ({
          url: apiUris.passanger.storeServiceUri,
          method: "post",
          data,
        }),
        invalidatesTags: ["servicesList"],
      }),
      passUpdateRequest: build.mutation<
        registrationApiResT,
        { data: registrationApiSendT; id: number }
      >({
        query: ({ data, id }) => ({
          url: apiUris.passanger.updateServiceUri + id,
          method: "post",
          data,
        }),
        invalidatesTags: ["servicesList", "serviceEditInfo"],
      }),
      passRemoveRequest: build.mutation<RemoveServiceApiResT, number>({
        query: (data) => ({
          url: apiUris.passanger.removeRequestUri + data,
          method: "get",
        }),
        invalidatesTags: ["servicesList"],
      }),
      passCreateAddress: build.mutation<
        requestSupportApiResT,
        storeAddressApiSendT
      >({
        query: (data) => ({
          url: apiUris.passanger.createAddressUri,
          method: "post",
          data,
        }),
        invalidatesTags: ["addressList"],
      }),
      passEditAddress: build.mutation<
        requestSupportApiResT,
        storeAddressApiSendT
      >({
        query: (data) => ({
          url: apiUris.passanger.editAddressUri + data.id,
          method: "post",
          data,
        }),
        invalidatesTags: ["addressList"],
      }),
      passGetReports: build.mutation<
        requestListApiResT,
        ReportServiceListApiSendT
      >({
        query: ({ page, from, to }) => ({
          url: `${apiUris.passanger.servicesListUri}?from=${from}&to=${to}&page=${page}`,
          method: "get",
        }),
      }),
      passCreateTicket: build.mutation<
        requestSupportApiResT,
        requestSupportApiSendT
      >({
        query: (data) => ({
          url: apiUris.passanger.createTicketUri,
          method: "post",
          data,
        }),
        invalidatesTags: ["ticketList"],
      }),
    };
  },
});

export const {
  endpoints,
  usePassAcceptServiceMutation,
  usePassRemoveServiceMutation,
  usePassGetReportsMutation,
  usePassStoreRequestMutation,
  usePassUpdateRequestMutation,
  usePassCreateTicketMutation,
  usePassCreateAddressMutation,
  usePassEditAddressMutation,
  usePassRemoveRequestMutation,
} = PassMutateApi;
