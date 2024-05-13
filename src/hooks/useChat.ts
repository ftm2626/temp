import React, { useState } from "react";

export default function useChat() {
  const [showContacts, setShowContacts] = useState(0);
  const [searchUser, setSearchUser] = useState("");
  return { showContacts, setShowContacts, searchUser, setSearchUser };
}
