/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Avatar } from "@/components/avatar";

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
                <div className="flex items-start space-x-2">
                    {withoutImage ? null : AvatarRender}
                    {option.name}
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
