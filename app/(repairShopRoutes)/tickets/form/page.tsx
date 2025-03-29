import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import BackButton from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(repairShopRoutes)/tickets/form/TicketForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    // get customer id and ticket id
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) return { title: "Missing Ticket ID or Customer ID" };

    if (customerId) return { title: `New ticket for Customer: ${customerId}` };

    if (ticketId) return { title: `Edit ticket: ${ticketId}` };
}

export default async function TicketFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    try {
        // get customer id and ticket id
        const { customerId, ticketId } = await searchParams;
        // destructure functions from kinde server session
        const { getPermission, getUser } = getKindeServerSession();
        // call functions to get the manager permission and user
        const [managerPermission, user] = await Promise.all([getPermission("manager"), getUser()]);
        // check for manager permissions
        const isManager = managerPermission?.isGranted;

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
            // console.log(customer);

            if (isManager) {
                // initialise kinde management api
                kindeInit();

                const { users } = await Users.getUsers();

                const techs = users
                    ? users.map((user) => ({ id: user.email!, description: user.email! }))
                    : [];

                return <TicketForm customer={customer} techs={techs} />;
            } else {
                return <TicketForm customer={customer} />;
            }
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
            // console.log("Ticket: ", ticket);
            // console.log("Customer: ", customer);

            if (isManager) {
                // initialise kinde management api
                kindeInit();

                const { users } = await Users.getUsers();

                const techs = users
                    ? users.map((user) => ({ id: user.email!, description: user.email! }))
                    : [];

                return <TicketForm customer={customer} ticket={ticket} techs={techs} />;
            } else {
                const isEditable = user.email?.toLowerCase() === ticket.tech?.toLowerCase();

                return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable} />;
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            Sentry.captureException(error);
            throw error;
        }
    }
}
