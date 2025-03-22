"use client";

import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Input props
// <S> generic type for the schema

interface CustomInputProps<S> extends InputHTMLAttributes<HTMLInputElement> {
    fieldTitle: string;
    nameInSchema: keyof S & string;
    className?: string;
}

export default function CustomInput<S>({
    fieldTitle,
    nameInSchema,
    className,
    ...props
}: CustomInputProps<S>) {
    const form = useFormContext();

    // render the input field with the form control

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel className="text-base" htmlFor={nameInSchema}>
                        {fieldTitle}
                    </FormLabel>
                    <FormControl>
                        <Input
                            id={nameInSchema}
                            className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75 ${className}`}
                            {...props}
                            {...field} // pass the field props to the input - onChange, onBlur, ref, etc.
                        ></Input>
                    </FormControl>
                    <FormMessage className="text-red-500" /> {/* error message */}
                </FormItem>
            )}
        />
    );
}
