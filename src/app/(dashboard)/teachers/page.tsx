import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import TeacherView from "@/features/teachers/components/teacher-view";

export default async function Teachers() {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    return (
        <main className="h-full flex flex-col">
            <TeacherView />
        </main>
    );
}
