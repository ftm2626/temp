import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GenericButton from "../../form/GenericButton";
// import ChevIcon from "@/public/assets/svg/chevron.svg";
import { requestListApiResT } from "@/interface/passangersApi.interface";
import { localUris } from "@/utils/uris";

export default function ReqestsCard({
  data,
  setSubModal,
  setReasonsModal,
  setReasons,
  subServices,
}: {
  data: requestListApiResT["data"]["services"][0];
  subServices: any;
  setSubModal: React.Dispatch<React.SetStateAction<number>>;
  setReasonsModal: React.Dispatch<React.SetStateAction<number>>;
  setReasons: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          service_id: number;
          creator_id: number;
          reason: string;
          created_at: string;
          updated_at: string;
        }[]
      | undefined
    >
  >;
}) {
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`flex flex-col bg-white rounded-md shadow-md overflow-hidden duration-300`}
    >
      <div className="p-4 pb-0 flex flex-col gap-1.5">
        <div className="flex flex-row justify-between gap-1">
          <div className="flex flex-row gap-1">
            <span className="font-bold text-blue01"> تاریخ رفت : </span>
            <div className="ltr"> {data.departure_date} </div>
          </div>
          <div className="flex flex-row gap-1">
            <span className="font-bold text-blue01"> شروع سفر : </span>
            <div className="ltr"> {data.hour} </div>
          </div>
        </div>
        {data.sub_service_type === "در اختیار" && (
          <div className="flex flex-row justify-between gap-1">
            <div className="flex flex-row gap-1">
              <span className="font-bold text-blue01"> تاریخ برگشت : </span>
              <div className="ltr"> {data.return_date} </div>
            </div>
            {/* {data.return_time} */}
          </div>
        )}
        <div className="flex flex-row justify-between gap-1">
          <div className="flex flex-row gap-1">
            <span className="font-bold text-blue01"> مبدا : </span>
            {data.origin_city || "-"}
          </div>
          <div className="flex flex-row gap-1">
            <span className="font-bold text-blue01"> مقصد : </span>
            {data.destination_city || "-"}
          </div>
        </div>
      </div>
      <div className="p-4">
        {/* <div
          className="flex items-center justify-center cursor-pointer pb-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevIcon
            className={`text-blue01 h-5 w-5 duration-200 ${
              isOpen ? " rotate-180" : "rotate-0"
            }`}
          />
        </div> */}
        {/* <div className="flex flex-row items-center border-b border-blue05  py-1.5">
          <div>
            <span className="font-bold text-blue01">سرویس :</span>{" "}
            {data.sub_service_type}
          </div>
        </div>
        {data.origin && (
          <div className="flex flex-row items-center border-b border-blue05  py-1.5">
            <div>
              <span className="font-bold text-blue01">آدرس مبدا : </span>{" "}
              {data.origin}
            </div>
          </div>
        )}
        {data.destination && (
          <div className="flex flex-row items-center border-b border-blue05  py-1.5">
            <div>
              <span className="font-bold text-blue01">آدرس مقصد : </span>{" "}
              {data.destination}
            </div>
          </div>
        )}
        {data.description && (
          <div className="flex flex-row items-center py-1.5">
            <div>
              <span className="font-bold text-blue01">توضیحات :</span>{" "}
              {data.description}
            </div>
          </div>
        )} */}

        <div className="flex flex-row gap-2">
          {data.has_sub_service > 0 && (
            <GenericButton
              color="blue"
              title="مشاهده سرویس ها"
              onClick={() => {
                setSubModal(data.id);
                subServices(data.id);
              }}
            />
          )}
          {data.editable > 0 && (
            <GenericButton
              color="blue"
              title="ویرایش"
              onClick={() => {
                router.push(localUris.passanger.request + data.id);
              }}
            />
          )}
          {data.rejected > 0 && (
            <GenericButton
              color="red"
              title="دلیل عودت"
              onClick={() => {
                setReasonsModal(data.id);
                setReasons(data.rejected_reasons);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
