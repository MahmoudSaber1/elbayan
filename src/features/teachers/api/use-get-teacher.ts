import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetTeacher = ({ teacherId }: { teacherId: string }) => {
    const query = useQuery({
        queryKey: ["teacher", teacherId],
        queryFn: async () => {
            const response = await client.api.teachers[":teacherId"]["$get"]({ param: { teacherId } });

            if (!response.ok) {
                throw new Error("لم يتم العثور على المعلم");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
