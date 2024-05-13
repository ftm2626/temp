import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_BACK,
});

axiosClient.interceptors.response.use(
  (response: any) => {
    if ((response && response?.status === 200) || response.status === 201) {
      return response;
    }
  },
  (err) => {
    const response = err && err?.response;
    const errors = response?.data?.errors;
    if(response.status === 401){
      deleteCookie("vesal-pwa-token");
      deleteCookie("vesal-chat-token");
    }
    if (errors) {
      if (typeof errors === "object") {
        Object.values(errors).map((item: any) => toast.error(item.toString()));
      } else {
        errors.map((item: string) => toast.error(item));
      }
    } else {
      toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید!", {
        toastId: "unknown",
      });
      return Promise.reject("Axios config, An error accured!");
    }
  }
);

axiosClient.interceptors.request.use(
  (config) => {
    const token = getCookie("vesal-pwa-token");
    if (config != undefined && config.headers != undefined) {
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
