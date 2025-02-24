/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputField, MultiSelectField, SelectField } from "@/components/input-field";

import { Group } from "../../types";
import { createGroupSchema } from "../../schemas";
import { useUpdateGroup } from "../../api/use-update-group";

export const UpdateGroupForm = ({ onCancel, initialValues, teacherOptions, studentOptions }: UpdateGroupFormProps<Group>) => {
    const { mutate: updateGroupMutate, isPending } = useUpdateGroup();

    const form = useForm<z.infer<typeof createGroupSchema>>({
        resolver: zodResolver(createGroupSchema),
        defaultValues: {
            ...initialValues,
            groupNumber: initialValues.groupNumber || "",
        },
    });

    const onSubmit = (values: z.infer<typeof createGroupSchema>) => {
        const finalValues = { ...values };
        updateGroupMutate(
            { json: finalValues as any, param: { groupId: initialValues.$id } },
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
                <CardTitle className="text-xl font-bold">تعديل الحلقة</CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField control={form.control} name="groupNumber" type="text" label="رقم الحلقة" withLabel={true} placeholder="ادخل رقم الحلقة" />
                                <InputField control={form.control} name="name" type="text" label="اسم الحلقة" withLabel={true} placeholder="ادخل اسم الحلقة" />
                                <MultiSelectField control={form.control} name="students" label="الطلاب" withLabel={true} placeholder="اختر الطلاب" options={studentOptions} />
                                <SelectField control={form.control} name="teacherId" label="المعلم" withLabel={true} withoutImage={true} placeholder="اختر المعلم" options={teacherOptions} />
                            </div>
                        </div>
                        <DottedSeparator className="py-7" />
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                            <Button disabled={isPending} type="button" size={"lg"} variant={"secondary"} onClick={onCancel} className={cn("w-full sm:w-auto", !onCancel && "invisible")}>
                                الغاء
                            </Button>
                            <Button disabled={isPending} type="submit" size={"lg"} className="w-full sm:w-auto">
                                تعديل الحلقة
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
