import { useParams } from "next/navigation";

export const useGroupId = () => {
    const params = useParams();
    const { groupId } = params as { groupId: string };
    return groupId;
};
