import { useQueryState, parseAsString } from "nuqs";

export const useUpdateGroupsModal = () => {
    const [groupId, setGroupId] = useQueryState("update-group", parseAsString);

    const open = (id: string) => setGroupId(id);
    const close = () => setGroupId(null);

    return { groupId, open, close, setGroupId };
};
