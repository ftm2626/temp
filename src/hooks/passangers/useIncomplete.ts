import { useState } from "react";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useGetPassRequestInfoQuery,
  useGetPassIncompleteListQuery,
  useGetPassServicesQuestionsListQuery,
} from "@/redux/api/PassQueryApi";
import {
  usePassAcceptServiceMutation,
  usePassRemoveServiceMutation,
} from "@/redux/api/PassMutateApi";
import { acceptServiceFormInputT } from "@/interface/passangers.interface";
import { useRouter } from "next/navigation";

export default function useIncomplete() {
  const {
    control,
    watch,
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<acceptServiceFormInputT>();
  const router = useRouter()
  const [showModal, setShowModal] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(0);
  const [questions, setQuestions] = useState<number[]>([]);
  const [showsecondModal, setShowsecondModal] = useState(0);

  const { data: infoListData } = useGetPassRequestInfoQuery(null);

  const { data: servicesQListData } =
    useGetPassServicesQuestionsListQuery(null);

  const { isFetching: servicesListLoading, data: servicesListData } =
    useGetPassIncompleteListQuery(null);

  const [acceptService, { isLoading: acceptLoading }] =
    usePassAcceptServiceMutation({
      selectFromResult: ({ isLoading, data }) => {
        if (data?.status === 200) {
          toast.success(data.message, {
            toastId: "acceptService",
          });
          router.refresh()
        }
        return { isLoading };
      },
    });

  const [removeService, { isLoading: removeLoading }] =
    usePassRemoveServiceMutation({
      selectFromResult: ({ isLoading, data }) => {
        if (data?.status === 200) {
          toast.success(data.message, {
            toastId: "deleteService",
          });
        }
        return { isLoading };
      },
    });

  const addToQ = (id: number) => {
    const list = questions;
    const exists = list?.findIndex((dataId) => dataId == id);
    if (exists === -1) {
      list?.push(id);
      setQuestions([...list]);
    }
  };

  const removeFromQ = (id: number) => {
    const list = questions?.filter((dataId) => id !== dataId);
    setQuestions(list);
  };

  const onSubmit: SubmitHandler<acceptServiceFormInputT> = (body) => {
    if (watch("out_of_town")) {
      setShowsecondModal(showModal);
    } else {
      submitForm(body);
    }
  };

  const submitForm: SubmitHandler<acceptServiceFormInputT> = (body) => {
    const data = {
      address: body.address,
      out_of_town: body.out_of_town || undefined,
      end_time: body.end_time + ":00",
      start_time: body.start_time + ":00",
      questions: questions,
      origin_city: body.origin_city?.id,
      destination_city: body.destination_city?.id,
    };
    acceptService({ data: data, id: showModal }).then(() => {
      setShowModal(0);
      setShowsecondModal(0);
      resetForm();
    });
  };

  const onDelete = () => {
    removeService(showDeleteModal).then(() => {
      setShowModal(0);
      setShowsecondModal(0);
      setShowDeleteModal(0);
      resetForm()
    });
  };

  return {
    errors,
    control,
    showModal,
    questions,
    infoListData,
    removeLoading,
    acceptLoading,
    showsecondModal,
    showDeleteModal,
    servicesListData,
    servicesQListData,
    servicesListLoading,
    watch,
    addToQ,
    onSubmit,
    register,
    submitForm,
    removeFromQ,
    setShowModal,
    handleSubmit,
    setShowsecondModal,
    setShowDeleteModal,
    onDelete,
  };
}
