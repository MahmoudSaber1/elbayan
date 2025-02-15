import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

export default async function Home() {
	const user = await getCurrent();
	if (!user) redirect("/sign-in");

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-3xl font-bold underline">Dashboard</h1>
		</main>
	);
}
