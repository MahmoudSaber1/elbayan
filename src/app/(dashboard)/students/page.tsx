import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

export default async function Students() {
	const user = await getCurrent();
	if (!user) redirect("/sign-in");

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-3xl font-bold underline">Students</h1>
		</main>
	);
}
