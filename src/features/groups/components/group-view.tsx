"use client";

import { Loader, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";

import { columns } from "./table/columns";
import { DataFilters } from "./data-filters";
import { DataTable } from "./table/data-table";
import { useGetGroups } from "../api/use-get-groups";
import { useGroupFilters } from "../hooks/use-group-filters";
import { useCreateGroupsModal } from "../hooks/use-create-group-modal";

const GroupView = () => {
    const [{ search }] = useGroupFilters();

    const { data: groups, isPending: isLoadingGroups } = useGetGroups({ search });
    const { open } = useCreateGroupsModal();

    return (
        <div className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <h1 className="text-2xl font-semibold">الحلقات</h1>
                    <Button onClick={open} size={"sm"} className="w-full lg:w-auto">
                        <PlusIcon className="size-4 mr-2" />
                        اضافة حلقة
                    </Button>
                </div>
                <DottedSeparator className="my-4" />
                <DataFilters />
                <DottedSeparator className="my-4" />
                {isLoadingGroups ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <DataTable columns={columns} data={groups?.documents ?? []} />
                    </>
                )}
            </div>
        </div>
    );
};

export default GroupView;
