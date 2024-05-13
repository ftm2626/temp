import { subserviceListApiResT } from "@/interface/passangersApi.interface";
import Link from "next/link";
import React from "react";
import CarPlateCard from "../CarPlateCard";

export default function SubServiceCard({
  data,
}: {
  data: subserviceListApiResT["subServices"]["data"][0];
}) {
  return (
    <div
      key={data.id}
      className="bg-white rounded-md shadow-md p-3 flex flex-col gap-2"
    >
      <div className="grid grid-cols-1 gap-2">
        {/* <span>
          <span className="text-blue01 font-bold">شماره سرویس : </span>
          {data.id}
        </span> */}
        {data.status !=="ارجاع به راننده" &&  <span>
          <span className="text-blue01 font-bold">وضعیت : </span>
          <span
            className="px-2 rounded-md"
            style={{ backgroundColor: data.status_color }}
          >
            {data.status}
          </span>
        </span>}
        <span>
          <span className="text-blue01 font-bold">تاریخ : </span>
          {data.date}
        </span>
        {/* <span>
          <span className="text-blue01 font-bold">زمان : </span>
          {data.type}
        </span> */}
        <span>
          <span className="text-blue01 font-bold">ساعت شروع : </span>
          {data.hour}
        </span>
        {/* <span>
          <span className="text-blue01 font-bold">نوع سرویس : </span>
          {data.service_type}
        </span> */}
        {data.driver_name && (
          <span>
            <span className="text-blue01 font-bold">راننده : </span>
            {data.driver_name}
          </span>
        )}
        {data.driver_number && (
          <span>
            <span className="text-blue01 font-bold">موبایل راننده : </span>
            <Link className="text-blue01" href={"tel:" + data.driver_number}>
              {data.driver_number}
            </Link>
          </span>
        )}
        {data.driver_car && (
          <span>
            <span className="text-blue01 font-bold">خودرو : </span>
            {data.driver_car}
          </span>
        )}
        {data.car_plate && (
          <span className="flex flex-row gap-3">
            <span className="text-blue01 font-bold">پلاک : </span>
            <CarPlateCard
              one={data.car_plate[2]}
              two={data.car_plate[1]}
              three={data.car_plate[0]}
              four={data.car_plate[3]}
            />
          </span>
        )}

        {data.representor_name && (
          <span>
            <span className="text-blue01 font-bold">نماینده : </span>
            {data.representor_name}
          </span>
        )}

        <span>
          <span className="text-blue01 font-bold">مبدا : </span>
          {data.origin_city} {data.origin_address}
        </span>
        {/* <span>
          <span className="text-blue01 font-bold">مقصد : </span>
          {data.destination_city} 
        </span> */}
      </div>
      {/* <span>
        <span className="text-blue01 font-bold">آدرس مبدا : </span>
        {data.origin_address}
      </span> */}
      {/* <span>
        <span className="text-blue01 font-bold">آدرس مقصد : </span>
        {data.destination_address}
      </span> */}
    </div>
  );
}
