"use client";

import { usePathname } from "next/navigation";

import { UserButton } from "@/features/auth/components/user-button";

import { MobileSidebar } from "./mobile-sidebar";

const pathnameMap = {
    students: {
        title: "الطلاب",
        description: "يمكنك متابعة جميع الطلاب من هنا",
    },
    teachers: {
        title: "المعلمين",
        description: "يمكنك متابعة جميع المعلمين من هنا",
    },
    groups: {
        title: "الحلقات",
        description: "يمكنك متابعة جميع الحلقات من هنا",
    },
};
const defaultMap = {
    title: "الصفحة الرئيسية",
    description: "يمكنك متابعة جميع الطلاب والمعلمين من هنا",
};

export const Navbar = () => {
    const pathname = usePathname();
    const pathnameParts = pathname.split("/");
    const pathnameKey = pathnameParts[1] as keyof typeof pathnameMap;

    const { title, description } = pathnameMap[pathnameKey] || defaultMap;

    return (
        <nav className="pt-4 px-6 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <MobileSidebar />
            <UserButton />
        </nav>
    );
};
