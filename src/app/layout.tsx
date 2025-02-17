import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";
import QueryProviders from "@/components/providers/query-provider";

import "./globals.css";

const cairo = Cairo({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "مكتب التبيان لتحفيظ القران",
    description: "مكتب التبيان لتحفيظ القران",
    authors: [{ name: "Mahmoud Saber", url: "https://github.com/MahmoudSaber1/" }],
    icons: {
        icon: "/icons/logo.png",
    },
};

export default function RootLayout({ children }: Readonly<PropsChildren>) {
    return (
        <html lang="ar" dir="rtl">
            <body className={cn(cairo.className, "antialiased min-h-screen")}>
                <NuqsAdapter>
                    <QueryProviders>
                        <Toaster richColors={true} />
                        {children}
                    </QueryProviders>
                </NuqsAdapter>
            </body>
        </html>
    );
}
