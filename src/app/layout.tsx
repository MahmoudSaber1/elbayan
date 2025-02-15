import type { Metadata } from "next";
import { Cairo } from "next/font/google";

import { cn } from "@/lib/utils";
import QueryProviders from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const cairo = Cairo({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "مكتب البيان لتحفيظ القران",
	description: "مكتب البيان لتحفيظ القران",
	authors: [{ name: "Mahmoud Saber", url: "https://github.com/MahmoudSaber1/" }],
	icons: {
		icon: "/icons/logo.svg",
	},
};

export default function RootLayout({ children }: Readonly<PropsChildren>) {
	return (
		<html lang="ar" dir="rtl">
			<body className={cn(cairo.className, "antialiased min-h-screen")}>
				<QueryProviders>
					<Toaster richColors={true} />
					{children}
				</QueryProviders>
			</body>
		</html>
	);
}
