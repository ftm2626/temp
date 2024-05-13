import React from "react";
import GenericButton from "@/components/form/GenericButton";
import { useRouter } from "next/navigation";
import { localUris } from "@/utils/uris";

export default function InspecitionCards({
  data,
  setShowModal,
}: {
  data?: any;
  setShowModal: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();
  return (
    <div
      className={`flex flex-col bg-white rounded-md p-4 shadow-md overflow-hidden duration-300`}
    >
      <div className="flex flex-col">
        <div className="font-bold">نام راننده</div>
      </div>
      <div className="flex flex-row items-center border-b border-red05 py-1.5">
        <div className="w-full">
          کد : <span className="text-dark03">123</span>
        </div>
        <div className="w-full">
          امتیاز : <span className="text-dark03">9687</span>
        </div>
      </div>
      <div className="w-full border-b border-red05 py-1.5">
        تاریخ : <span className="text-dark03">1402-05-04 08:35:28</span>
      </div>
      <div className="w-full border-b border-red05 py-1.5">
        دوره :{" "}
        <span className="text-dark03">نیمه دوم 1401 - نیمه اول 1402</span>
      </div>
      <div className="w-full border-b border-red05 py-1.5">
        نوع : <span className="text-dark03">حضوری</span>
      </div>
      <div className="w-full py-1.5">
        امتیاز بازرسی مجدد : <span className="text-dark03">9687</span>
      </div>
      <div className="flex flex-row gap-2 mt-1.5 mb-3">
        <GenericButton
          color="green"
          title="جزئیات"
          onClick={() =>
            router.push(localUris.inspectors.inspectorsInspectionDetails)
          }
        />
        <GenericButton
          color="red"
          title="حذف"
          onClick={() => setShowModal(1)}
        />
      </div>
    </div>
  );
}
