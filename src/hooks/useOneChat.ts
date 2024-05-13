import { socket } from "@/components/layout/ChatLayout";
import { useAppSelector } from "@/redux/hooks";
import { RootStateType } from "@/redux/store";
import axios from "axios";
import { useRef, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { useParams as UseParams } from "next/navigation";
import { socketEvents } from "@/utils/socketEvents";

export default function useOneChat() {
  const params: { id: string } = UseParams();
  const { initialData, oneChatData } = useAppSelector(
    (state: RootStateType) => state.ChatSlice
  );
  const endpoint = "vesal_gap.VESAL_GAP_SOCKET_SERVER";

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState("");
  const [audio, setAudio] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => notAllowedOrFound(err)
  );
  const notAllowedOrFound = (data: any) => {
    let message = "دسترس یه میکروفون داده نشده است";
    if (data.code === 8) {
      message = "میکروفون متصل نیست";
    }
    // Toast.fire({
    //   icon: "error",
    //   title: message,
    // });
  };
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setAudio(url);
    // dispatch(setUserChatControl({ voiceAddress: url }));
  };
  const getBase64FromUrl = async (url: string) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };
  function editMessage(id: string, msg: string) {
    setEditId(id);
    setInput(msg);
    inputRef.current?.focus();
  }
  function deleteMessage(id: string) {
    socket?.emit(socketEvents.delete_message, {
      message_id: id,
      senderId: initialData?.user,
      receiverId: params?.id,
    });
  }
  async function sendMessage() {
    if (audio) {
      const myVoice = await getBase64FromUrl(audio);
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        socketId: socket?.id,
      };
      const url = endpoint + "/users/upload-voice";
      const data = { base64voice: myVoice };
      axios
        .post(url, data, { headers })
        .then((response) => {
          if (response.data.status) {
            console.log(response.data);
            socket?.emit(socketEvents.sending_new_message, {
              data: {
                type: "voice",
                data: response.data.data.filePath,
              },
              destination_user: params?.id,
              sender: initialData?.user,
            });
            setAudio("");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (editId) {
      socket?.emit(socketEvents.sending_new_message, {
        data: {
          type: "text",
          data: input,
          messageId: editId,
        },
        destination_user: params?.id,
        sender: initialData?.user,
      });
    } else {
      socket?.emit(socketEvents.sending_new_message, {
        data: {
          type: "text",
          data: input,
        },
        destination_user: params?.id,
        sender: initialData?.user,
      });
      viewRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setInput("");
    setEditId("");
  }

  function sendFile(file: File) {
    socket?.emit(socketEvents.sending_new_message, {
      data: {
        type: "file",
        data: file,
      },
      destination_user: params?.id,
      sender: initialData?.user,
    });
  }
  function removeMsg() {
    setEditId("");
    setAudio("");
    setInput("");
  }

  return {
    input,
    setInput,
    editId,
    setEditId,
    audio,
    setAudio,
    recorderControls,
    addAudioElement,
    getBase64FromUrl,
    editMessage,
    sendFile,
    sendMessage,
    deleteMessage,
    removeMsg,
    inputRef,
    viewRef,
  };
}
