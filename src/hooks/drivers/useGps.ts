/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  useStartServiceMutation,
  useEndServiceMutation,
} from "@/redux/api/DriversMutateApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { lidInfoAction } from "@/redux/slice/DriversSlice";
import { RootStateType } from "@/redux/store";

export default function useGps({
  id,
  status_id,
  refetch,
}: {
  id: number;
  status_id: number;
  refetch: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [gpsModal, setGpsModal] = useState(0);
  const dispatch = useAppDispatch();
  const { lid } = useAppSelector((state: RootStateType) => state.DriversSlice);
  const [startService, { isLoading: startLoading }] = useStartServiceMutation();
  const [endService, { isLoading: endLoading }] = useEndServiceMutation();

  useEffect(() => {
    if (lid === 0 && status_id === 1) {
      dispatch(lidInfoAction({ id: id }));
    } else if (lid !== 0 && lid === id && status_id === 0) {
      dispatch(lidInfoAction({ id: 0 }));
    }
  }, [status_id]);

  const submit = () => {
    if (status_id === 0) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (PermissionStatus) {
          if (PermissionStatus.state == "granted") {
            startService(id).then(() => {
              refetch();
            });
          } else {
            setGpsModal(1);
          }
        });
    } else {
      endService(id).then(() => {
        refetch();
      });
    }
  };

  return {
    isOpen,
    gpsModal,
    endLoading,
    startLoading,
    submit,
    setIsOpen,
    setGpsModal,
  };
}
