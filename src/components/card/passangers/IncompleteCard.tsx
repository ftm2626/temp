import React, { useState } from "react";
import CallIcon from "@/public/assets/svg/phone.svg";
import ChevIcon from "@/public/assets/svg/chevron.svg";
import Link from "next/link";
import CarPlateCard from "../CarPlateCard";
import GenericButton from "../../form/GenericButton";
import { servicesListApiResT } from "@/interface/passangersApi.interface";
import TrashIcon from "@/public/assets/svg/trash.svg";

export default function IncompleteCard({
  data,
  setShow,
  setShowDelete,
  firstCard,
}: {
  data: servicesListApiResT["data"]["receipts"][0];
  setShow: React.Dispatch<React.SetStateAction<number>>;
  setShowDelete: React.Dispatch<React.SetStateAction<number>>;
  firstCard: number;
}) {
  return (
    <div
      className={`flex flex-col bg-white rounded-md shadow-md overflow-hidden p-4 gap-4`}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1 w-full">
          <div className="font-bold">
            <span className="font-bold text-blue01"> نام راننده : </span>
            {data.driver_name}
          </div>
          <Link href={"tel:" + data.driver_phone}>
            <div className="flex flex-row items-center  py-1.5 justify-between w-full">
              <div className="text-blue01 font-bold">{data.driver_phone}</div>
              <CallIcon className="text-blue01 h-7 w-7" />
            </div>
          </Link>
          {/* <div>
            <span className="font-bold text-blue01">شماره قبض :</span> {data.id}
          </div> */}
        </div>
        <div className="bg-dark01 text-white flex items-center justify-center flex-col h-24 w-24 rounded-sm min-w-[7rem]">
          <span>{data.day}</span>
          <span>{data.date}</span>
          <span>
            {data.type} - {data.driver_start_time}
          </span>
        </div>
      </div>
      {/* <div className="p-4 pt-0"> */}
      {/* <div className="flex flex-row items-center border-b border-blue05  py-1.5 justify-between">
          <div className="">
            <span className="font-bold text-blue01">شماره سرویس : </span>{" "}
            {data.subservice_id || "ندارد"}
          </div>
          <div>
            {data.car_brand} {data.car_model} {data.car_color}
          </div>
        </div> */}
      {/* <div className="flex flex-row items-center justify-between py-1.5">
          <CarPlateCard
            one={data.driver_car_plate3}
            two={data.driver_car_plate2}
            three={data.driver_car_plate1}
            four={data.driver_car_plate4}
          />
          <button
            className="bg-red01 rounded-lg h-full flex justify-center items-center p-3"
            onClick={() => setShowDelete(data.id)}
          >
            <TrashIcon className="text-white w-5 h-5" />
          </button>
        </div> */}
      {firstCard === data.id && (
        <div className="flex flex-row gap-2">
          <GenericButton
            color="blue"
            title="ثبت جزئیات"
            onClick={() => setShow(data.id)}
          />
          {/* <button
              className="bg-red01 rounded-lg h-full flex justify-center items-center p-3"
              onClick={() => setShowDelete(data.id)}
            >
              <TrashIcon className="text-white w-5 h-5" />
            </button> */}
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
