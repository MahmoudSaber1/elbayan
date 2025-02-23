import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.groups.update)[":groupId"]["$put"], 200>;
type RequestType = InferRequestType<(typeof client.api.groups.update)[":groupId"]["$put"]>;

export const useUpdateGroup = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.groups.update[":groupId"]["$put"]({ param, json });

            if (!response.ok) {
                throw new Error("حدث مشكلة في تعديل الحلقة");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("تم تعديل الحلقة بنجاح");

            queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
        onError: () => {
            toast.error("حدث مشكلة في تعديل الحلقة");
        },
    });

    return mutation;
};
