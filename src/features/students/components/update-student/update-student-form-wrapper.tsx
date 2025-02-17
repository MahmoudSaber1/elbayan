import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { UpdateStudentForm } from "./update-student-form";
import { useGetStudent } from "../../api/use-get-student";

export const UpdateStudentFormWrapper = ({ onCancel, id }: UpdateFormProps) => {
    const { data: initialValues, isLoading: isLoadingTask } = useGetStudent({ studentId: id });

    const isLoading = isLoadingTask;

    if (isLoading) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    if (!initialValues) {
        return null;
    }

    return <UpdateStudentForm onCancel={onCancel} initialValues={initialValues} />;
};
