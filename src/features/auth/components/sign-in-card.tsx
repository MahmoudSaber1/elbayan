"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/input-field";
import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useLogin } from "../api/use-login";
import { loginSchema } from "../schemas/auth-schema";

export const SignInCard = () => {
	const { mutate: loginMutate, isPending } = useLogin();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof loginSchema>) => {
		loginMutate({ json: values });
	};

	return (
		<Card className="size-full md:w-[487px] border-none shadow-none">
			<CardHeader className="flex items-center justify-center text-center p-7">
				<CardTitle className="text-2xl">مرحبا بعودتك!</CardTitle>
			</CardHeader>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7">
				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<InputField control={form.control} name="email" type="email" placeholder="ادخل البريد الالكتروني" />
						<InputField control={form.control} name="password" type="password" placeholder="ادخل كلمة المرور" />
						<Button disabled={isPending} type="submit" size={"lg"} className="w-full">
							تسجيل الدخول
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
