import { useState } from "react";
import { toast } from "react-toastify";
import {
  usePassCreateAddressMutation,
  usePassEditAddressMutation,
} from "@/redux/api/PassMutateApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddressFormInputT } from "@/interface/passangers.interface";
import { storeAddressApiSendT } from "@/interface/passangersApi.interface";
import { useGetPassAddressListQuery } from "@/redux/api/PassQueryApi";
import { useRouter } from "next/navigation";

export default function UseAddresses() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddressFormInputT>();
  const [showModal, setShowModal] = useState(0);
  const router = useRouter();
  const { isFetching: addressLoading, data: addressListData } =
    useGetPassAddressListQuery(null);

  const [createAddressMutation, { isLoading: createAddressLoading }] =
    usePassCreateAddressMutation({
      selectFromResult: ({ isLoading, data }) => {
        if (data?.status === 200) {
          toast.success(data.message, {
            toastId: "createAddress",
          });
          router.refresh();
        }
        return { isLoading };
      },
    });

  const [editAddressMutation, { isLoading: editAddressLoading }] =
    usePassEditAddressMutation({
      selectFromResult: ({ isLoading, data, status }) => {
        if (data?.status === 200 && status !== "fulfilled") {
          toast.success(data.message, {
            toastId: "editAddress",
          });
          router.refresh();
        }
        return { isLoading };
      },
    });

  const getEditData = (editId: number) => {
    if (editId < 0) {
      setValue("title", "");
      setValue("description", "");
      setValue("status", 1);
    } else {
      const data = addressListData?.data.find(({ id }) => id === editId);
      setValue("title", data?.title || "");
      setValue("description", data?.description || "");
      setValue("status", data?.status || 0);
    }
    setShowModal(editId);
  };

  const storeAddress: SubmitHandler<storeAddressApiSendT> = ({
    description,
    title,
  }) => {
    createAddressMutation({
      description,
      title,
    }).then(() => setShowModal(0));
  };

  const editAddress: SubmitHandler<storeAddressApiSendT> = ({
    description,
    title,
    status,
  }) => {
    editAddressMutation({
      description,
      title,
      status,
      id: showModal,
    }).then(() => setShowModal(0));
  };

  return {
    errors,
    register,
    showModal,
    setShowModal,
    addressListData,
    addressLoading,
    getEditData,
    getValues,
    setValue,
    createAddressLoading,
    editAddressLoading,
    storeAddress,
    editAddress,
    handleSubmit,
  };
}
