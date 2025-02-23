import { useQueryState, parseAsString } from "nuqs";

export const useUpdateTeachersModal = () => {
    const [teacherId, setTeacherId] = useQueryState("update-teacher", parseAsString);

    const open = (id: string) => setTeacherId(id);
    const close = () => setTeacherId(null);

    return { teacherId, open, close, setTeacherId };
};
