/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import React, { useEffect } from "react";
import { RootStateType } from "@/redux/store";
import {
  addMsgApiRes,
  chatContactApiRes,
  chatListApiRes,
  deleteMsgApiRes,
  oneChatApiRes,
  updateMsgApiRes,
} from "@/interface/chatApi.interface";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  addChatMsg,
  deleteChatMsg,
  setChatConnection,
  setChatCreation,
  setChatInitialData,
  setContactListData,
  setOneChatData,
  updateChatMsg,
} from "@/redux/slice/chatSlice";
import { Socket, io } from "socket.io-client";
import { getCookie } from "cookies-next";
import { socketEvents } from "@/utils/socketEvents";

export let socket: Socket;
const token = getCookie("vesal-chat-token");

export default function ChatLayout({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();
  const { created } = useAppSelector((state: RootStateType) => state.ChatSlice);

  useEffect(() => {
    if (token) {
      socket = io("wss://chat-backend.dev-vesal.ir/?chat_token=" + token);
      dispatch(setChatCreation(true));
    }
  }, []);

  useEffect(() => {
    function onConnect() {
      dispatch(setChatConnection(true));
    }

    function onDisconnect() {
      dispatch(setChatConnection(false));
    }

    function initial_chat(data: chatListApiRes) {
      dispatch(setChatInitialData(data));
    }

    function get_specific_user_chat(data: oneChatApiRes) {
      dispatch(setOneChatData(data));
    }

    function load_available_contacts_to_chat(data: chatContactApiRes) {
      dispatch(setContactListData(data));
    }
    function sending_new_message(data: addMsgApiRes) {
      dispatch(addChatMsg({ ...data, readAt: "" }));
    }

    function update_message(data: updateMsgApiRes) {
      dispatch(updateChatMsg(data));
    }

    function delete_message(data: deleteMsgApiRes) {
      dispatch(deleteChatMsg(data.deletedMessageId));
    }

    if (created) {
      socket?.on(socketEvents.connect, onConnect);
      socket?.on(socketEvents.disconnect, onDisconnect);
      socket?.on(socketEvents.initial_chat, initial_chat);
      socket?.on(socketEvents.update_message, update_message);
      socket?.on(socketEvents.delete_message, delete_message);
      socket?.on(socketEvents.sending_new_message, sending_new_message);
      socket?.on(socketEvents.get_specific_user_chat, get_specific_user_chat);
      socket?.on(
        socketEvents.load_available_contacts_to_chat,
        load_available_contacts_to_chat
      );
    }

    return () => {
      if (created) {
        socket?.off(socketEvents.connect, onConnect);
        socket?.off(socketEvents.disconnect, onDisconnect);
        socket?.off(socketEvents.initial_chat, initial_chat);
        socket?.off(socketEvents.update_message, update_message);
        socket?.off(socketEvents.delete_message, delete_message);
        socket?.off(socketEvents.sending_new_message, sending_new_message);
        socket?.off(
          socketEvents.get_specific_user_chat,
          get_specific_user_chat
        );
        socket?.off(
          socketEvents.load_available_contacts_to_chat,
          load_available_contacts_to_chat
        );
      }
    };
  }, [created]);

  return (
    <>
      <Head>
        <title> وصال گشت - چت</title>
      </Head>
      {children}
    </>
  );
}
