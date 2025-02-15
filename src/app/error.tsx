"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const ErrorPage = ({ error }: { error: Error }) => {
	const router = useRouter();

	return (
		<h1 className="h-screen flex flex-col gap-y-6 items-center justify-center">
			<AlertTriangle className="size-10 text-amber-700" />
			<p className="text-sm md:text-3xl text-muted-foreground">
				{error.message ? "" : "Something went wrong:"} <span className="font-medium text-amber-700">{error.message}</span>
			</p>

			<Button onClick={() => router.back()} size={"lg"} className="text-lg" variant={"secondary"}>
				<ArrowLeft className="size-5 mr-2" />
				Go Back
			</Button>
		</h1>
	);
};

export default ErrorPage;
