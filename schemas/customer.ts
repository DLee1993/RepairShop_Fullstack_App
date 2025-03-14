import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";

// Defines the shape of data to be inserted into the database
// This includes an object with additional validation (zod)

export const insertCustomerSchema = createInsertSchema(customers, {
    firstName: (schema) => schema.min(1, "First name is required"),
    lastName: (schema) => schema.min(1, "Last name is required"),
    address1: (schema) => schema.min(1, "Address is required"),
    city: (schema) => schema.min(1, "City is required"),
    state: (schema) => schema.length(2, "State must be exactly two characters"),
    email: (schema) => schema.email("Invalid email address"),
    zip: (schema) =>
        schema.regex(
            /^\d{5}(-\d{4})?$/,
            "Invalid zip code, use 5 digits or 5 digits followed by a hyphen and 4 digits"
        ),
    phone: (schema) =>
        schema.regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number, please use xxx-xxx-xxxx format"),
});

// Defines the shape of the data queried from the database

export const selectCustomerSchema = createSelectSchema(customers);
