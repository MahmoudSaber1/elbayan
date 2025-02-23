import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetGroups = ({ search }: GetGroupProps) => {
    const query = useQuery({
        queryKey: ["groups", { search }],
        queryFn: async () => {
            const response = await client.api.groups["$get"]({ query: { search: search ?? undefined } });

            if (!response.ok) {
                throw new Error("لم يتم العثور على الحلقات");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
