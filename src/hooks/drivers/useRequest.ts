/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostRequestServiceMutation } from "@/redux/api/DriversMutateApi";
import { useGetClientNamesQuery } from "@/redux/api/DriversQueryApi";
import { driverRequestFormInputT } from "@/interface/drivers.interface";
import { localUris } from "@/utils/uris";

export default function useRequest() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<driverRequestFormInputT>();

  const { data: passengersData } = useGetClientNamesQuery(null, {});

  const [request, { isLoading }] = usePostRequestServiceMutation({
    selectFromResult: ({ data, isLoading }) => {
      if (data?.status === 200) {
        toast.success(data.message, {
          toastId: "request",
        });
        router.push(localUris.driver.services);
      }
      return { data, isLoading };
    },
  });

  const requestFunc: SubmitHandler<driverRequestFormInputT> = (data) => {
    request({
      passenger_id: data.passenger_id.id,
      start_time: data.start_time,
      out_of_town: data.out_of_town,
    });
  };

  return {
    errors,
    control,
    isLoading,
    passengersData,
    register,
    requestFunc,
    handleSubmit,
  };
}
