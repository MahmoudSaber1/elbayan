import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { UpdateGroupForm } from "./update-group-form";
import { useGetGroup } from "../../api/use-get-group";
import { useGetTeachers } from "@/features/teachers/api/use-get-teachers";

export const UpdateGroupFormWrapper = ({ onCancel, id }: UpdateFormProps) => {
    const { data: initialValues, isLoading: isLoadingTask } = useGetGroup({ groupId: id });
    const { data: teachers, isLoading: isLoadingStudents } = useGetTeachers({});

    const teacherOptions = teachers?.documents?.map((teacher) => ({ id: teacher.$id, name: teacher.name, imageUrl: teacher.imageUrl })) || [];

    const isLoading = isLoadingTask || isLoadingStudents;

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

    return <UpdateGroupForm onCancel={onCancel} initialValues={initialValues} teacherOptions={teacherOptions} />;
};
