import React from "react";

export default function CarPlateCard({
  one,
  two,
  three,
  four,
}: {
  one: string;
  two: string;
  three: string;
  four: string;
}) {
  return (
    <div className="bg-white flex flex-row text-2xl font-bold text-center">
      <div className="border rounded-sm border-black leading-3 text-[12px] p-0.5">
        <div>{four}</div>
        <div>ایران</div>
      </div>
      <div className="border rounded-sm border-black flex flex-row items-center">
        <div className="flex flex-row px-1">
          <div>{one}</div>
          <div>{two}</div>
          <div>{three}</div>
        </div>
        <div className="border-r border-black  p-0.5 flex flex-col bg-blue01 text-white font-normal h-full justify-between">
          <div>
            <div className="h-0.5 w-full bg-green-500"></div>
            <div className="h-0.5 w-full bg-white"></div>
            <div className="h-0.5 w-full bg-red01"></div>
          </div>
          <div className="text-[8px] leading-none">
            <div>I.R.</div>
            <div>IRAN</div>
          </div>
        </div>
      </div>
    </div>
  );
}
