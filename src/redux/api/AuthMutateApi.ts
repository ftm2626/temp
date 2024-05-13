import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery";
import { apiUris } from "@/utils/uris";
import {
  chatTokenResT,
  forgotPasswordApiSendT,
  forgotPasswordResT,
  loginApiResT,
  loginApiSendT,
} from "@/interface/authApi.interface";
import { userAgentFromString } from "next/server";
const agent = userAgentFromString("");
export const AuthMutateApi = createApi({
  reducerPath: "AuthMutateApi",
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  tagTypes: [],
  endpoints(build) {
    return {
      login: build.mutation<loginApiResT, loginApiSendT>({
        query: ({ password, phone }) => ({
          url: apiUris.auth.loginUri,
          method: "post",
          data: { phone: phone, password: password },
        }),
      }),
      forgotPassword: build.mutation<
        forgotPasswordResT,
        forgotPasswordApiSendT
      >({
        query: ({ phone }) => ({
          url: apiUris.auth.resetPassword,
          method: "post",
          data: { phone: phone },
        }),
      }),
      getChatToken: build.mutation<chatTokenResT, null>({
        query: () => ({
          url: apiUris.auth.getChatToken,
          method: "post",
          data: { agent: agent.ua },
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useGetChatTokenMutation,
  endpoints,
} = AuthMutateApi;
