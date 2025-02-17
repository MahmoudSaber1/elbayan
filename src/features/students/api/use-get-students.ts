import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { StudentGender } from "../types";

export const useGetStudents = ({ gender, birthDate, search }: GetStudentProps<StudentGender | null>) => {
    const query = useQuery({
        queryKey: ["students", { gender, birthDate, search }],
        queryFn: async () => {
            const response = await client.api.students["$get"]({ query: { birthDate: birthDate ?? undefined, search: search ?? undefined, gender: gender ?? undefined } });

            if (!response.ok) {
                throw new Error("لم يتم العثور على الطلاب");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
