/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  calculateBearingAction,
  addLocationAction,
  changeGpsLocation,
} from "@/redux/slice/DriversSlice";
import { RootStateType } from "@/redux/store";

export default function useDriverLayout() {
  const dispatch = useAppDispatch();
  const { cityLocal, lid } = useAppSelector(
    (state: RootStateType) => state.DriversSlice
  );

  useEffect(() => {
    const interval1 = setInterval(function () {
      saveLocal();
    }, cityLocal * 1000);
    const interval2 = setInterval(function () {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          dispatch(
            calculateBearingAction({
              lat: position?.coords.latitude || 0,
              lon: position?.coords.longitude || 0,
            })
          );
        });
      }
    }, 10 * 1000);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [cityLocal, lid]);

  const saveLocal = () => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (PermissionStatus) {
        if (PermissionStatus.state == "granted") {
          dispatch(changeGpsLocation(true));
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
              dispatch(
                addLocationAction({
                  lat: +position?.coords.latitude.toFixed(7) || 0,
                  lon: +position?.coords.longitude.toFixed(7) || 0,
                  timestamp:
                    +position?.timestamp.toString().substring(0, 10) || 0,
                })
              );
            });
          }
        } else {
          if (lid !== 0) {
            dispatch(changeGpsLocation(false));
          }
        }
      });
  };

  const CheckGpsStat = () => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (PermissionStatus) {
        if (PermissionStatus.state == "granted") {
          dispatch(changeGpsLocation(true));
        } else {
          dispatch(changeGpsLocation(false));
        }
      });
  };

  return { CheckGpsStat };
}
