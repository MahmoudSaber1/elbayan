import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

import { TeacherGender } from "@/features/teachers/types";

export const useTeacherFilters = () => {
    return useQueryStates({
        gender: parseAsStringEnum(Object.values(TeacherGender)),
        search: parseAsString,
        birthDate: parseAsString,
    });
};
