// import { useRouter } from "next/navigation";
// ExternalLinkIcon,
import { PencilIcon, TrashIcon } from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useDeleteTeacher } from "../api/use-delete-teacher";
import { useUpdateTeachersModal } from "../hooks/use-update-teacher-modal";

export const TeacherActions = ({ id, children }: TeacherActionsProps) => {
    // const router = useRouter();

    const { open } = useUpdateTeachersModal();

    const { mutate: deleteTeacher, isPending: isTeacherDeletePending } = useDeleteTeacher();
    const [confirmDelete, DeleteDialog] = useConfirm("حذف المعلم", "هل تريد حذف هذا المعلم؟", "destructive");
    const handleDelete = async () => {
        const ok = await confirmDelete();
        if (!ok) return;

        deleteTeacher({ param: { teacherId: id } });
    };

    // const onOpenTeacher = () => {
    //     router.push(`/teachers/${id}`);
    // };

    return (
        <div className="flex justify-end">
            <DeleteDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    {/* <DropdownMenuItem onClick={onOpenTeacher} className="cursor-pointer font-medium p-[10px]">
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                        تفاصيل المعلم
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => open(id)} disabled={false} className="cursor-pointer font-medium p-[10px]">
                        <PencilIcon className="size-4 mr-2 stroke-2" />
                        تعديل
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} disabled={isTeacherDeletePending} className="text-amber-700 focus:text-amber-700 cursor-pointer font-medium p-[10px]">
                        <TrashIcon className="size-4 mr-2 stroke-2" />
                        حذف
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
