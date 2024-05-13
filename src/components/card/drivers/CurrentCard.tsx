import React from "react";
import CallIcon from "@/public/assets/svg/phone.svg";
import ChevIcon from "@/public/assets/svg/chevron.svg";
import Link from "next/link";
import GenericButton from "../../form/GenericButton";
import { currentServicesApiResT } from "@/interface/driversApi.interface";
import useGps from "@/hooks/drivers/useGps";
import CentralModal from "@/components/modals/CentralModal";
import moment from "jalali-moment";

export default function CurrentCard({
  data,
  first,
  refetch,
}: {
  data: currentServicesApiResT["data"]["all_receipts"][0];
  first: number;
  refetch: any;
}) {
  const {
    isOpen,
    gpsModal,
    endLoading,
    startLoading,
    submit,
    setIsOpen,
    setGpsModal,
  } = useGps({
    id: data.id,
    status_id: data.status_id,
    refetch,
  });

  return (
    <div
      className={`flex flex-col bg-white rounded-md shadow-md text-lg overflow-hidden duration-300 ${
        isOpen ? (first === data.id ? "h-68" : "h-[20rem]") : "h-32"
      } `}
    >
      <div className="flex flex-row items-center justify-between  pb-1">
        <div className="flex flex-col gap-1 px-4">
          <div className="font-bold">{data.passenger}</div>
          <div>ساعت : {data.start_time}</div>
        </div>
        <div
          className={`${
            data.status_id === 0 ? "bg-dark01" : "bg-red01"
          } text-white flex items-center justify-center gap-1 flex-col h-24 w-24 rounded-sm`}
        >
          <span>{data.day}</span>

          <span>{moment(data.date).locale("fa").format("YYYY/MM/DD")}</span>
          <span>{data.type}</span>
        </div>
      </div>
      <div className="p-4 pt-0">
        <div
          className="flex items-center justify-center cursor-pointer pb-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevIcon
            className={`text-red01 h-5 w-5 duration-200 ${
              isOpen ? " rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <Link href={"tel:" + data.passenger_phone}>
          <div className="flex flex-row items-center border-b border-red05 py-2 justify-between text-red01 font-bold">
            <div className="">{data.passenger_phone}</div>
            <CallIcon className="text-red01 h-7 w-7 cursor-pointer" />
          </div>
        </Link>
        <div className="flex flex-row items-center border-b border-red05 py-2 justify-between">
          <div>شماره قبض : {data.id}</div>
          <div>شماره سرویس : {data.subservice_id|| "ندارد"} </div>
        </div>
        <div className=" border-red05 py-2">
          {data.out_of_town === 0 ? "سفر درون شهری است" : "سفر برون شهری است"}
        </div>
        {/* {first === data.id && ( */}
          <GenericButton
            color="red"
            title={data.status_id === 0 ? "به مسافر رسیدم" : "اتمام سفر"}
            isLoading={startLoading || endLoading}
            onClick={submit}
          />
        {/* // )} */}
      </div>
      {gpsModal !== 0 && (
        <CentralModal show={gpsModal} setShow={setGpsModal}>
          <div className="bg-red01 rounded-md text-white text-center">
            <div className="p-4">برای ادامه gps را روشن کنید.</div>
            <div
              className="w-full p-2 border-t border-white cursor-pointer"
              onClick={() => setGpsModal(0)}
            >
              تایید
            </div>
          </div>
        </CentralModal>
      )}
    </div>
  );
}
