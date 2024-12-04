import { ClerkProvider } from "@clerk/nextjs";

import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

import { ThemeProvider } from "next-themes";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Define the weights you want to load
  display: "swap", // Ensures text remains visible during font loading
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={plusJakartaSans.className}
        suppressHydrationWarning
      >
        <body className="flex">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen w-screen">
              <div className="flex h-full w-full flex-col items-center">
                <Navbar />
                {/*{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}*/}

                <div className="flex w-full flex-1 flex-col items-center justify-center gap-20">
                  {children}
                  <Toaster />
                </div>
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
