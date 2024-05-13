import React, { useState } from "react";
import CallIcon from "@/public/assets/svg/phone.svg";
import ChevIcon from "@/public/assets/svg/chevron.svg";
import Link from "next/link";
import { incompleteReceiptsApiResT } from "@/interface/driversApi.interface";

export default function IncompletesCard({
  data,
}: {
  data: incompleteReceiptsApiResT["data"][0];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`flex flex-col bg-white rounded-md p-4 shadow-md overflow-hidden duration-300 ${
        isOpen ? "h-72" : "h-28"
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
      <div className="border-b border-red05 py-1.5">
        شماره قبض : <span className="text-dark03">{data.id}</span>
      </div>
      <div className="border-b border-red05 py-1.5">
        شرکت : <span className="text-dark03">{data.company}</span>
      </div>
      <div className=" border-b border-red05 py-1.5">
        {data.out_of_town ? "سفر برون شهری است" : "سفر درون شهری است"}
      </div>
      <div className="pt-1">
        زمان سفر : <span className="text-dark03">{data.type}</span>
      </div>
    </div>
  );
}
