"use client";

import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import * as React from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
import UserProvider from "@/context/user.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NextUIProvider navigate={router.push}>
          <Toaster />
          {children}
        </NextUIProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
