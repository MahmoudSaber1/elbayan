/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";

import { Avatar } from "@/components/avatar";

import { Button } from "@/components/ui/button";

import { Group } from "../../types";
import { GroupActions } from "../group-actions";
import { useGetTeacherName } from "../../hooks/get-teacher-name";

export const columns: ColumnDef<Group>[] = [
    {
        accessorKey: "groupNumber",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    رقم الحلقة
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const groupNumber = row.original.groupNumber;

            return <p className="line-clamp-1">{groupNumber}</p>;
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    اسم الحلقة
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const name = row.original.name;

            return (
                <div className="flex items-center gap-x-2 text-sm font-medium">
                    <Avatar className="size-6" name={name} />
                    <p className="line-clamp-1">{name}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "teacherId",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    اسم العلم
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const teacherId = row.original.teacherId;
            if (!teacherId) return null;
            const name = useGetTeacherName(teacherId);

            return <p className="line-clamp-1">{name}</p>;
        },
    },
    {
        accessorKey: "studentsCount",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    عدد الطلاب
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const studentsCount = row.original.students;

            return <p className="line-clamp-1">{studentsCount.length}</p>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const id = row.original.$id;

            return (
                <GroupActions id={id}>
                    <Button variant={"ghost"} className="size-8 p-0">
                        <MoreVertical className="size-4" />
                    </Button>
                </GroupActions>
            );
        },
    },
];
