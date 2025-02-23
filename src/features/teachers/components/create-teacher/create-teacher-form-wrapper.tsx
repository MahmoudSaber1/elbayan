import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useGetStudents } from "@/features/students/api/use-get-students";

import { CreateTeacherForm } from "./create-teacher-form";

export const CreateTeacherFormWrapper = ({ onCancel }: CreateTeacherFormProps) => {
    const { data: students, isLoading: isLoadingStudents } = useGetStudents({});

    const studentOptions = students?.documents?.map((student) => ({ id: student.$id, name: student.name, imageUrl: student.imageUrl })) || [];

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

    return <CreateTeacherForm onCancel={onCancel} studentOptions={studentOptions} />;
};
