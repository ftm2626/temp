import { requestSupportApiSendT } from "@/interface/passangersApi.interface";
import { usePassCreateTicketMutation } from "@/redux/api/PassMutateApi";
import { localUris } from "@/utils/uris";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function useRequestTicket() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<requestSupportApiSendT>();

  const [info, setInfo] = useState<requestSupportApiSendT>({
    subject: "",
    priority: "low",
    message: "",
  });
  
  const prioritySelectOptions = [
    { id: 1, title: "کم", value: "low" },
    { id: 2, title: "متوسط", value: "normal" },
    { id: 3, title: "زیاد", value: "high" },
  ];

  const [createTicket, { isLoading }] = usePassCreateTicketMutation({
    selectFromResult: ({ isLoading, data }) => {
      if (data?.status === 200) {
        toast.success(data.message, {
          toastId: "createTicket",
        });
        router.push(localUris.passanger.support);
      }
      return { isLoading };
    },
  });

  const submitTicket: SubmitHandler<requestSupportApiSendT> = ({
    message,
    subject,
  }) => {
    createTicket({
      subject: subject,
      priority: info.priority,
      message: message,
    });
  };

  return {
    info,
    errors,
    isLoading,
    prioritySelectOptions,
    setInfo,
    register,
    handleSubmit,
    submitTicket,
  };
}
