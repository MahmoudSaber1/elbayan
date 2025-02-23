// import { useRouter } from "next/navigation";
// ExternalLinkIcon,
import { PencilIcon, TrashIcon } from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useDeleteStudent } from "../api/use-delete-student";
import { useUpdateStudentsModal } from "../hooks/use-update-student-modal";

export const StudentActions = ({ id, children }: StudentActionsProps) => {
    // const router = useRouter();

    const { open } = useUpdateStudentsModal();

    const { mutate: deleteStudent, isPending: isStudentDeletePending } = useDeleteStudent();
    const [confirmDelete, DeleteDialog] = useConfirm("حذف الطالب", "هل تريد حذف هذا الطالب؟", "destructive");
    const handleDelete = async () => {
        const ok = await confirmDelete();
        if (!ok) return;

        deleteStudent({ param: { studentId: id } });
    };

    // const onOpenStudent = () => {
    //     router.push(`/students/${id}`);
    // };

    return (
        <div className="flex justify-end">
            <DeleteDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    {/* <DropdownMenuItem onClick={onOpenStudent} className="cursor-pointer font-medium p-[10px]">
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                        تفاصيل الطالب
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => open(id)} disabled={false} className="cursor-pointer font-medium p-[10px]">
                        <PencilIcon className="size-4 mr-2 stroke-2" />
                        تعديل
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} disabled={isStudentDeletePending} className="text-amber-700 focus:text-amber-700 cursor-pointer font-medium p-[10px]">
                        <TrashIcon className="size-4 mr-2 stroke-2" />
                        حذف
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
