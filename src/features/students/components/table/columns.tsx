"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";

import { Avatar } from "@/components/avatar";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Student } from "../../types";
import { StudentActions } from "../student-actions";

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    اسم الطالب
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const name = row.original.name;
            const profilePicture = row.original.profilePicture;

            return (
                <div className="flex items-center gap-x-2 text-sm font-medium">
                    <Avatar className="size-6" name={name} image={profilePicture} />
                    <p className="line-clamp-1">{name}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "code",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    كود الطالب
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const code = row.original.code;

            return <p className="line-clamp-1">{code}</p>;
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
        accessorKey: "guardianPhone",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    رقم الوالد
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const phone = row.original.guardianPhone;

            return <p className="line-clamp-1">{phone}</p>;
        },
    },
    {
        accessorKey: "address",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    العنوان
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const address = row.original.address;

            return <p className="line-clamp-1">{address}</p>;
        },
    },
    {
        accessorKey: "school",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    المدرسة
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const school = row.original.school;

            return <p className="line-clamp-1">{school}</p>;
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
                <StudentActions id={id}>
                    <Button variant={"ghost"} className="size-8 p-0">
                        <MoreVertical className="size-4" />
                    </Button>
                </StudentActions>
            );
        },
    },
];
