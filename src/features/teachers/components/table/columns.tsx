"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";

import { Avatar } from "@/components/avatar";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Teacher } from "../../types";
import { TeacherActions } from "../teacher-actions";

export const columns: ColumnDef<Teacher>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    اسم المعلم
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
        accessorKey: "nationalId",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    الرقم القومي
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const nationalId = row.original.nationalId;

            return <p className="line-clamp-1">{nationalId}</p>;
        },
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    رقم الهاتف
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const phone = row.original.phone;

            return <p className="line-clamp-1">{phone}</p>;
        },
    },
    {
        accessorKey: "birthDate",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    تاريخ الميلاد
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const birthDate = row.original.birthDate;

            return <p className="line-clamp-1">{new Date(birthDate).toLocaleDateString()}</p>;
        },
    },
    {
        accessorKey: "age",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    العمر
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const birthDate = row.original.birthDate;

            const age = new Date().getFullYear() - new Date(birthDate).getFullYear();

            return <p className="line-clamp-1">{age}</p>;
        },
    },
    {
        accessorKey: "hireDate",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    تاريخ التعيين
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const hireDate = row.original.hireDate;

            return <p className="line-clamp-1">{new Date(hireDate).toLocaleDateString()}</p>;
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
            const studentsCount = row.original.studentIds;

            return <p className="line-clamp-1">{studentsCount.length}</p>;
        },
    },
    {
        accessorKey: "gender",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    النوع
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const gender = row.original.gender;

            return <Badge variant={gender === "MALE" ? "default" : "secondary"}>{gender === "MALE" ? "ذكر" : "انثي"}</Badge>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const id = row.original.$id;

            return (
                <TeacherActions id={id}>
                    <Button variant={"ghost"} className="size-8 p-0">
                        <MoreVertical className="size-4" />
                    </Button>
                </TeacherActions>
            );
        },
    },
];
