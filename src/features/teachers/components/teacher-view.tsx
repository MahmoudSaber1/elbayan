"use client";

import { Loader, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";

import { columns } from "./table/columns";
import { DataFilters } from "./data-filters";
import { DataTable } from "./table/data-table";
import { useGetTeachers } from "../api/use-get-teachers";
import { useTeacherFilters } from "../hooks/use-teacher-filters";
import { useCreateTeachersModal } from "../hooks/use-create-teacher-modal";

const TeacherView = () => {
    const [{ gender, search, birthDate }] = useTeacherFilters();

    const { data: teachers, isPending: isLoadingTeachers } = useGetTeachers({ gender, birthDate, search });
    const { open } = useCreateTeachersModal();

    return (
        <div className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <h1 className="text-2xl font-semibold">المعلمين</h1>
                    <Button onClick={open} size={"sm"} className="w-full lg:w-auto">
                        <PlusIcon className="size-4 mr-2" />
                        اضافة معلم
                    </Button>
                </div>
                <DottedSeparator className="my-4" />
                <DataFilters />
                <DottedSeparator className="my-4" />
                {isLoadingTeachers ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <DataTable columns={columns} data={teachers?.documents ?? []} />
                    </>
                )}
            </div>
        </div>
    );
};

export default TeacherView;
