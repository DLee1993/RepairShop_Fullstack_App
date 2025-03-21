import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema";
import { z } from "zod";

// Defines the shape of data to be inserted into the database
// This includes an object with additional validation (zod)

export const insertTicketSchema = createInsertSchema(tickets, {
    id: z.union([z.number(), z.literal("(New)")]),
    title: (schema) => schema.min(1, "Title is required"),
    description: (schema) => schema.min(1, "Description is required"),
    tech: (schema) => schema.email("Invalid email address"),
});

// Defines the shape of the data queried from the database

export const selectTicketSchema = createSelectSchema(tickets);
