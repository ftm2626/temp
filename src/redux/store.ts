import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import PassSlice from "./slice/PassSlice";
import AuthSlice from "./slice/AuthSlice";
import ChatSlice from "./slice/chatSlice";
import DriversSlice from "./slice/DriversSlice";
import { PassQueryApi } from "./api/PassQueryApi";
import { AuthMutateApi } from "./api/AuthMutateApi";
// import { PassMutateApi } from "./api/PassMutateApi";
import { DriversQueryApi } from "./api/DriversQueryApi";
import { DriversMutateApi } from "./api/DriversMutateApi";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["AuthSlice", "DriversSlice"],
};

const rootReducer = combineReducers({
  DriversSlice,
  AuthSlice,
  PassSlice,
  ChatSlice,
  [AuthMutateApi.reducerPath]: AuthMutateApi.reducer,
  [DriversQueryApi.reducerPath]: DriversQueryApi.reducer,
  [PassQueryApi.reducerPath]: PassQueryApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      AuthMutateApi.middleware,
      DriversQueryApi.middleware,
      PassQueryApi.middleware,
    ),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
