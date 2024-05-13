import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import { getCookie } from "cookies-next";
import { store } from "@/redux/store";

const APP_NAME = "Vesalgasht PWA";
const APP_DEFAULT_TITLE = "وصال گشت";
const APP_DESCRIPTION = "این برنامه وصال گشت است.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_DEFAULT_TITLE,
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};
const role = store.getState().AuthSlice.role;
console.log(role)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" className="bg-black">
      <body className="max-w-[30rem] mx-auto [&>main]:h-screen bg-main-bg bg-contain">
        {children}
      </body>
    </html>
  );
}
