import "./globals.css";
import { Providers } from "./providers";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Fish Species Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={10}
          containerClassName="paragraph9 text-font-primary"
        />

      </body>
    </html>
  );
}
