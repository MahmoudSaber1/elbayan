import { useParams } from "next/navigation";

export const useTeacherId = () => {
    const params = useParams();
    const { teacherId } = params as { teacherId: string };
    return teacherId;
};
