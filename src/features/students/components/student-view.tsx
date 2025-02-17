"use client";

import { Loader, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";

import { columns } from "./table/columns";
import { DataFilters } from "./data-filters";
import { DataTable } from "./table/data-table";
import { useGetStudents } from "../api/use-get-students";
import { useStudentFilters } from "../hooks/use-student-filters";
import { useCreateStudentsModal } from "../hooks/use-create-student-modal";

const StudentView = () => {
    const [{ gender, search, birthDate }] = useStudentFilters();

    const { data: students, isPending: isLoadingStudents } = useGetStudents({ gender, birthDate, search });
    const { open } = useCreateStudentsModal();

    return (
        <div className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <h1 className="text-2xl font-semibold">الطلاب</h1>
                    <Button onClick={open} size={"sm"} className="w-full lg:w-auto">
                        <PlusIcon className="size-4 mr-2" />
                        اضافة طالب
                    </Button>
                </div>
                <DottedSeparator className="my-4" />
                <DataFilters />
                <DottedSeparator className="my-4" />
                {isLoadingStudents ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <DataTable columns={columns} data={students?.documents ?? []} />
                    </>
                )}
            </div>
        </div>
    );
};

export default StudentView;
