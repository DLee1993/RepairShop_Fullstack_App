"use client";

import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

// Checkbox props
// <S> generic type for the schema

interface CustomCheckboxProps<S> extends InputHTMLAttributes<HTMLInputElement> {
    fieldTitle: string;
    nameInSchema: keyof S & string;
}

export default function CustomCheckbox<S>({ fieldTitle, nameInSchema }: CustomCheckboxProps<S>) {
    const form = useFormContext();

    // render the input field with the form control

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-base" htmlFor={nameInSchema}>
                        {fieldTitle}
                    </FormLabel>
                    <div className="flex items-center gap-2 !m-0">
                        <FormControl>
                            <Checkbox
                                id={nameInSchema}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                {...field}
                            />
                        </FormControl>
                    </div>
                    <FormMessage className="text-red-500" /> {/* error message */}
                </FormItem>
            )}
        />
    );
}
