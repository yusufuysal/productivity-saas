import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "./provider";
import { ThemeProvider } from "next-themes";

import { Toaster } from "sonner";

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
        <body className="flex h-screen w-screen">
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <div className="h-screen w-screen">{children}</div>
            </ThemeProvider>
          </QueryProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
