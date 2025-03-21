"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// schemas & types
import { selectCustomerSchema } from "@/schemas/customer";
import { insertTicketSchema, selectTicketSchema } from "@/schemas/ticket";
import { z } from "zod";

// Component Props

type Props = {
    customer: z.infer<typeof selectCustomerSchema>;
    ticket?: z.infer<typeof selectTicketSchema>;
};

export default function TicketForm({ customer, ticket }: Props) {
    // default values for form

    const defaultValues: z.infer<typeof insertTicketSchema> = {
        id: ticket?.id ?? "(New)",
        customerId: ticket?.customerId ?? customer.id,
        title: ticket?.title ?? "",
        description: ticket?.description ?? "",
        completed: ticket?.completed ?? false,
        tech: ticket?.tech ?? "new-ticket:@example.com",
    };

    // creation of form using the default values and customerSchema for validation
    const form = useForm<z.infer<typeof insertTicketSchema>>({
        mode: "onBlur",
        resolver: zodResolver(insertTicketSchema),
        defaultValues,
    });

    // submit function
    async function onSubmit(data: z.infer<typeof insertTicketSchema>) {
        console.log(data);
    }

    // jsx form

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <div>
                <h2 className="text-xl font-bold">
                    {ticket?.id ? `Edit Ticket #${ticket.id}` : "New Ticket"}
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
