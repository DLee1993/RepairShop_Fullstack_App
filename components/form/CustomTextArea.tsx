"use client";

import { TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
// Input props
// <S> generic type for the schema

interface CustomTextAreaProps<S> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    fieldTitle: string;
    nameInSchema: keyof S & string;
    className?: string;
}

export default function CustomTextArea<S>({
    fieldTitle,
    nameInSchema,
    className,
    ...props
}: CustomTextAreaProps<S>) {
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
                        <Textarea
                            id={nameInSchema}
                            className={`resize-none ${className}`}
                            {...props}
                            {...field} // pass the field props to the input - onChange, onBlur, ref, etc.
                        />
                    </FormControl>
                    <FormMessage className="text-red-500" /> {/* error message */}
                </FormItem>
            )}
        />
    );
}
