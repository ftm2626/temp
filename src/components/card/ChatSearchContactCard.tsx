import { chatContactApiRes, chatListApiRes } from "@/interface/chatApi.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ChatSearchContactCard({
  data: {
    user: { id, name, profile_photo,status },
  },
}: {
  data: chatContactApiRes["chats"][0];
}) {
  return (
    <Link key={id} href={"/chat/" + id}>
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
        </div>
      </div>
    </Link>
  );
}
