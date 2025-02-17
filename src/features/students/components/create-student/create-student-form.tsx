/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import { useRef } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { DottedSeparator } from "@/components/dotted-separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DateField, InputField, SelectField } from "@/components/input-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { StudentGender } from "../../types";
import { createStudentSchema } from "../../schemas";
import { useCreateStudent } from "../../api/use-create-student";

const studentStatusOptions = [
    { id: StudentGender.MALE, name: "ذكر" },
    { id: StudentGender.FEMALE, name: "انثي" },
];

export const CreateStudentForm = ({ onCancel }: CreateStudentFormProps) => {
    const { mutate: createStudentMutate, isPending } = useCreateStudent();

    const inputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof createStudentSchema>>({
        resolver: zodResolver(createStudentSchema),
        defaultValues: {
            name: "",
            code: "",
            birthDate: null,
            nationalId: "",
            phone: "",
            guardianPhone: "",
            profilePicture: "",
            nationalPicture: "",
            address: "",
            school: "",
            gender: undefined,
        },
    });

    const onSubmit = (values: z.infer<typeof createStudentSchema>) => {
        const finalValues = { ...values };
        createStudentMutate(
            { form: finalValues as any },
            {
                onSuccess: () => {
                    form.reset();
                    onCancel?.();
                },
            }
        );
    };

    const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            form.setValue("profilePicture", file);
        }
    };
    const handleNationalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            form.setValue("nationalPicture", file);
        }
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">اضافة طالب</CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField control={form.control} name="name" type="text" label="اسم الطالب" withLabel={true} placeholder="ادخل اسم الطالب" />
                                <DateField control={form.control} name="birthDate" label="تاريخ الميلاد" placeholder="ادخل تاريخ الميلاد" withLabel={true} />

                                <InputField control={form.control} name="code" type="text" label="كود الطالب" withLabel={true} placeholder="ادخل كود الطالب" />
                                <InputField control={form.control} name="nationalId" type="text" label="الرقم القومي للطالب" withLabel={true} placeholder="ادخل الرقم القومي للطالب" />

                                <InputField control={form.control} name="phone" type="text" label="رقم الطالب" withLabel={true} placeholder="ادخل رقم الطالب" />
                                <InputField control={form.control} name="guardianPhone" type="text" label="رقم ولي امر الطالب" withLabel={true} placeholder="ادخل رقم ولي الامر" />

                                <InputField control={form.control} name="address" type="text" label="عنوان الطالب" withLabel={true} placeholder="ادخل عنوان الطالب" />
                                <InputField control={form.control} name="school" type="text" label="مدرسة الطالب" withLabel={true} placeholder="ادخل مدرسة الطالب" />
                            </div>
                            <SelectField control={form.control} name="gender" label="الجنس" withLabel={true} withoutImage={true} placeholder="اختر الجنس" options={studentStatusOptions} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="profilePicture"
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-5">
                                                {field.value ? (
                                                    <div className="size-[72px] relative rounded-md overflow-hidden">
                                                        <Image src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value} alt="Workspace image" fill className="object-cover" />
                                                    </div>
                                                ) : (
                                                    <Avatar className="size-[72px]">
                                                        <AvatarFallback>
                                                            <ImageIcon className="size-[36px] text-neutral-400" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className="flex flex-col">
                                                    <p className="text-sm">الصورة الشخصية</p>
                                                    <p className="text-sm text-muted-foreground">JPG, PNG, SVG or JPEG. Max size: 1MB</p>
                                                    <input placeholder="test" className="hidden" accept=".jpg, .jpeg, .png, .svg" type="file" ref={inputRef} disabled={isPending} onChange={handleProfileChange} />
                                                    {field.value ? (
                                                        <Button
                                                            type="button"
                                                            disabled={isPending}
                                                            variant={"destructive"}
                                                            size={"xs"}
                                                            className="w-fit mt-2"
                                                            onClick={() => {
                                                                field.onChange(null);
                                                                if (inputRef.current) {
                                                                    inputRef.current.value = "";
                                                                }
                                                            }}
                                                        >
                                                            احذف الصورة
                                                        </Button>
                                                    ) : (
                                                        <Button type="button" disabled={isPending} variant={"teritary"} size={"xs"} className="w-fit mt-2" onClick={() => inputRef.current?.click()}>
                                                            اضافة صورة
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nationalPicture"
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-5">
                                                {field.value ? (
                                                    <div className="size-[72px] relative rounded-md overflow-hidden">
                                                        <Image src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value} alt="Workspace image" fill className="object-cover" />
                                                    </div>
                                                ) : (
                                                    <Avatar className="size-[72px]">
                                                        <AvatarFallback>
                                                            <ImageIcon className="size-[36px] text-neutral-400" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className="flex flex-col">
                                                    <p className="text-sm">صورة شهادة الميلاد</p>
                                                    <p className="text-sm text-muted-foreground">JPG, PNG, SVG or JPEG. Max size: 1MB</p>
                                                    <input placeholder="test" className="hidden" accept=".jpg, .jpeg, .png, .svg" type="file" ref={imageRef} disabled={isPending} onChange={handleNationalChange} />
                                                    {field.value ? (
                                                        <Button
                                                            type="button"
                                                            disabled={isPending}
                                                            variant={"destructive"}
                                                            size={"xs"}
                                                            className="w-fit mt-2"
                                                            onClick={() => {
                                                                field.onChange(null);
                                                                if (imageRef.current) {
                                                                    imageRef.current.value = "";
                                                                }
                                                            }}
                                                        >
                                                            احذف الصورة
                                                        </Button>
                                                    ) : (
                                                        <Button type="button" disabled={isPending} variant={"teritary"} size={"xs"} className="w-fit mt-2" onClick={() => imageRef.current?.click()}>
                                                            اضافة صورة
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <DottedSeparator className="py-7" />
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                            <Button disabled={isPending} type="button" size={"lg"} variant={"secondary"} onClick={onCancel} className={cn("w-full sm:w-auto", !onCancel && "invisible")}>
                                الغاء
                            </Button>
                            <Button disabled={isPending} type="submit" size={"lg"} className="w-full sm:w-auto">
                                اضافة الطالب
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
