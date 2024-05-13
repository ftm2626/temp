"use client";
import React from "react";
import useNavbar from "../../hooks/useNavbar";
import OpenMenuIcon from "@/public/assets/svg/OpenMenu.svg";
import CloseIcon from "@/public/assets/svg/Close.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { assetUris } from "@/utils/uris";

export default function NavBar({
  bg,
  type,
  shade,
}: {
  bg: string;
  shade: string;
  type: "pass" | "driver" | "inspect";
}) {
  const {
    passMenuList,
    DriverMenuList,
    inspectMenuList,
    openMenu,
    setOpenMenu,
    logoutFunc,
  } = useNavbar();
  const pathName = usePathname();
  const menuItem =
    type === "pass"
      ? passMenuList
      : type === "driver"
      ? DriverMenuList
      : inspectMenuList;
  const selectedItem = menuItem?.find(({ link }) => {
    return link == pathName;
  });
  return (
    <header className="text-lg fixed  w-full z-[9999] h-14">
      <div
        className={`flex flex-row ${bg} h-16 w-full gap-3 items-center px-4 relative border-b border-white`}
      >
        <div onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? (
            <CloseIcon className="text-white h-10 w-10 cursor-pointer" />
          ) : (
            <OpenMenuIcon className="text-white h-10 w-10 cursor-pointer" />
          )}
        </div>
        <div className="text-white text-2xl">{selectedItem?.title}</div>
      </div>
      <nav
        className={`${
          openMenu ? "w-full" : "w-0"
        } flex flex-col bg-dark01/90 h-screen overflow-hidden transition-all overflow-y-auto  overscroll-contain`}
      >
        <ul className="flex flex-col w-full">
          {menuItem.map(
            ({ id, title, link, inMenu }) =>
              inMenu && (
                <li
                  key={id}
                  className="min-w-fit group/1 cursor-pointer w-full overflow-hidden hover:overflow-visible"
                >
                  <Link href={link} passHref onClick={() => setOpenMenu(false)}>
                    <div
                      className={`text-white font-bold hover:${shade} py-4 px-4  transition flex flex-row gap-2 items-center ${
                        pathName === link && `${shade} border-y`
                      }`}
                    >
                      {/* <span className="icon}</span> */}
                      {title}
                    </div>
                  </Link>
                </li>
              )
          )}
          {type === "pass" && (
            <li className="min-w-fit group/1 cursor-pointer w-full overflow-hidden hover:overflow-visible">
              <Link href={assetUris.pdfGuide}>
                <div
                  className={`text-white font-bold hover:${shade} py-4 px-4  transition flex flex-row gap-2 items-center`}
                >
                  راهنما
                </div>
              </Link>
            </li>
          )}
          <li className="min-w-fit group/1 cursor-pointer w-full overflow-hidden hover:overflow-visible">
            <Link href={"tel:02191001236"}>
              <div
                className={`text-white font-bold hover:${shade} py-4 px-4  transition flex flex-row gap-2 items-center`}
              >
                تماس با پشتیبانی
              </div>
            </Link>
          </li>
          <li
            className="min-w-fit group/1 cursor-pointer w-full overflow-hidden hover:overflow-visible"
            onClick={logoutFunc}
          >
            <div
              className={`text-white font-bold hover:${shade} py-4 px-4  transition flex flex-row gap-2 items-center`}
            >
              {/* <span className="icon}</span> */}
              خروج
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
