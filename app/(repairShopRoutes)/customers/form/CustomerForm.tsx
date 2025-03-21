"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// schemas & types
import { insertCustomerSchema, selectCustomerSchema } from "@/schemas/customer";
import { z } from "zod";

// Component Props

type Props = {
    customer?: z.infer<typeof selectCustomerSchema>;
};

// Component
export default function CustomerForm({ customer }: Props) {
    // default values for form

    const defaultValues: z.infer<typeof insertCustomerSchema> = {
        id: customer?.id || 0,
        firstName: customer?.firstName || "",
        lastName: customer?.lastName || "",
        address1: customer?.address1 || "",
        address2: customer?.address2 || "",
        city: customer?.city || "",
        state: customer?.state || "",
        zip: customer?.zip || "",
        phone: customer?.phone || "",
        email: customer?.email || "",
        notes: customer?.notes || "",
    };

    // creation of form using the default values and customerSchema for validation
    const form = useForm<z.infer<typeof insertCustomerSchema>>({
        mode: "onBlur",
        resolver: zodResolver(insertCustomerSchema),
        defaultValues,
    });

    // submit function
    async function onSubmit(data: z.infer<typeof insertCustomerSchema>) {
        console.log(data);
    }

    // jsx form

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <div>
                <h2 className="text-2xl font-bold">
                    {customer?.id ? "Edit" : "New"} Customer details
                </h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-8"
                >
                    <p>{JSON.stringify(form.getValues())}</p>

                    {/* submit form button */}
                    <Button type="submit" className="w-full sm:w-fit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
