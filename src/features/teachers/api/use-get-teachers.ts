import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { TeacherGender } from "../types";

export const useGetTeachers = ({ gender, birthDate, search }: GetTeacherProps<TeacherGender | null>) => {
    const query = useQuery({
        queryKey: ["teachers", { gender, birthDate, search }],
        queryFn: async () => {
            const response = await client.api.teachers["$get"]({ query: { birthDate: birthDate ?? undefined, search: search ?? undefined, gender: gender ?? undefined } });

            if (!response.ok) {
                throw new Error("لم يتم العثور على المعلمين");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
