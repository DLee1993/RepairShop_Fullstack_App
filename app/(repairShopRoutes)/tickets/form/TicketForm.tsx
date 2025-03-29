"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/form/CustomInput";
import CustomTextArea from "@/components/form/CustomTextArea";
import CustomCheckbox from "@/components/form/CustomCheckbox";
import CustomSelect from "@/components/form/CustomSelect";

// schemas & types
import { selectCustomerSchema } from "@/schemas/customer";
import { insertTicketSchema, selectTicketSchema } from "@/schemas/ticket";
import { z } from "zod";

// Component Props

type Props = {
    customer: z.infer<typeof selectCustomerSchema>;
    ticket?: z.infer<typeof selectTicketSchema>;
    techs?: {
        id: string;
        description: string;
    }[];
    isEditable?: boolean;
};

export default function TicketForm({ customer, ticket, isEditable = true, techs }: Props) {
    // check for mananger permission
    const isManager = Array.isArray(techs);

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
        <div className="flex flex-col gap-5 mt-5">
            <div>
                <h2 className="text-xl font-bold">
                    {ticket?.id ? `Edit Ticket #${ticket.id}` : "New Ticket"}
                </h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <section className="flex flex-col md:flex-row justify-between items-start">
                        {/* form fields */}
                        <div className="flex flex-col gap-6 w-full max-w-xs">
                            <CustomInput<z.infer<typeof insertTicketSchema>>
                                fieldTitle="Title"
                                nameInSchema="title"
                                disabled={!isEditable}
                            />
                            <CustomTextArea<z.infer<typeof insertTicketSchema>>
                                fieldTitle="Description"
                                nameInSchema="description"
                                disabled={!isEditable}
                            />

                            {isManager ? (
                                <CustomSelect<z.infer<typeof insertTicketSchema>>
                                    fieldTitle="Tech ID"
                                    nameInSchema="tech"
                                    data={[
                                        {
                                            id: "new-ticket@example.com",
                                            description: "new-ticket@example.com",
                                        },
                                        ...techs,
                                    ]}
                                />
                            ) : (
                                <CustomInput<z.infer<typeof insertTicketSchema>>
                                    fieldTitle="Tech"
                                    nameInSchema="tech"
                                    readOnly={true}
                                    disabled={true}
                                />
                            )}

                            {ticket?.id && (
                                <CustomCheckbox<z.infer<typeof insertTicketSchema>>
                                    fieldTitle="Completed"
                                    nameInSchema="completed"
                                    disabled={!isEditable}
                                />
                            )}

                            {/* form control buttons */}
                            {isEditable && (
                                <div className="flex gap-2 w-fit mt-10">
                                    <Button type="submit" className="w-full" title="Save">
                                        Save
                                    </Button>
                                    <Button
                                        type="button"
                                        className="w-full sm:w-fit"
                                        title="Reset"
                                        variant="destructive"
                                        onClick={() => form.reset(defaultValues)}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 md:mt-0 space-y-5">
                            <h3 className="font-semibold">Customer information</h3>
                            <hr className="w-4/5" />
                            <ul className="space-y-1">
                                <li>
                                    Name: {customer.firstName} {customer.lastName}
                                </li>
                                <li>Address: {customer.address1}</li>
                                {customer.address2 && <li>{customer.address2}</li>}
                                <li>City: {customer.city}</li>
                                <li>State: {customer.state}</li>
                                <li>Zip-code: {customer.zip}</li>
                            </ul>
                            <hr className="w-4/5" />
                            <p>Email: {customer.email}</p>
                            <p>Phone: {customer.phone}</p>
                        </div>
                    </section>
                </form>
            </Form>
        </div>
    );
}
