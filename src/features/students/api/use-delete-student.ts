import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.students.delete)[":studentId"]["$delete"], 200>;
type RequestType = InferRequestType<(typeof client.api.students.delete)[":studentId"]["$delete"]>;

export const useDeleteStudent = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.students.delete[":studentId"]["$delete"]({ param });

            if (!response.ok) {
                throw new Error("حدث مشكلة في حذف الطالب");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("تم حذف الطالب بنجاح");

            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
        onError: () => {
            toast.error("حدث مشكلة في حذف الطالب");
        },
    });

    return mutation;
};
