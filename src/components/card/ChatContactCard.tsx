import { chatListApiRes } from "@/interface/chatApi.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ChatContactCard({
  data: {
    user: { id, name, profile_photo,status },
    latest_message,
    unread_message_count
  },
}: {
  data: chatListApiRes["chats"][0];
}) {
  return (
    <Link href={"/chat/" + id}>
      <div className="bg-blue05 rounded-lg p-4 hover:bg-blue04 duration-300 flex flex-row gap-2">
        <Image
          alt={name}
          src={profile_photo}
          width={500}
          height={500}
          className={`rounded-full border-2 w-14 h-14 ${
            status ? "border-green01" : "border-red01"
          }`}
        />
        <div className=" flex flex-col gap-2 w-full">
          <p className="font-bold text-lg">{name}</p>
          <div className="h-[1px] w-full bg-dark03/50 rounded-xl " />
          <div className="flex flex-row justify-between items-center">
            <span className="text-xs">{latest_message || "بدون پیغام"}</span>
            {unread_message_count > 0 ? (
              <div className="text-xs h-5 w-5 text-center rounded-full bg-blue02 text-white font-bold flex items-center justify-center">
                {unread_message_count}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
