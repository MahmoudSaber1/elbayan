"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { DateField, InputField, SelectField } from "@/components/input-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createStudentSchema } from "../../schemas";
import { Student, StudentGender } from "../../types";
import { useUpdateStudent } from "../../api/use-update-student";

const studentStatusOptions = [
    { id: StudentGender.MALE, name: "ذكر" },
    { id: StudentGender.FEMALE, name: "انثي" },
];

export const UpdateStudentForm = ({ onCancel, initialValues }: UpdateStudentFormProps<Student>) => {
    const { mutate: updateStudentMutate, isPending } = useUpdateStudent();

    const form = useForm<z.infer<typeof createStudentSchema>>({
        resolver: zodResolver(createStudentSchema),
        defaultValues: {
            ...initialValues,
            birthDate: initialValues.birthDate ? new Date(initialValues.birthDate) : undefined,
        },
    });

    const onSubmit = (values: z.infer<typeof createStudentSchema>) => {
        const finalValues = { ...values };
        updateStudentMutate(
            { json: finalValues, param: { studentId: initialValues.$id } },
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
                <CardTitle className="text-xl font-bold">تعديل الطالب</CardTitle>
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
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField control={form.control} name="code" type="text" label="كود الطالب" withLabel={true} placeholder="ادخل كود الطالب" />
                                <InputField control={form.control} name="nationalId" type="text" label="الرقم القومي للطالب" withLabel={true} placeholder="ادخل الرقم القومي للطالب" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField control={form.control} name="phone" type="text" label="رقم الطالب" withLabel={true} placeholder="ادخل رقم الطالب" />
                                <InputField control={form.control} name="guardianPhone" type="text" label="رقم ولي امر الطالب" withLabel={true} placeholder="ادخل رقم ولي الامر" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField control={form.control} name="address" type="text" label="عنوان الطالب" withLabel={true} placeholder="ادخل عنوان الطالب" />
                                <InputField control={form.control} name="school" type="text" label="مدرسة الطالب" withLabel={true} placeholder="ادخل مدرسة الطالب" />
                            </div>
                            <SelectField control={form.control} name="gender" label="الجنس" withLabel={true} withoutImage={true} placeholder="اختر الجنس" options={studentStatusOptions} />
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
