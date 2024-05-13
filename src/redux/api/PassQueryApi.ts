import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery";
import { apiUris } from "@/utils/uris";
import {
  AddressListApiResT,
  ReportServiceListApiSendT,
  TicketListApiResT,
  createInfoApiResT,
  editRequestApiResT,
  requestListApiResT,
  servicesListApiResT,
  servicesQApiResT,
  subserviceListApiResT,
} from "@/interface/passangersApi.interface";

export const PassQueryApi = createApi({
  reducerPath: "PassQueryApi",
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  tagTypes: [
    "fieldsInfo",
    "incompleteList",
    "incompleteQuestionsList",
    "servicesList",
    "servicesSubList",
    "serviceEditInfo",
    "ticketList",
    "addressList",
  ],
  endpoints(build) {
    return {
      getPassRequestInfo: build.query<createInfoApiResT, null>({
        query: () => ({ url: apiUris.passanger.createServiceUri }),
        providesTags: ["fieldsInfo"],
      }),
      getPassIncompleteList: build.query<servicesListApiResT, null>({
        query: () => ({ url: apiUris.passanger.ReceiptListUri }),
        providesTags: ["incompleteList"],
      }),
      getPassServicesQuestionsList: build.query<servicesQApiResT, null>({
        query: () => ({ url: apiUris.passanger.receiptQuestionsUri }),
        providesTags: ["incompleteQuestionsList"],
      }),
      getPassRequestsList: build.query<requestListApiResT, number>({
        query: (data) => ({ url: apiUris.passanger.requestListUri + data  }),
        providesTags: ["servicesList"],
      }),
      getPassRequestSubservices: build.query<subserviceListApiResT, string>({
        query: (data) => ({ url: apiUris.passanger.subServiceUri + data }),
        providesTags: ["servicesSubList"],
      }),
      getPassUpdateInfo: build.query<editRequestApiResT, string | string[]>({
        query: (data) => ({ url: apiUris.passanger.editServiceUri + data }),
        providesTags: ["serviceEditInfo"],
      }),
      getPassTicketList: build.query<TicketListApiResT, null>({
        query: () => ({ url: apiUris.passanger.ticketListUri }),
        providesTags: ["ticketList"],
      }),
      getPassAddressList: build.query<AddressListApiResT, null>({
        query: () => ({ url: apiUris.passanger.AddressListUri }),
        providesTags: ["addressList"],
      }),
    };
  },
});

export const {
  endpoints,
  useGetPassIncompleteListQuery,
  useGetPassServicesQuestionsListQuery,
  useGetPassRequestsListQuery,
  useGetPassRequestInfoQuery,
  useLazyGetPassRequestSubservicesQuery,
  useGetPassUpdateInfoQuery,
  useGetPassTicketListQuery,
  useGetPassAddressListQuery,
} = PassQueryApi;
