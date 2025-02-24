import { z } from "zod";

export const createGroupSchema = z.object({
    name: z.string().trim().min(1, "الاسم مطلوب").max(256, "الاسم يجب ان يكون اقل من 256 حرف"),
    teacherId: z.string().trim().min(1, "المعلم مطلوب").max(256, "الاسم يجب ان يكون اقل من 256 حرف"),
    groupNumber: z.string().trim().min(1, "رقم المجموعة يجب ان يكون اكبر من 0"),
    students: z.array(z.string()).min(1, "الطلاب مطلوبين"),
});

export const getGroupSchema = z.object({
    search: z.string().nullish(),
});
