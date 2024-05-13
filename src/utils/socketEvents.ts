export const socketEvents = {
  connect: "connect",
  disconnect: "disconnect",
  initial_chat: "initial_chat",
  update_message: "update_message",
  delete_message: "delete_message",
  user_disconnected: "user_disconnected",
  new_user_connected: "new_user_connected",
  send_to_all_agents: "send_to_all_agents",
  load_more_messages: "load_more_messages",
  sending_new_message: "sending_new_message",
  get_specific_user_chat: "get_specific_user_chat",
  update_viewed_flag_of_message: "update_viewed_flag_of_message",
  load_available_contacts_to_chat: "load_available_contacts_to_chat",
  back_to_main_page_get_contacts_list: "back_to_main_page_get_contacts_list",
  update_chat_contact_list_after_new_message:
    "update_chat_contact_list_after_new_message",
};
