import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.students.update)[":studentId"]["$put"], 200>;
type RequestType = InferRequestType<(typeof client.api.students.update)[":studentId"]["$put"]>;

export const useUpdateStudent = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.students.update[":studentId"]["$put"]({ param, json });

            if (!response.ok) {
                throw new Error("حدث مشكلة في تعديل الطالب");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("تم تعديل الطالب بنجاح");

            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
        onError: () => {
            toast.error("حدث مشكلة في تعديل الطالب");
        },
    });

    return mutation;
};
