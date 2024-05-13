import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
import { AuthMutateApi } from "../api/AuthMutateApi";
import { authInitStateT } from "@/interface/redux.interface";
import { Socket } from "socket.io-client";

const initialState: authInitStateT = {
  name: "",
  phone: "",
  role: "",
  hasService: 0,
  chatToken: "",
  socket: null,
  group:"",
  compony:""
};

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<{ socket: Socket }>) => {
      state.socket = action.payload.socket;
    },
    logout: () => initialState,
  },
  extraReducers(builder) {
    builder.addMatcher(
      AuthMutateApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        if (payload.status === 201) {
          setCookie("vesal-pwa-token", payload?.data?.token, {
            maxAge: 3153600,
          });
          setCookie("vesal-pwa-role", payload?.data?.role, {
            maxAge: 3153600,
          });
          state.name =
            payload?.data?.first_name + " " + payload?.data?.last_name;
          state.phone = payload?.data?.phone;
          state.role = payload?.data?.role;
          state.group = payload?.data?.group_name
          state.hasService = payload?.data?.has_service_request;
        state.compony = payload?.data?.company_name;
        }
      }
    );
    builder.addMatcher(
      AuthMutateApi.endpoints.getChatToken.matchFulfilled,
      (state, { payload }) => {
        if (payload?.status === 200) {
          state.chatToken = payload.data.token;
          setCookie("vesal-chat-token", payload?.data?.token, {
            maxAge: 3153600,
          });
        }
      }
    );
  },
});

export const { logout, setSocket } = AuthSlice.actions;
export default AuthSlice.reducer;
