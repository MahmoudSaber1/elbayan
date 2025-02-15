"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsIcon, UsersIcon } from "lucide-react";
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go";

import { cn } from "@/lib/utils";

const routes = [
	{
		label: "الرئيسية",
		href: "/",
		icon: GoHome,
		activeIcon: GoHomeFill,
	},
	{
		label: "الطلاب",
		href: "/students",
		icon: UsersIcon,
		activeIcon: UsersIcon,
	},
	{
		label: "المعلمين",
		href: "/teachers",
		icon: SettingsIcon,
		activeIcon: SettingsIcon,
	},
	{
		label: "الحلقات",
		href: "/groups",
		icon: GoCheckCircle,
		activeIcon: GoCheckCircleFill,
	},
];

export const Navigation = () => {
	const pathname = usePathname();

	return (
		<ul className="flex flex-col">
			{routes.map((item) => {
				const fullHref = `${item.href}`;
				const isActive = pathname === fullHref;
				const Icon = isActive ? item.activeIcon : item.icon;

				return (
					<Link href={item.href} key={fullHref}>
						<li className={cn("flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500", isActive && "bg-white shadow-sm hover:opacity-100 text-primary")}>
							<Icon className="size-5 text-neutral-500" />
							{item.label}
						</li>
					</Link>
				);
			})}
		</ul>
	);
};
