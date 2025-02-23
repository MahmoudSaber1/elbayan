"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { UpdateTeacherFormWrapper } from "./update-teacher-form-wrapper";
import { useUpdateTeachersModal } from "../../hooks/use-update-teacher-modal";

export const UpdateTeacherModal = () => {
    const { teacherId, close } = useUpdateTeachersModal();

    return (
        <ResponsiveModal open={!!teacherId} onOpenChange={close} className="!max-w-3xl">
            {teacherId && <UpdateTeacherFormWrapper id={teacherId} onCancel={close} />}
        </ResponsiveModal>
    );
};
