"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/form/CustomInput";
import CustomTextArea from "@/components/form/CustomTextArea";
import CustomSelect, { states } from "@/components/form/CustomSelect";

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
        id: customer?.id ?? 0,
        firstName: customer?.firstName ?? "",
        lastName: customer?.lastName ?? "",
        address1: customer?.address1 ?? "",
        address2: customer?.address2 ?? "",
        city: customer?.city ?? "",
        state: customer?.state ?? "",
        zip: customer?.zip ?? "",
        phone: customer?.phone ?? "",
        email: customer?.email ?? "",
        notes: customer?.notes ?? "",
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
        <div className="flex flex-col gap-5 mt-5">
            <div>
                <h2 className="text-xl font-bold">
                    {customer?.id ? "Edit" : "New"} Customer details
                </h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <section className="flex flex-col md:flex-row gap-4 md:gap-8">
                        {/* form fields */}
                        <div className="flex flex-col gap-4 w-full max-w-xs">
                            <CustomInput<z.infer<typeof insertCustomerSchema>>
                                fieldTitle="First Name"
                                nameInSchema="firstName"
                            />
                            <CustomInput<z.infer<typeof insertCustomerSchema>>
                                fieldTitle="Last Name"
                                nameInSchema="lastName"
                            />
                            <CustomInput<z.infer<typeof insertCustomerSchema>>
                                fieldTitle="Address 1"
                                nameInSchema="address1"
                            />
                            <CustomInput<z.infer<typeof insertCustomerSchema>>
                                fieldTitle="Address 2"
                                nameInSchema="address2"
                            />
                            <CustomInput<z.infer<typeof insertCustomerSchema>>
                                fieldTitle="City"
                                nameInSchema="city"
                            />
                        </div>

                        {/* form fields */}
                        <div className="flex flex-col gap-4 w-full max-w-xs">
                            <CustomSelect<z.infer<typeof insertCustomerSchema>>
                                fieldTitle="State"
                                nameInSchema="state"
                                data={states}
                            />
                            <CustomInput<z.infer<typeof insertCustomerSchema>>
                                fieldTitle="Zip Code"
                                nameInSchema="zip"
                            />
                            <CustomInput<z.infer<typeof insertCustomerSchema>>
                                fieldTitle="Phone Number"
                                nameInSchema="phone"
                            />
                            <CustomInput<z.infer<typeof insertCustomerSchema>>
                                fieldTitle="Email Address"
                                nameInSchema="email"
                            />
                            <CustomTextArea<z.infer<typeof insertCustomerSchema>>
                                fieldTitle="Notes"
                                nameInSchema="notes"
                            />
                        </div>
                    </section>
                    {/* form control buttons */}
                    <div className="flex gap-2 w-fit">
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
                </form>
            </Form>
        </div>
    );
}
