import React, { useState } from "react";

export default function useInspections() {
  const [showModal, setShowModal] = useState(0);
  // if(showModal === 0){
  //   document.body.classList.remove("modal-open")
  // }else {
  //   document.body.classList.add("modal-open")
  // }
  return {
    showModal,
    setShowModal,
  };
}
