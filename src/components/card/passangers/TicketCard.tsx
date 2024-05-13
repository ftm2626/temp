import React, { useState } from "react";
import ChevIcon from "@/public/assets/svg/chevron.svg";
import { TicketListApiResT } from "@/interface/passangersApi.interface";

export default function TicketCard({
  data,
}: {
  data: TicketListApiResT["data"][0];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`flex flex-col bg-white rounded-md shadow-md overflow-hidden duration-300 ${
        isOpen ? "auto" : "h-36"
      } `}
    >
      <div className="p-4 pb-0 flex flex-col gap-1.5">
        <div className="flex flex-row justify-between gap-1">
          <div  className="font-bold text-blue01">شماره تیکت </div>
          <div>{data.id}</div>
        </div>
        <div className="flex flex-row justify-between gap-1">
          <div  className="font-bold text-blue01">موضوع</div>
          <div>{data.subject}</div>
        </div>{" "}
        <div className="flex flex-row justify-between gap-1">
          <div  className="font-bold text-blue01">زمان پاسخ</div>
          <div>{data.reply_time}</div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <div
          className="flex items-center justify-center cursor-pointer pb-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevIcon
            className={`text-blue01 h-5 w-5 duration-200 ${
              isOpen ? " rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div className="border-b border-blue05  py-1.5 text-justify">
          <span className="font-bold text-blue01">متن پیام : </span>
          {data.message}
        </div>
        <div className="py-1.5">
          <span className="font-bold text-blue01">پاسخ پشتیبانی : </span>
          <span className="text-justify">{data.reply}</span>
        </div>
      </div>
    </div>
  );
}
