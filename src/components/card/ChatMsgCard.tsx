import { oneChatApiRes } from "@/interface/chatApi.interface";
import React from "react";
import DeleteIcon from "@/public/assets/svg/trash.svg";
import EditIcon from "@/public/assets/svg/edit.svg";
import CheckIcon from "@/public/assets/svg/check.svg";
import { useParams as UseParams } from "next/navigation";

export default function ChatMsgCard({
  data: { _id, createdAt, from, readAt, to, type, value },
  editId,
  editMessage,
  deleteMessage
}: {
  data: oneChatApiRes["messages"][0];
  editMessage: (id: string, msg: string) => void;
  deleteMessage: (id: string) => void;
  editId:string
}) {
  const userMsgClass = "bg-blue05 p-4 rounded-xl rounded-br-none";
  const responseMsgClass = "bg-red05 p-4 rounded-xl rounded-bl-none";
  const params: { id: string } = UseParams();
  return (
    <div
      key={_id}
      className={`${from === params?.id ? userMsgClass : responseMsgClass} ${
        _id === editId && "opacity-50"
      } flex flex-col gap-2`}
    >
      <div className="flex flex-row justify-between items-center ">
        <div>{value}</div>
        {from !== params?.id && !readAt && _id !== editId && (
          <div>
            <button onClick={() => editMessage(_id, value)}>
              <EditIcon className="text-blue03 w-5 h-5" />
            </button>
            <button onClick={() => deleteMessage(_id)}>
              <DeleteIcon className="text-red03 w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <div className="h-[1px] w-full bg-dark03/50 rounded-xl" />
      <div className="flex flex-row justify-between items-center text-xs text-dark02">
        <div className="flex flex-row">
          {from !== params?.id && <CheckIcon />}
          {readAt && <CheckIcon />}
        </div>
        <p style={{ direction: "ltr" }}>{createdAt}</p>
      </div>
    </div>
  );
}
