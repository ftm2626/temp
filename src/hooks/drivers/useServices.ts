import { useState } from "react";
import {
  useGetCurrentServiceQuery,
  useGetAcceptableServiceQuery,
} from "@/redux/api/DriversQueryApi";
import { useRejectServiceMutation } from "@/redux/api/DriversMutateApi";
import { toast } from "react-toastify";

export default function useServices() {
  const [selected, setSelected] = useState(0);
  const [deleteModal, setDeleteModal] = useState(0);
  const tabs = [
    {
      id: 0,
      title: "سرویس های جاری",
    },
    {
      id: 1,
      title: "سرویس قابل پذیرش",
    },
  ];

  const {
    isFetching: currentLoading,
    data: currentData,
    refetch: refetchCurrent,
  } = useGetCurrentServiceQuery(null);
  const {
    data: servicesData,
    isFetching: servicesLoading,
    refetch: refetchAcceptable,
  } = useGetAcceptableServiceQuery(null);

  const acceptServiceFunc = () => {
    setSelected(0);
    refetchCurrent();
    refetchAcceptable();
  };

  const [rejectService, { isLoading: rejectLoading }] =
    useRejectServiceMutation({
      selectFromResult: ({ isLoading, data }) => {
        if (data?.status === 200) {
          toast.success(data.message, {
            toastId: "rejectDService",
          });
        }
        return { isLoading };
      },
    });

  return {
    tabs,
    selected,
    currentData,
    servicesData,
    currentLoading,
    servicesLoading,
    setSelected,
    refetchCurrent,
    acceptServiceFunc,
    deleteModal,
    setDeleteModal,
    rejectLoading,
    rejectService,
  };
}
