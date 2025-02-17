import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.students)["create"]["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.students)["create"]["$post"]>;

export const useCreateStudent = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await client.api.students.create["$post"]({ form });

            if (!response.ok) {
                throw new Error("حدث مشكلة في إنشاء الطالب");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("تم إنشاء الطالب بنجاح");

            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
        onError: () => {
            toast.error("حدث مشكلة في إنشاء الطالب");
        },
    });

    return mutation;
};
