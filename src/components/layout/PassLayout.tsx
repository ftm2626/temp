/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import NavBar from "./Navbar";
import Head from "next/head";

export default function PassLayout({
  children,
}: {
  children: JSX.Element;
  isOnline: boolean;
}) {
  return (
    <>
      <Head>
        <title> وصال گشت - مسافران</title>
      </Head>
      <NavBar bg="bg-blue01" type="pass" shade="bg-blue01/50" />
      <main className={`pt-16 h-full`}>{children}</main>
    </>
  );
}
