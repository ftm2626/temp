import React from "react";
import moment from "jalali-moment";
import { requestListApiResT } from "@/interface/passangersApi.interface";

export default function ReportCard({
  data,
}: {
  data: requestListApiResT["data"]["receipts"][0];
}) {
  return (
    <div className={`flex flex-col bg-white rounded-md shadow-md`}>
      <div className="p-4 flex flex-col gap-1.5">
        <div>
          <span className="font-bold text-blue01">شماره قبض : </span>
          {data?.id}
        </div>
        <div>
          <span className="font-bold text-blue01">راننده : </span>
          {data?.driver?.name} {data?.driver?.lname}
        </div>
        <div className="flex">
          <span className="font-bold text-blue01">تاریخ :</span>
          <div className="ltr">
            {moment(data?.date).locale("fa").format("YYYY/MM/DD")}
          </div>
        </div>
        <div>
          <span className="font-bold text-blue01">روز : </span>
          {data?.day} - {data?.type}
        </div>
        <div>
          <span className="font-bold text-blue01">حرکت/خاتمه : </span>
         {data?.end_time} - {data?.start_time} 
        </div>
        {data?.address && (
          <div>
            <span className="font-bold text-blue01">مسیر : </span>
            {data?.address}
          </div>
        )}
      </div>
    </div>
  );
}
