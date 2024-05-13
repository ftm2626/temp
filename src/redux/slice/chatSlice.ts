import {
  chatContactApiRes,
  chatListApiRes,
  oneChatApiRes,
  updateMsgApiRes,
} from "@/interface/chatApi.interface";
import { chatInitStateT } from "@/interface/redux.interface";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

const initialState: chatInitStateT = {
  connected: false,
  created: false,
  initialData: null,
  oneChatData: {
    messages: null,
    status: null,
    user: null,
  },
  contactListData: null,
};

export const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState,
  reducers: {
    setChatCreation: (state, action: PayloadAction<boolean>) => {
      state.created = action.payload;
    },
    setChatConnection: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    setChatInitialData: (state, action: PayloadAction<chatListApiRes>) => {
      state.initialData = action.payload;
    },
    setOneChatData: (state, action: PayloadAction<oneChatApiRes>) => {
      state.oneChatData = action.payload;
    },
    setContactListData: (state, action: PayloadAction<chatContactApiRes>) => {
      state.contactListData = action.payload;
    },
    addChatMsg: (
      state,
      action: PayloadAction<oneChatApiRes["messages"][0]>
    ) => {
      state.oneChatData.messages &&
        state.oneChatData.messages.push(action.payload);
    },
    updateChatMsg: (state, action: PayloadAction<updateMsgApiRes>) => {
      const index = state.oneChatData.messages?.findIndex(
        (item) => item._id === action.payload.messageId
      );
      console.log(index);
      if (index !== undefined && index > -1) {
        const item = state?.oneChatData?.messages
          ? state?.oneChatData?.messages[index]
          : null;
        state.oneChatData.messages &&
          state.oneChatData.messages.splice(index, 1, {
            _id: item?._id || "",
            createdAt: item?.createdAt ||"",
            from: item?.from ||"",
            readAt: item?.readAt ||"",
            to: item?.to ||"",
            type: item?.type ||"",
            value: action.payload.message,
          });
      }
    },
    deleteChatMsg: (state, action: PayloadAction<string>) => {
      const filterd = state.oneChatData?.messages?.filter(
        (item) => item._id !== action.payload
      );
      state.oneChatData.messages = filterd ? filterd : null;
    },
  },
});

export const {
  setChatInitialData,
  setChatConnection,
  setChatCreation,
  setOneChatData,
  setContactListData,
  addChatMsg,
  deleteChatMsg,
  updateChatMsg,
} = ChatSlice.actions;

export default ChatSlice.reducer;
