import { useState } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slice/AuthSlice";
import { menuListT } from "@/interface/auth.interface";
import { RootStateType } from "@/redux/store";
import { resetDriver } from "@/redux/slice/DriversSlice";
import { localUris } from "@/utils/uris";
import { PassQueryApi } from "@/redux/api/PassQueryApi";

export default function useNavbar() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useAppDispatch();
  const { hasService } = useAppSelector(
    (state: RootStateType) => state.AuthSlice
  );

  const { driver_has_calender } = useAppSelector(
    (state: RootStateType) => state.DriversSlice
  );

  
  const passMenuList: menuListT = [
    {
      id: 0,
      title: "داشبورد",
      link: localUris.passanger.index,
      inMenu: true,
    },
    {
      id: 1,
      title: "در انتظار تکمیل",
      link: localUris.passanger.incomplete,
      inMenu: true,
    },
    {
      id: 2,
      title: "ثبت درخواست",
      link: localUris.passanger.requestRegistration,
      inMenu: hasService === 1 ? true : false,
    },
    {
      id: 9,
      title: "درخواست های من",
      link: localUris.passanger.requestList,
      inMenu: true,
    },
    {
      id: 5,
      title: "آدرس های من",
      link: localUris.passanger.addresses,
      inMenu: true,
    },
    {
      id: 3,
      title: "گزارش",
      link: localUris.passanger.reportList,
      inMenu: true,
    },
    {
      id: 4,
      title: "ثبت تیکت",
      link: localUris.passanger.support,
      inMenu: true,
    },
    // {
    //   id: 8,
    //   title: "چت",
    //   link: localUris.chat.index,
    //   inMenu: true,
    // },
    {
      id: 6,
      title: "ثبت تیکت",
      inMenu: false,
      link: localUris.passanger.requestSupport,
    },
    {
      id: 7,
      title: "ویرایش درخواست",
      inMenu: false,
      link: localUris.passanger.request,
    },
  ];

  const DriverMenuList: menuListT = [
    {
      id: 0,
      title: "داشبورد",
      link: localUris.driver.index,
      inMenu: true,
    },
    {
      id: 1,
      title: "سرویس ها",
      link: localUris.driver.services,
      inMenu: true,
    },
    {
      id: 3,
      title: "ثبت درخواست",
      link: localUris.driver.requestRegistration,
      inMenu: true,
    },
    {
      id: 7,
      title: "تقویم",
      link: localUris.driver.calender,
      inMenu: driver_has_calender,
    },
    {
      id: 4,
      title: "خودرو",
      link: localUris.driver.carInfo,
      inMenu: true,
    },
    {
      id: 5,
      title: "قبض تکمیل نشده",
      link: localUris.driver.incomplete,
      inMenu: true,
    },
    {
      id: 6,
      title: "سرویس های انجام شده",
      link: localUris.driver.compelete,
      inMenu: true,
    },
    // {
    //   id: 8,
    //   title: "چت",
    //   link: localUris.chat.index,
    //   inMenu: true,
    // },
  ];

  const inspectMenuList: menuListT = [
    {
      id: 1,
      title: "لیست  رانندگان",
      link: localUris.inspectors.index,
      inMenu: true,
    },
  ];

  const logoutFunc = () => {
    router.push(localUris.auth.login)
    deleteCookie("vesal-pwa-token");
    deleteCookie("vesal-chat-token");
    dispatch(logout());
    dispatch(resetDriver());
    // dispatch(PassQueryApi.util.resetApiState())
  };

  return {
    passMenuList,
    DriverMenuList,
    openMenu,
    setOpenMenu,
    logoutFunc,
    inspectMenuList,
  };
}
