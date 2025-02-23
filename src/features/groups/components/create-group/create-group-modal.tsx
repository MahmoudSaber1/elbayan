"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateGroupFormWrapper } from "./create-group-form-wrapper";
import { useCreateGroupsModal } from "../../hooks/use-create-group-modal";

export const CreateGroupModal = () => {
    const { isOpen, close, setIsOpen } = useCreateGroupsModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen} className="!max-w-3xl">
            <CreateGroupFormWrapper onCancel={close} />
        </ResponsiveModal>
    );
};
