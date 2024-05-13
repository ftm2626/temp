/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import useDriverLayout from "@/hooks/drivers/useDriverLayout";
import Head from "next/head";
import CentralModal from "../modals/CentralModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootStateType } from "@/redux/store";
import { changeGpsLocation } from "@/redux/slice/DriversSlice";
import NavBar from "./Navbar";

export default function DriversLayout({
  children,
  isOnline,
}: {
  children: JSX.Element;
  isOnline: boolean;
}) {
  const { CheckGpsStat } = useDriverLayout();
  const dispatch = useAppDispatch();
  const { isGpsOn } = useAppSelector(
    (state: RootStateType) => state.DriversSlice
  );
  return (
    <>
      <Head>
        <title> وصال گشت - رانندگان</title>
      </Head>
      <NavBar bg="bg-red01" type="driver" shade="bg-red01/50" />
      <main className={`${true ? "pt-16" : "pt-20"} h-full`}>
        {children}
        {!isGpsOn && (
          <CentralModal show={!isGpsOn} setShow={CheckGpsStat} className="mr-0">
            <div className="bg-red01 rounded-md text-white text-center">
              <div className="p-4">برای ادامه gps را روشن کنید.</div>
              <div
                className="w-full p-2 border-t border-white cursor-pointer"
                onClick={CheckGpsStat}
              >
                تایید
              </div>
            </div>
          </CentralModal>
        )}
      </main>
    </>
  );
}
