import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.groups.delete)[":groupId"]["$delete"], 200>;
type RequestType = InferRequestType<(typeof client.api.groups.delete)[":groupId"]["$delete"]>;

export const useDeleteGroup = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.groups.delete[":groupId"]["$delete"]({ param });

            if (!response.ok) {
                throw new Error("حدث مشكلة في حذف الحلقة");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("تم حذف الحلقة بنجاح");

            queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
        onError: () => {
            toast.error("حدث مشكلة في حذف الحلقة");
        },
    });

    return mutation;
};
