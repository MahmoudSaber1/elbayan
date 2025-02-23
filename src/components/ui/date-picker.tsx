"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const DatePicker = ({ onChange, value, className, placeholder = "اختر تاريخ" }: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"default"} className={cn("w-full justify-start text-left font-normal px-3", !value && "text-muted-foreground", className)}>
                    {value ? format(value, "PPP") : <span>{placeholder}</span>}
                    <CalendarIcon className="mr-2 size-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => onChange(date as Date)}
                    initialFocus
                    captionLayout="dropdown" // إضافة القوائم المنسدلة لاختيار الشهر والسنة
                    fromYear={2000} // تحديد أقل سنة متاحة
                    toYear={2030}
                />
            </PopoverContent>
        </Popover>
    );
};
