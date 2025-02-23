import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.teachers)["create"]["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.teachers)["create"]["$post"]>;

export const useCreateTeacher = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.teachers.create["$post"]({ json });

            if (!response.ok) {
                throw new Error("حدث مشكلة في إنشاء المعلم");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("تم إنشاء المعلم بنجاح");

            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        },
        onError: () => {
            toast.error("حدث مشكلة في إنشاء المعلم");
        },
    });

    return mutation;
};
