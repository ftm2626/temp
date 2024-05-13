import React, { Dispatch, SetStateAction } from "react";
import GenericButton from "@/components/form/GenericButton";
import { AddressListApiResT } from "@/interface/passangersApi.interface";

export default function AddressCard({
  edit,
  data,
}: {
  edit: (id:number)=>void;
  data: AddressListApiResT["data"][0];
}) {
  return (
    <div className={`flex flex-col bg-white rounded-md shadow-md p-4  gap-1.5`}>
      <div>
        <span className="font-bold text-blue01">عنوان : </span>
        {data.title}
      </div>
      <div>
        <span className="font-bold text-blue01">متن آدرس : </span>
        {data.description}
      </div>
      <div>
        <span className="font-bold text-blue01">وضعیت : </span>
        {data.status ? "فعال" : "غیر فعال"}
      </div>
      <GenericButton color="blue" title="ویرایش" onClick={() => edit(data.id)} />
    </div>
  );
}
