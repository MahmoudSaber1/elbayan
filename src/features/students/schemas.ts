import { z } from "zod";

import { StudentGender } from "./types";

export const createStudentSchema = z.object({
    name: z.string().trim().min(1, "الاسم مطلوب").max(256, "الاسم يجب ان يكون اقل من 256 حرف"),
    code: z.string().trim().min(1, "الكود مطلوب").max(50, "الاسم يجب ان يكون اقل من 50 حرف"),
    birthDate: z.coerce.date().optional().nullable(),
    nationalId: z.string().trim().min(1, "الرقم القومي مطلوب").max(50, "الرقم القومي يجب ان يكون اقل من 50 حرف"),
    phone: z.string().optional(),
    guardianPhone: z.string().optional(),
    profilePicture: z.string().optional(),
    address: z.string().optional(),
    school: z.string().optional(),
    gender: z.nativeEnum(StudentGender, { required_error: "النوع مطلوب" }),
});

export const getStudentSchema = z.object({
    gender: z.nativeEnum(StudentGender).nullish(),
    search: z.string().nullish(),
    birthDate: z.string().nullish(),
});
