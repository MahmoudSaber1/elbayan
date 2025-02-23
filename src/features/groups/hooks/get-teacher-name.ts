import { useGetTeacher } from "@/features/teachers/api/use-get-teacher";

export const useGetTeacherName = (teacherId: string) => {
    const { data: teacher } = useGetTeacher({ teacherId: teacherId });

    return teacher?.name;
};
