import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import BackButton from "@/components/BackButton";

export default async function TicketFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    try {
        const { customerId, ticketId } = await searchParams;

        if (!customerId && !ticketId) {
            return (
                <>
                    <h2 className="text-2xl mb-2">Ticket or Customer ID is required</h2>
                    <BackButton title="Go back" variant="default" />
                </>
            );
        }

        // New ticket form

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

            if (!customer.active) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Customer id: #{customerId} is not active</h2>
                        <BackButton title="Go back" variant="default" />
                    </>
                );
            }

            // return ticket form
            console.log(customer);
        }

        // edit ticket form
        if (ticketId) {
            const ticket = await getTicket(parseInt(ticketId));

            if (!ticket) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Ticket id: #{ticketId} not found</h2>
                        <BackButton title="Go back" variant="default" />
                    </>
                );
            }

            const customer = await getCustomer(ticket.customerId);

            // return ticket form
            console.log("Ticket: ", ticket);
            console.log("Customer: ", customer);
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
    }
}
