import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

import { StudentGender } from "@/features/students/types";

export const useStudentFilters = () => {
    return useQueryStates({
        gender: parseAsStringEnum(Object.values(StudentGender)),
        search: parseAsString,
        birthDate: parseAsString,
    });
};
