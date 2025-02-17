import { ListChecksIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";

import { StudentGender } from "../types";
import { useStudentFilters } from "../hooks/use-student-filters";

export const DataFilters = () => {
    const [{ birthDate, gender, search }, setFilters] = useStudentFilters();
    const onGenderChange = (value: string) => {
        setFilters({ gender: value === "all" ? null : (value as StudentGender) });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Input placeholder="بحث" className="h-8 w-full lg:w-auto" value={search ?? ""} onChange={(e) => setFilters({ search: e.target.value })} />

            <Select defaultValue={gender ?? undefined} onValueChange={onGenderChange}>
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListChecksIcon className="size-4 mr-2" />
                        <SelectValue placeholder="الكل" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectSeparator />
                    <SelectItem value={StudentGender.MALE}>ذكر</SelectItem>
                    <SelectItem value={StudentGender.FEMALE}>انثي</SelectItem>
                </SelectContent>
            </Select>

            <DatePicker placeholder="تاريخ الميلاد" className="h-8 w-full lg:w-auto" value={birthDate ? new Date(birthDate) : undefined} onChange={(date) => setFilters({ birthDate: date ? date?.toISOString() : null })} />
        </div>
    );
};
