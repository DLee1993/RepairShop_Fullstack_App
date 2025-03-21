import BackButton from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import * as Sentry from "@sentry/nextjs";
import CustomerForm from "@/app/(repairShopRoutes)/customers/form/CustomerForm";

export default async function CustomerFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    try {
        const { customerId } = await searchParams;

        // Edit a customer form
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));

            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Customer id: #{customerId} not found</h2>
                        <BackButton title="Go back" variant="default" />
                    </>
                );
            }

            // console.log(customer);

            // exisiting customer form component goes here
            return <CustomerForm customer={customer} />;
        } else {
            // new customer form component goes here
            return <CustomerForm />;
        }
    } catch (error) {
        if (error instanceof Error) {
            Sentry.captureException(error);
            throw error;
        }
    }
}
