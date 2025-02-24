import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useGetTeachers } from "@/features/teachers/api/use-get-teachers";
import { useGetStudents } from "@/features/students/api/use-get-students";

import { CreateGroupForm } from "./create-group-form";

export const CreateGroupFormWrapper = ({ onCancel }: CreateGroupFormProps) => {
    const { data: teachers, isLoading: isLoadingTeachers } = useGetTeachers({});
    const { data: students, isLoading: isLoadingStudents } = useGetStudents({});

    const teacherOptions = teachers?.documents?.map((teacher) => ({ id: teacher.$id, name: teacher.name, imageUrl: teacher.imageUrl })) || [];
    const studentOptions = students?.documents?.map((student) => ({ id: student.$id, name: student.name, imageUrl: student.imageUrl })) || [];

    const isLoading = isLoadingStudents || isLoadingTeachers;

    if (isLoading) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    return <CreateGroupForm onCancel={onCancel} teacherOptions={teacherOptions} studentOptions={studentOptions} />;
};
