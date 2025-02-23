"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateTeacherFormWrapper } from "./create-teacher-form-wrapper";
import { useCreateTeachersModal } from "../../hooks/use-create-teacher-modal";

export const CreateTeacherModal = () => {
    const { isOpen, close, setIsOpen } = useCreateTeachersModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen} className="!max-w-3xl">
            <CreateTeacherFormWrapper onCancel={close} />
        </ResponsiveModal>
    );
};
