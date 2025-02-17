import { useQueryState, parseAsString } from "nuqs";

export const useUpdateStudentsModal = () => {
    const [studentId, setStudentId] = useQueryState("update-student", parseAsString);

    const open = (id: string) => setStudentId(id);
    const close = () => setStudentId(null);

    return { studentId, open, close, setStudentId };
};
