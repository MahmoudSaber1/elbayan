/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Avatar } from "@/components/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";

export const InputField = ({ control, name, type, placeholder, label, withLabel }: InputFormFieldProps<any>) => {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    {withLabel && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input type={type} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const DateField = ({ control, name, placeholder, label, withLabel }: InputFormFieldProps<any>) => {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    {withLabel && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <DatePicker {...field} placeholder={placeholder} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const SelectField = ({ control, name, placeholder, label, withLabel, withoutImage, options }: InputFormFieldProps<any>) => {
    const selectWithImage = options?.map((option) => {
        const AvatarRender = <Avatar name={option.name} image={option?.imageUrl || ""} className="size-6 mr-2" />;
        return (
            <SelectItem key={option.id} value={option.id}>
                <div className="flex items-start gap-x-2">
                    {option.name}
                    {withoutImage ? null : AvatarRender}
                </div>
            </SelectItem>
        );
    });

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    {withLabel && <FormLabel>{label}</FormLabel>}
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>{selectWithImage}</SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    );
};

export const MultiSelectField = ({ control, name, placeholder, label, withLabel, withoutImage, options }: InputFormFieldProps<any>) => {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => {
                const selectedValues = options?.filter((option) => field.value?.includes(option.id)) || [];

                return (
                    <FormItem>
                        {withLabel && <FormLabel>{label}</FormLabel>}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                    {selectedValues.length > 0 ? (
                                        <div className="flex items-center gap-2">
                                            {selectedValues.length > 2 ? (
                                                <div className="flex items-center gap-2">تم اختيار {selectedValues.length} طالب</div>
                                            ) : (
                                                selectedValues.map((option) => {
                                                    return (
                                                        <div key={option.id} className="flex items-center gap-2">
                                                            {!withoutImage && <Avatar name={option.name} image={option.imageUrl || ""} className="size-6" />}
                                                            {option.name}
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    ) : (
                                        placeholder
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="بحث..." />
                                    <CommandEmpty>لا يوجد نتائج</CommandEmpty>
                                    <CommandGroup>
                                        {options?.map((option) => {
                                            const isSelected = field.value?.includes(option.id);
                                            return (
                                                <CommandItem
                                                    key={option.id}
                                                    onSelect={() => {
                                                        const newValue = isSelected ? field.value.filter((id: string) => id !== option.id) : [...(field.value || []), option.id];
                                                        field.onChange(newValue);
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {!withoutImage && <Avatar name={option.name} image={option.imageUrl || ""} className="size-6" />}
                                                        {option.name}
                                                    </div>
                                                    <Check className={cn("ml-auto h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                                                </CommandItem>
                                            );
                                        })}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export const TextAreaField = ({ control, name, placeholder, label, withLabel }: InputFormFieldProps<any>) => {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    {withLabel && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Textarea {...field} placeholder={placeholder} rows={4} className="resize-none" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
