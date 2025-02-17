"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { UpdateStudentFormWrapper } from "./update-student-form-wrapper";
import { useUpdateStudentsModal } from "../../hooks/use-update-student-modal";

export const UpdateStudentModal = () => {
    const { studentId, close } = useUpdateStudentsModal();

    return (
        <ResponsiveModal open={!!studentId} onOpenChange={close} className="!max-w-3xl">
            {studentId && <UpdateStudentFormWrapper id={studentId} onCancel={close} />}
        </ResponsiveModal>
    );
};
