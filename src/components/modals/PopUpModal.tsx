import React, { useEffect } from "react";
import ChevIcon from "@/public/assets/svg/chevron.svg";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function PopUpModal({
  show,
  setShow,
  children,
}: {
  show: number;
  setShow: React.Dispatch<React.SetStateAction<number>>;
  children: JSX.Element;
}) {
  const clickParent = (event: React.MouseEvent) => {
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue === "parent") {
      event.preventDefault();
      setShow(0);
    }
  };

  // useEffect(() => {
  //   if (show) {
  //     console.log("push");
  //     window.history.pushState("modal", "","");
  //   } else {
  //     if (window.history.state === "modal") {setShow(0)}
  //   }
  //   const handleBackBtn = () => {
  //     if (show) {
  //       console.log("pop");
  //       setShow(0);
  //     }
  //   };
  //   window.addEventListener("popstate", handleBackBtn);
  //   return () => {
  //     window.removeEventListener("popstate", handleBackBtn);
  //   };
  // }, [show, setShow]);

  return (
    <div
      className={`w-full fixed z-10 bottom-0 -mr-3 ${
        show ? "h-screen bg-blackFaded" : "bg-transparent h-0"
      }`}
      onClick={clickParent}
      data-value="parent"
    >
      <div
        className={` w-full fixed bg-light01 border-t-2 rounded-t-lg duration-300 z-20 p-4 max-h-[80vh] overflow-auto ${
          show ? "bottom-0" : "bottom-[calc(-100%)]"
        } `}
        // onClick={(e) => console.log("child")}
        data-value="child"
      >
        <div onClick={() => setShow(0)}>
          <ChevIcon
            className={`text-blue01 h-5 w-5 duration-200 mx-auto cursor-pointer ${
              !show ? " rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {children}
      </div>
    </div>
  );
}
