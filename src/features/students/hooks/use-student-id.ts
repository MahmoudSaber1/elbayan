import { useParams } from "next/navigation";

export const useStudentId = () => {
    const params = useParams();
    const { studentId } = params as { studentId: string };
    return studentId;
};
