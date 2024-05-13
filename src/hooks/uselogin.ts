import {
  forgotPasswordApiSendT,
  loginApiSendT,
} from "@/interface/authApi.interface";
import {
  useForgotPasswordMutation,
  useGetChatTokenMutation,
  useLoginMutation,
} from "@/redux/api/AuthMutateApi";
import { useGpsInfoQuery } from "@/redux/api/DriversQueryApi";
import { useAppSelector } from "@/redux/hooks";
import { RootStateType } from "@/redux/store";
import { localUris } from "@/utils/uris";
import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Uselogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginApiSendT>();

  const {
    register: forgotRegister,
    handleSubmit: forgotHandle,
    formState: { errors: forgotErrors },
  } = useForm<forgotPasswordApiSendT>();

  const { role } = useAppSelector((state: RootStateType) => state.AuthSlice);

  const [getChatToken] = useGetChatTokenMutation();
  const [login, { isLoading: loginLoading, status }] = useLoginMutation({
    selectFromResult: ({ data, isLoading, status }) => {
      if (data?.status === 201) {
        switch (data?.data?.role) {
          case "مسافر":
            redirect(localUris.passanger.index);
          case "راننده":
            redirect(localUris.driver.index);
          default:
            break;
        }
      }
      return { isLoading, status };
    },
  });
  const [forgotPassword, { isLoading: forgotLoading }] =
    useForgotPasswordMutation({
      selectFromResult: ({ data, isLoading }) => {
        if (data?.status === 200) {
          toast.success(data?.message, { toastId: "forgotPassword" });
          redirect(localUris.auth.login);
        }
        return { isLoading };
      },
    });

  useGpsInfoQuery(null, {
    skip: role !== "راننده" || status !== "fulfilled",
  });

  const loginFunc: SubmitHandler<loginApiSendT> = async (data) => {
    await login(data);
    // await getChatToken(null);
  };

  const forgotPasswordFunc: SubmitHandler<forgotPasswordApiSendT> = (data) => {
    forgotPassword(data);
  };

  return {
    errors,
    loginLoading,
    forgotLoading,
    register,
    loginFunc,
    handleSubmit,
    forgotPasswordFunc,
    forgotErrors,
    forgotHandle,
    forgotRegister,
  };
}
