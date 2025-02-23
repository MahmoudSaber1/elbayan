/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { DateField, InputField, MultiSelectField, SelectField } from "@/components/input-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createTeacherSchema } from "../../schemas";
import { Teacher, TeacherGender } from "../../types";
import { useUpdateTeacher } from "../../api/use-update-teacher";

const teacherStatusOptions = [
    { id: TeacherGender.MALE, name: "ذكر" },
    { id: TeacherGender.FEMALE, name: "انثي" },
];

export const UpdateTeacherForm = ({ onCancel, initialValues, studentOptions }: UpdateTeacherFormProps<Teacher>) => {
    const { mutate: updateTeacherMutate, isPending } = useUpdateTeacher();

    const form = useForm<z.infer<typeof createTeacherSchema>>({
        resolver: zodResolver(createTeacherSchema),
        defaultValues: {
            ...initialValues,
            birthDate: initialValues.birthDate ? new Date(initialValues.birthDate) : undefined,
            hireDate: initialValues.hireDate ? new Date(initialValues.hireDate) : undefined,
            studentIds: initialValues.studentIds ?? [],
            groupIds: initialValues.groupIds ?? [],
        },
    });

    const onSubmit = (values: z.infer<typeof createTeacherSchema>) => {
        const finalValues = { ...values };
        updateTeacherMutate(
            { json: finalValues as any, param: { teacherId: initialValues.$id } },
            {
                onSuccess: () => {
                    form.reset();
                    onCancel?.();
                },
            }
        );
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">تعديل المعلم</CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField control={form.control} name="name" type="text" label="اسم المعلم" withLabel={true} placeholder="ادخل اسم المعلم" />
                                <DateField control={form.control} name="birthDate" label="تاريخ الميلاد" placeholder="ادخل تاريخ الميلاد" withLabel={true} />
                                <DateField control={form.control} name="hireDate" label="تاريخ التعيين" placeholder="ادخل تاريخ التعيين" withLabel={true} />
                                <InputField control={form.control} name="nationalId" type="text" label="الرقم القومي للمعلم" withLabel={true} placeholder="ادخل الرقم القومي للمعلم" />
                                <InputField control={form.control} name="phone" type="text" label="رقم المعلم" withLabel={true} placeholder="ادخل رقم المعلم" />
                                <MultiSelectField control={form.control} name="studentIds" label="الطلاب" withLabel={true} placeholder="اختر الطلاب" options={studentOptions} />
                                <SelectField control={form.control} name="gender" label="الجنس" withLabel={true} withoutImage={true} placeholder="اختر الجنس" options={teacherStatusOptions} />
                            </div>
                        </div>
                        <DottedSeparator className="py-7" />
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                            <Button disabled={isPending} type="button" size={"lg"} variant={"secondary"} onClick={onCancel} className={cn("w-full sm:w-auto", !onCancel && "invisible")}>
                                الغاء
                            </Button>
                            <Button disabled={isPending} type="submit" size={"lg"} className="w-full sm:w-auto">
                                تعديل المعلم
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
