import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCustomer(id: number) {
    // locate the customer from the database
    // using eq ( value equal to ), it takes the customers id from the schema and the id passed in and matches the id's in the database
    // ref drizzle
    const customer = await db.select().from(customers).where(eq(customers.id, id));

    return customer[0];
}
