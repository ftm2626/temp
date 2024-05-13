/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Head from "next/head";
import NavBar from "./Navbar";

export default function InspectLayout({
  children,
}: {
  children: JSX.Element;
  isOnline: boolean;
}) {
  return (
    <>
      <Head>
        <title> وصال گشت - بازرسان</title>
      </Head>
      <NavBar bg="bg-green01" type="inspect" shade="bg-green01/50" />
      <main className={`pt-16 h-full`}>{children}</main>
    </>
  );
}
