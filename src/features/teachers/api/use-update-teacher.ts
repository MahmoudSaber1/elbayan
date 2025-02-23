import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.teachers.update)[":teacherId"]["$put"], 200>;
type RequestType = InferRequestType<(typeof client.api.teachers.update)[":teacherId"]["$put"]>;

export const useUpdateTeacher = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.teachers.update[":teacherId"]["$put"]({ param, json });

            if (!response.ok) {
                throw new Error("حدث مشكلة في تعديل المعلم");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("تم تعديل المعلم بنجاح");

            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        },
        onError: () => {
            toast.error("حدث مشكلة في تعديل المعلم");
        },
    });

    return mutation;
};
