import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { UpdateTeacherForm } from "./update-teacher-form";
import { useGetTeacher } from "../../api/use-get-teacher";
import { useGetStudents } from "@/features/students/api/use-get-students";

export const UpdateTeacherFormWrapper = ({ onCancel, id }: UpdateFormProps) => {
    const { data: initialValues, isLoading: isLoadingTask } = useGetTeacher({ teacherId: id });
    const { data: students, isLoading: isLoadingStudents } = useGetStudents({});

    const studentOptions = students?.documents?.map((student) => ({ id: student.$id, name: student.name, imageUrl: student.imageUrl })) || [];

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

    return <UpdateTeacherForm onCancel={onCancel} initialValues={initialValues} studentOptions={studentOptions} />;
};
