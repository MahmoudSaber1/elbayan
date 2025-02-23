import { z } from "zod";

import { TeacherGender } from "./types";

export const createTeacherSchema = z.object({
    name: z.string().trim().min(1, "الاسم مطلوب").max(256, "الاسم يجب ان يكون اقل من 256 حرف"),
    birthDate: z.coerce.date().optional().nullable(),
    hireDate: z.coerce.date().optional().nullable(),
    nationalId: z.string().trim().min(1, "الرقم القومي مطلوب").max(50, "الرقم القومي يجب ان يكون اقل من 50 حرف"),
    phone: z.string().optional(),
    gender: z.nativeEnum(TeacherGender, { required_error: "النوع مطلوب" }),
    studentIds: z.any().optional(),
    groupIds: z.any().optional(),
});

export const getTeacherSchema = z.object({
    gender: z.nativeEnum(TeacherGender).nullish(),
    search: z.string().nullish(),
    birthDate: z.string().nullish(),
});
