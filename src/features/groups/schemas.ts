import { z } from "zod";

export const createGroupSchema = z.object({
    name: z.string().trim().min(1, "الاسم مطلوب").max(256, "الاسم يجب ان يكون اقل من 256 حرف"),
    teacherId: z.string().trim().min(1, "المعلم مطلوب").max(256, "الاسم يجب ان يكون اقل من 256 حرف"),
});

export const getGroupSchema = z.object({
    search: z.string().nullish(),
});
