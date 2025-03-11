import { db } from "@/db";
import { tickets } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTicket(id: number) {
    // locate the customer from the database
    // using eq ( value equal to ), it takes the tickets id from the schema and the id passed in and matches the id's in the database
    // ref drizzle
    const ticket = await db.select().from(tickets).where(eq(tickets.id, id));

    return ticket[0];
}
