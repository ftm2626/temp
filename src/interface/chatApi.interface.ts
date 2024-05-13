export type chatListApiRes = {
  prevent_continue_to_chat_any_time: boolean;
  can_join_in_channel: boolean;
  can_join_in_group: boolean;
  can_search_user: boolean;
  user: string;
  channels: [];
  groups: [];
  chats: {
    latest_message: string;
    latest_message_datetime: string;
    unread_message_count: number;
    user: {
      continue_conversation: boolean;
      id: string;
      last_online_time: string;
      name: string;
      profile_photo: string;
      status: boolean;
    };
  }[];
};

export type oneChatApiRes = {
  status: boolean;
  messages: {
    _id: string;
    from: string;
    to: string;
    type: string;
    value: string;
    createdAt: string;
    readAt: string;
  }[];
  user: {
    name: string;
    mobile: string;
    id: string;
    image: string;
    continue_conversation: boolean;
  };
};

export type oneChatSliceData = {
  key: "fetched_data";
  value: {
    target: "chats";
    data: any;
  };
};

export type chatContactApiRes = {
  chats: [
    {
      user: {
        id: string
        name: string
        profile_photo: string
        status: boolean;
        last_online_time: string;
        continue_conversation: boolean;
      };
    }
  ];
};

export type addMsgApiRes = {
  _id: string;
  from: string;
  to: string;
  type: string;
  value: string;
  createdAt: string;
};

export type updateMsgApiRes = {
  from:string
  message:string
  messageId:string
  to:string
};

export type deleteMsgApiRes = {
  deletedMessageId: string
  message_id: string
  receiverId: string
  senderId: string
};

