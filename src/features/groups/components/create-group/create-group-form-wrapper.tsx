import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useGetTeachers } from "@/features/teachers/api/use-get-teachers";

import { CreateGroupForm } from "./create-group-form";

export const CreateGroupFormWrapper = ({ onCancel }: CreateGroupFormProps) => {
    const { data: students, isLoading: isLoadingStudents } = useGetTeachers({});

    const teacherOptions = students?.documents?.map((teacher) => ({ id: teacher.$id, name: teacher.name, imageUrl: teacher.imageUrl })) || [];

    const isLoading = isLoadingStudents;

    if (isLoading) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    return <CreateGroupForm onCancel={onCancel} teacherOptions={teacherOptions} />;
};
