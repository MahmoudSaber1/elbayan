import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetGroup = ({ groupId }: { groupId: string }) => {
    const query = useQuery({
        queryKey: ["group", groupId],
        queryFn: async () => {
            const response = await client.api.groups[":groupId"]["$get"]({ param: { groupId } });

            if (!response.ok) {
                throw new Error("لم يتم العثور على الحلقة");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
