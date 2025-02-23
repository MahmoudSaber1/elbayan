// import { useRouter } from "next/navigation";
// ExternalLinkIcon,
import { PencilIcon, TrashIcon } from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useDeleteGroup } from "../api/use-delete-group";
import { useUpdateGroupsModal } from "../hooks/use-update-group-modal";

export const GroupActions = ({ id, children }: GroupActionsProps) => {
    // const router = useRouter();

    const { open } = useUpdateGroupsModal();

    const { mutate: deleteGroup, isPending: isGroupDeletePending } = useDeleteGroup();
    const [confirmDelete, DeleteDialog] = useConfirm("حذف الحلقة", "هل تريد حذف هذا الحلقة؟", "destructive");
    const handleDelete = async () => {
        const ok = await confirmDelete();
        if (!ok) return;

        deleteGroup({ param: { groupId: id } });
    };

    // const onOpenGroup = () => {
    //     router.push(`/groups/${id}`);
    // };

    return (
        <div className="flex justify-end">
            <DeleteDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    {/* <DropdownMenuItem onClick={onOpenGroup} className="cursor-pointer font-medium p-[10px]">
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                        تفاصيل المعلم
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => open(id)} disabled={false} className="cursor-pointer font-medium p-[10px]">
                        <PencilIcon className="size-4 mr-2 stroke-2" />
                        تعديل
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} disabled={isGroupDeletePending} className="text-amber-700 focus:text-amber-700 cursor-pointer font-medium p-[10px]">
                        <TrashIcon className="size-4 mr-2 stroke-2" />
                        حذف
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
