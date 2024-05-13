import React, { useState } from "react";
import CallIcon from "@/public/assets/svg/phone.svg";
import ChevIcon from "@/public/assets/svg/chevron.svg";
import Link from "next/link";
import CarPlateCard from "../CarPlateCard";
import GenericButton from "@/components/form/GenericButton";
import { useRouter } from "next/navigation";
import { localUris } from "@/utils/uris";

export default function Driverscard({ data }: { data?: any }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`flex flex-col bg-white rounded-md p-4 shadow-md overflow-hidden duration-300 ${
        isOpen ? "h-[17rem]" : "h-28"
      } `}
    >
      <div className="flex flex-col">
        <div className="font-bold">نام راننده</div>
        <Link href={"tel:" + "data?.passenger_phone"}>
          <div className="flex flex-row items-center py-1.5 justify-between text-green01 font-bold">
            <div>09190321456</div>
            <CallIcon className="text-green01 h-7 w-7 cursor-pointer" />
          </div>
        </Link>
      </div>
      <div
        className="flex items-center justify-center py-1.5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevIcon
          className={`text-green01 h-5 w-5 duration-200 ${
            isOpen ? " rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div className="py-1.5 flex flex-row justify-between">
        <span>
          وضعیت : <span className="text-dark03">فعال</span>
        </span>
        <CarPlateCard one="12" two="ث" three="214" four="15" />
      </div>
      <div className="flex flex-row gap-2 mt-1 mb-2">
        <GenericButton
          color="blue"
          title="جزئیات"
          onClick={() => router.push(localUris.inspectors.driversDetails)}
        />
        <GenericButton
          color="green"
          title="بازرسی"
          onClick={() => router.push(localUris.inspectors.inspectorsInspect)}
        />
      </div>
      <GenericButton
        color="dark"
        title="لیست بازرسی ها"
        onClick={() => router.push(localUris.inspectors.inspectorsInspections)}
      />
    </div>
  );
}
