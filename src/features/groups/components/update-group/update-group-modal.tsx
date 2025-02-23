"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { UpdateGroupFormWrapper } from "./update-group-form-wrapper";
import { useUpdateGroupsModal } from "../../hooks/use-update-group-modal";

export const UpdateGroupModal = () => {
    const { groupId, close } = useUpdateGroupsModal();

    return (
        <ResponsiveModal open={!!groupId} onOpenChange={close} className="!max-w-3xl">
            {groupId && <UpdateGroupFormWrapper id={groupId} onCancel={close} />}
        </ResponsiveModal>
    );
};
