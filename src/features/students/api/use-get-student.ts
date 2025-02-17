import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetStudent = ({ studentId }: { studentId: string }) => {
    const query = useQuery({
        queryKey: ["student", studentId],
        queryFn: async () => {
            const response = await client.api.students[":studentId"]["$get"]({ param: { studentId } });

            if (!response.ok) {
                throw new Error("لم يتم العثور على الطالب");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
