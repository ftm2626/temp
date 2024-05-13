import React, { useState } from "react";
import CallIcon from "@/public/assets/svg/phone.svg";
import ChevIcon from "@/public/assets/svg/chevron.svg";
import Link from "next/link";
import { completeReceiptsApiResT } from "@/interface/driversApi.interface";

export default function CompletesCard({
  data,
}: {
  data: completeReceiptsApiResT["data"][0];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`flex flex-col bg-white rounded-md p-4 shadow-md overflow-hidden duration-300 ${
        isOpen ? "h-auto" : "h-28"
      } `}
    >
      <div className="flex flex-row items-center justify-between  pb-1">
        <div className="flex flex-col gap-1">
          <div className="font-bold">
            {data.passenger_first_name} {data.passenger_last_name}
          </div>
          <div>
            {data.day} {data.date}{" "}
          </div>
        </div>
        <div>
          <Link href={"tel:" + data.passenger_phone}>
            <CallIcon className="text-red01 h-7 w-7 cursor-pointer" />
          </Link>
        </div>
      </div>
      <div
        className="flex items-center justify-center py-1.5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevIcon
          className={`text-red01 h-5 w-5 duration-200 ${
            isOpen ? " rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div className="flex flex-row items-center border-b border-red05 py-1.5">
        <div className="w-full">
          شماره قبض : <span className="text-dark03">{data.id}</span>
        </div>
        <div className="w-full">
          شرکت : <span className="text-dark03">{data.company}</span>
        </div>
      </div>
      <div className="flex flex-row items-center border-b border-red05 py-1.5">
        <div className="w-full">
          ساعت شروع : <span className="text-dark03">{data.start_time}</span>
        </div>
        <div className="w-full">
          ساعت پایان : <span className="text-dark03">{data.end_time}</span>
        </div>
      </div>
      <div className=" border-b border-red05 py-1.5">
        {data.out_of_town === 1 ? "سفر برون شهری است" : "سفر درون شهری است"}
      </div>
      {data.address && <div className="pt-1">
        آدرس :{" "}
        <span className="text-dark03">{data.address}</span>
      </div>}
    </div>
  );
}
