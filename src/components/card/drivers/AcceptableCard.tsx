import React, { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import CallIcon from "@/public/assets/svg/phone.svg";
import ChevIcon from "@/public/assets/svg/chevron.svg";
import {
  useAcceptServiceMutation,
  useRejectServiceMutation,
} from "@/redux/api/DriversMutateApi";
import GenericButton from "../../form/GenericButton";
import { acceptableServicesApiResT } from "@/interface/driversApi.interface";
import TrashIcon from "@/public/assets/svg/trash.svg";

export default function AcceptableCard({
  data,
  accept,
  setModal,
}: {
  data: acceptableServicesApiResT["data"][0];
  accept: () => void;
  setModal: Dispatch<SetStateAction<number>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [acceptService, { isLoading: acceptLoading }] =
    useAcceptServiceMutation({
      selectFromResult: ({ isLoading, data }) => {
        if (data?.status === 200) {
          toast.success(data.message, {
            toastId: "acceptDService",
          });
        }
        return { isLoading };
      },
    });

  return (
    <div
      className={`flex flex-col bg-white rounded-md shadow-md overflow-hidden duration-300 ${
        isOpen ? "h-auto" : "h-32"
      } `}
    >
      <div className="flex flex-row items-center justify-between pb-1">
        <div className="flex flex-col gap-1 px-4">
          <div>
            {data.passenger_firstname} {data.passenger_lastname}
          </div>
          <div>شماره سرویس: {data.subservice_id}</div>
        </div>
        <div className="bg-dark01 text-white flex items-center justify-center gap-1 flex-col h-24 w-24 rounded-sm ">
          <span>{data.day}</span>
          <span>{data.date}</span>
          <span>{data.hour}</span>
        </div>
      </div>
      <div className="p-4 pt-0">
        <div
          className="flex items-center justify-center pb-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevIcon
            className={`text-red01 h-5 w-5 duration-200 ${
              isOpen ? " rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <Link href={"tel:" + data.passenger_phone}>
          <div className="flex flex-row items-center border-b border-red05 py-1 justify-between">
            <div className="text-red01 font-bold">{data.passenger_phone}</div>
            <CallIcon className="text-red01 h-7 w-7 cursor-pointer" />
          </div>
        </Link>
        <div className="border-b border-red05 py-1">
          {data.ask_details_from_passenger === 0
            ? "جزئیات سفر پرسیده نشود"
            : "جزئیات سفر پرسیده شود"}
        </div>
        <div className="border-b border-red05 py-1">
          {data.out_of_town === 0 ? "سفر درون شهری است" : "سفر برون شهری است"}
        </div>
        <div className="w-full border-b border-red05 py-1">
          آدرس مبدا :{" "}
          <span className="text-dark03">
            {data.origin_address || "وارد نشده"}
          </span>
        </div>
        <div className="w-full border-b border-red05 py-1">
          آدرس مقصد :{" "}
          <span className="text-dark03">
            {data.destination_address || "وارد نشده"}
          </span>
        </div>
        <div className="w-full border-red05 py-1">
          جزئیات :{" "}
          <span className="text-dark03">{data.description || "وارد نشده"}</span>
        </div>
        <div className="flex flex-row gap-2">
          <GenericButton
            color="blue"
            title="قبول سرویس"
            isLoading={acceptLoading}
            onClick={() => {
              acceptService(data.subservice_id).then(() => {
                accept();
              });
            }}
          />
          <button
            className="bg-red01 rounded-lg h-full flex justify-center items-center p-3"
            type="button"
            onClick={() => {
              setModal(data.subservice_id);
            }}
          >
            <TrashIcon className="text-white w-5 h-5" />
          </button>
          {/* <GenericButton
            color="red"
            type="submit"
            title="رد سرویس"
            isLoading={rejectLoading}
            onClick={() => {
              rejectService(data.subservice_id).then(() => {
                refetch();
              });
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}
