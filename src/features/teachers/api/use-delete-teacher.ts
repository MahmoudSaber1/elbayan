import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.teachers.delete)[":teacherId"]["$delete"], 200>;
type RequestType = InferRequestType<(typeof client.api.teachers.delete)[":teacherId"]["$delete"]>;

export const useDeleteTeacher = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.teachers.delete[":teacherId"]["$delete"]({ param });

            if (!response.ok) {
                throw new Error("حدث مشكلة في حذف المعلم");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("تم حذف المعلم بنجاح");

            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        },
        onError: () => {
            toast.error("حدث مشكلة في حذف المعلم");
        },
    });

    return mutation;
};
