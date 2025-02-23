import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import GroupView from "@/features/groups/components/group-view";

export default async function Groups() {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    return (
        <main className="h-full flex flex-col">
            <GroupView />
        </main>
    );
}
