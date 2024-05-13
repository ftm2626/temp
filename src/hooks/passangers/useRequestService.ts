/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  usePassStoreRequestMutation,
  usePassRemoveRequestMutation,
  usePassUpdateRequestMutation,
} from "@/redux/api/PassMutateApi";
import {
  useGetPassRequestInfoQuery,
  useGetPassUpdateInfoQuery,
} from "@/redux/api/PassQueryApi";
import { registrationApiSendT } from "@/interface/passangersApi.interface";
import { submitRequestFormInputT } from "@/interface/passangers.interface";
import { localUris } from "@/utils/uris";

export default function useRequestService({
  editId,
}: {
  editId?: string | string[];
}) {
  const router = useRouter();
  const {
    control,
    register,
    setValue,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<submitRequestFormInputT>();

  const [selected, setSelected] = useState(0);
  const [selectedAirport, setSelectedAirport] = useState("tta");
  const [deleteModal, setDeleteModal] = useState(0);

  const tabs = [
    {
      id: 0,
      title: "در اختیار",
    },
    {
      id: 1,
      title: "تک مسیر",
    },
    {
      id: 2,
      title: "فرودگاهی",
    },
  ];
  const subAirport = [
    {
      id: "tta",
      title: "ترنسفر به فرودگاه",
    },
    {
      id: "tfa",
      title: "ترنسفر از فرودگاه",
    },
  ];
  const { data: infoListData } = useGetPassRequestInfoQuery(null);

  const {
    data: editData,
    isSuccess: isEditSuccess,
    isFetching: fetchingEdit,
  } = useGetPassUpdateInfoQuery(editId || "0", {
    skip: editId ? false : true,
  });

  const [createReport, { isLoading: createReportLoading }] =
    usePassStoreRequestMutation({
      selectFromResult: ({ data, isLoading }) => {
        if (data?.status === 200) {
          toast.success(data.message, {
            toastId: "createRequest",
          });
          router.push(localUris.passanger.requestList);
        }
        return { isLoading };
      },
    });

  const [updateReport, { isLoading: updateLoading }] =
    usePassUpdateRequestMutation({
      selectFromResult: ({ data, isLoading }) => {
        if (data?.status === 200) {
          toast.success(data.message, {
            toastId: "updateRequest",
          });
          router.push(localUris.passanger.requestList);
        }
        return { isLoading };
      },
    });

  const [deleteReport, { isLoading: deleteLoading }] =
    usePassRemoveRequestMutation({
      selectFromResult: ({ isLoading, data }) => {
        if (data?.status === 200) {
          toast.success(data.message, {
            toastId: "deleteRequest",
          });
          router.push(localUris.passanger.requestList);
        }
        return { isLoading };
      },
    });

  useEffect(() => {
    if (isEditSuccess && editData && editId) {
      const origin_city = editData?.data?.cities?.find(
        ({ id }) => id == editData.data?.service?.origin_city
      );
      const destination_city = editData?.data?.cities?.find(
        ({ id }) => id == editData.data?.service?.destination_city
      );
      const airport_id = editData?.data?.airports?.find(
        ({ id }) => id == editData.data?.service?.transfer?.airport_id
      );
      const airline = editData?.data?.airlines?.find(
        ({ id }) => id == editData.data?.service?.transfer?.airline
      );
      setValue("origin_city", origin_city);
      setValue("destination_city", destination_city);
      setValue("airport_id", airport_id);
      setValue("airline_id", airline);
      setValue("hour", editData.data?.service?.hour);
      setValue(
        "departure_date",
        +editData.data?.service?.departure_date * 1000
      );
      setValue("origin", editData.data?.service?.origin);
      setValue("destination", editData.data?.service?.destination);
      setValue("return_date", +editData.data?.service?.return_date * 1000);
      setValue("return_time", editData.data?.service?.return_time);
      setValue("airport_type", editData.data?.service?.airport_type);
      setValue("terminal", editData.data?.service?.transfer?.terminal);
      setValue(
        "flight_number",
        editData.data?.service?.transfer?.flight_number
      );
      setValue("description", editData.data?.service?.description);
      setSelected(editData.data?.service?.sub_service_type_id);
      setSelectedAirport(editData.data?.service?.airport_type);
    }
  }, [isEditSuccess]);

  const submitForm: SubmitHandler<submitRequestFormInputT> = async (data) => {
    let body: registrationApiSendT = {};
    switch (selected) {
      case 0:
        body.origin_city = data.origin_city?.id;
        body.destination_city = data.destination_city?.id;
        body.departure_date = Math.round((data.departure_date || 1000) / 1000);
        body.hour = data.hour;
        body.return_date = Math.round((data.return_date || 1000) / 1000);
        body.return_time = data.return_time;
        body.origin = data.origin;
        body.destination = data.destination;
        body.description = data.description;
        break;
      case 1:
        body.origin_city = data.origin_city?.id;
        body.destination_city = data.destination_city?.id;
        body.departure_date = Math.round((data.departure_date || 1000) / 1000);
        body.hour = data.hour;
        body.origin = data.origin;
        body.destination = data.destination;
        body.description = data.description;

        break;
      case 2:
        body.origin_city = data.origin_city?.id;
        body.destination_city = data.destination_city?.id;
        body.departure_date = Math.round((data.departure_date || 1000) / 1000);
        body.hour = data.hour;
        body.terminal = data.terminal;
        body.airport_id = data.airport_id?.id;
        body.airport_type = selectedAirport;

        if (selectedAirport === "tfa") {
          body.destination = data.destination;
          body.airline_id = data.airline_id?.id;
          body.flight_number = data.flight_number;
        } else {
          body.origin = data.origin;
        }
        body.description = data.description;

        break;
      default:
        break;
    }
    body.subtype = selected;
    editId ? updateReport({ data: body, id: +editId }) : createReport(body);
  };

  return {
    errors,
    control,
    selected,
    subAirport,
    fetchingEdit,
    infoListData,
    selectedAirport,
    updateLoading,
    register,
    submitForm,
    handleSubmit,
    setSelectedAirport,
    deleteModal,
    setDeleteModal,
    deleteLoading,
    deleteReport,
    setValue,
    tabs,
    setSelected,
    createReportLoading,
    getValues,
    watch,
  };
}
