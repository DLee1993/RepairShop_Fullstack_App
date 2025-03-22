"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Select props
// <S> generic type for the schema

interface CustomSelectProps<S> {
    fieldTitle: string;
    nameInSchema: keyof S & string;
    data: { id: string; description: string }[];
    className?: string;
}

export const states = [
    { id: "AL", description: "Alabama" },
    { id: "AK", description: "Alaska" },
    { id: "AZ", description: "Arizona" },
    { id: "AR", description: "Arkansas" },
    { id: "CA", description: "California" },
    { id: "CO", description: "Colorado" },
    { id: "CT", description: "Connecticut" },
    { id: "DE", description: "Delaware" },
    { id: "DC", description: "District of Columbia" },
    { id: "FL", description: "Florida" },
    { id: "GA", description: "Georgia" },
    { id: "HI", description: "Hawaii" },
    { id: "ID", description: "Idaho" },
    { id: "IL", description: "Illinois" },
    { id: "IN", description: "Indiana" },
    { id: "IA", description: "Iowa" },
    { id: "KS", description: "Kansas" },
    { id: "KY", description: "Kentucky" },
    { id: "LA", description: "Louisiana" },
    { id: "ME", description: "Maine" },
    { id: "MD", description: "Maryland" },
    { id: "MA", description: "Massachusetts" },
    { id: "MI", description: "Michigan" },
    { id: "MN", description: "Minnesota" },
    { id: "MS", description: "Mississippi" },
    { id: "MO", description: "Missouri" },
    { id: "MT", description: "Montana" },
    { id: "NE", description: "Nebraska" },
    { id: "NV", description: "Nevada" },
    { id: "NH", description: "New Hampshire" },
    { id: "NJ", description: "New Jersey" },
    { id: "NM", description: "New Mexico" },
    { id: "NY", description: "New York" },
    { id: "NC", description: "North Carolina" },
    { id: "ND", description: "North Dakota" },
    { id: "OH", description: "Ohio" },
    { id: "OK", description: "Oklahoma" },
    { id: "OR", description: "Oregon" },
    { id: "PA", description: "Pennsylvania" },
    { id: "RI", description: "Rhode Island" },
    { id: "SC", description: "South Carolina" },
    { id: "SD", description: "South Dakota" },
    { id: "TN", description: "Tennessee" },
    { id: "TX", description: "Texas" },
    { id: "UT", description: "Utah" },
    { id: "VT", description: "Vermont" },
    { id: "VA", description: "Virginia" },
    { id: "WA", description: "Washington" },
    { id: "WV", description: "West Virginia" },
    { id: "WI", description: "Wisconsin" },
    { id: "WY", description: "Wyoming" },
];

export default function CustomSelect<S>({
    fieldTitle,
    nameInSchema,
    data,
    className,
}: CustomSelectProps<S>) {
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
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...field} // pass the field props to the input - onChange, onBlur, ref, etc.
                    >
                        <FormControl>
                            <SelectTrigger
                                id={nameInSchema}
                                className={`w-full max-w-sm ${className}`}
                            >
                                <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {data.map((item) => (
                                <SelectItem key={`${nameInSchema}_${item.id}`} value={item.id}>
                                    {item.description}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" /> {/* error message */}
                </FormItem>
            )}
        />
    );
}
