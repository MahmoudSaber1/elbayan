import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.groups)["create"]["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.groups)["create"]["$post"]>;

export const useCreateGroup = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.groups.create["$post"]({ json });

            if (!response.ok) {
                throw new Error("حدث مشكلة في إنشاء الحلقة");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("تم إنشاء الحلقة بنجاح");

            queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
        onError: () => {
            toast.error("حدث مشكلة في إنشاء الحلقة");
        },
    });

    return mutation;
};
