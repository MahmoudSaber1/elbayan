import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import StudentView from "@/features/students/components/student-view";

export default async function Students() {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    return (
        <main className="h-full flex flex-col">
            <StudentView />
        </main>
    );
}
