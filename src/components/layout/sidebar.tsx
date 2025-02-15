import Image from "next/image";
import Link from "next/link";

import { DottedSeparator } from "@/components/dotted-separator";
import { Navigation } from "@/components/layout/navigation";

export const Sidebar = () => {
	return (
		<aside className="h-full bg-neutral-100 p-4 w-full">
			<Link href={"/"} className="flex items-center gap-2">
				<Image src={"/icons/logo.svg"} width={46} height={46} alt={"logo"} />
				<h1 className="font-bold text-2xl">مكتب البيان</h1>
			</Link>
			<DottedSeparator className="my-4" />
			<Navigation />
		</aside>
	);
};
