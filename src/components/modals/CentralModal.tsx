import React from "react";

export default function CentralModal({
  show,
  setShow,
  children,
  className
}: {
  show: number | boolean;
  setShow: React.Dispatch<React.SetStateAction<number>> | any;
  children: JSX.Element;
  className? :string
}) {
  const clickParent = (event: React.MouseEvent) => {
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue === "parent") {
      event.preventDefault();
      setShow(0);
    }
  };

  return (
    <div
      className={`w-full fixed z-10 bottom-0 -mr-3 flex justify-center items-center ${
        show ? "h-screen bg-blackFaded" : "bg-transparent h-0"
      } ${className}`}
      onClick={clickParent}
      data-value="parent"
    >
      <div
        className={`min-w-[320px] bg-light01 z-20 rounded-md`}
        data-value="child"
      >
        {children}
      </div>
    </div>
  );
}
