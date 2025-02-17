"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateStudentFormWrapper } from "./create-student-form-wrapper";
import { useCreateStudentsModal } from "../../hooks/use-create-student-modal";

export const CreateStudentModal = () => {
    const { isOpen, close, setIsOpen } = useCreateStudentsModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen} className="!max-w-3xl">
            <CreateStudentFormWrapper onCancel={close} />
        </ResponsiveModal>
    );
};
