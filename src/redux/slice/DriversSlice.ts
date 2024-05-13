import axiosClient from "@/utils/axios";
import { apiUris } from "@/utils/uris";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { DriversMutateApi } from "../api/DriversMutateApi";
import { toast } from "react-toastify";
import { DriversQueryApi } from "../api/DriversQueryApi";
import {
  driversInitStateT,
  driversLocation,
  driversBearing,
} from "@/interface/redux.interface";

const initialState: driversInitStateT = {
  lid: 0,
  locations: [],
  bearingLoc1: { lat: 0, lon: 0 },
  bearingLoc2: { lat: 0, lon: 0 },
  bearing: 0,
  cityLocal: 20,
  interCityLocal: 20,
  isGpsOn: true,
  driver_has_calender: false,
};

export const DriversSlice = createSlice({
  name: "DriversSlice",
  initialState,
  reducers: {
    lidInfoAction: (state, action: PayloadAction<{ id: number }>) => {
      state.lid = action.payload.id;
    },
    addLocationAction: (state, action: PayloadAction<driversLocation>) => {
      if (state.lid !== 0) {
        state.locations.push({
          bearing: state.bearing,
          lat: action.payload.lat,
          lid: state.lid,
          lon: action.payload.lon,
          timestamp: action.payload.timestamp,
        });
        DriversSlice.caseReducers.saveLocaitonAction(state);
      }
    },
    calculateBearingAction: (state, action: PayloadAction<driversBearing>) => {
      const a = state.bearingLoc2;
      const b = action.payload;
      const dl = a.lon - b.lon;
      const x = Math.cos(a.lat) * Math.sin(dl);
      const y =
        Math.cos(b.lat) * Math.sin(a.lat) -
        Math.sin(b.lat) * Math.cos(a.lat) * Math.cos(dl);
      const z = Math.atan2(x, y) * (180 / Math.PI);
      const bearing = (z + 360) % 360;
      state.bearing = bearing;
      state.bearingLoc2 = action.payload;
    },
    saveLocaitonAction: (state) => {
      console.log(current(state.locations));
      axiosClient.post(apiUris.driver.locationsUri, {
        locations: current(state.locations),
      });
      state.locations = [];
    },
    changeGpsLocation: (state, action: PayloadAction<boolean>) => {
      state.isGpsOn = action.payload;
    },
    resetDriver: () => initialState,
  },
  extraReducers(builder) {
    builder.addMatcher(
      DriversMutateApi.endpoints.startService.matchFulfilled,
      (state, { payload }) => {
        if (payload.status === 200) {
          toast.success(payload.message, {
            toastId: "startDService",
          });
          state.lid = payload.data.id;
          // send initial location
          const initialLocation: driversLocation = {};
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
              initialLocation.lat = +position?.coords.latitude.toFixed(7) || 0;
              initialLocation.lon = +position?.coords.longitude.toFixed(7) || 0;
              initialLocation.timestamp =
                +position?.timestamp.toString().substring(0, 10) || 0;
              initialLocation.bearing = 0;
              initialLocation.lid = payload.data.id;
              axiosClient.post(apiUris.driver.locationsUri, {
                locations: initialLocation,
              });
            });
          }
        }
      }
    );
    builder.addMatcher(
      DriversMutateApi.endpoints.endService.matchFulfilled,
      (state, { payload }) => {
        if (payload.status === 200) {
          toast.success(payload.message, {
            toastId: "endDService",
          });
          state.lid = 0;
          state.locations = [];
        }
      }
    );
    builder.addMatcher(
      DriversQueryApi.endpoints.gpsInfo.matchFulfilled,
      (state, { payload }) => {
        if (payload.status === 200) {
          const options = payload.data?.options;

          const incitytimemobile = options.find(
            ({ key }: { key: string }) => key === "in-city-time-Mobile"
          );
          const intercitytimeServer = options.find(
            ({ key }: { key: string }) => key === "intercity-time-server"
          );

          state.driver_has_calender = payload?.data?.driver_has_calender;
          state.cityLocal = incitytimemobile ? +incitytimemobile.value : 0;
          state.interCityLocal = intercitytimeServer
            ? +intercitytimeServer.value
            : 0;
        }
      }
    );
  },
});

export const {
  lidInfoAction,
  addLocationAction,
  calculateBearingAction,
  changeGpsLocation,
  resetDriver,
} = DriversSlice.actions;
export default DriversSlice.reducer;
