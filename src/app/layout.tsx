import { Providers } from "@/lib/Providers";
import type { Metadata } from "next";
import "react-quill/dist/quill.snow.css";
import "/src/styles/globals.css";

export const metadata: Metadata = {
  title: "PET - BUDDY",
  description: "PET CARE - TIPS AND WRITE BLOG",
  icons: {
    icon: "/pets.png", // Path to your favicon in the `public` folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
