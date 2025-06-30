import { CustomerField } from "../definitions";
import { sql } from "../utils";

export async function fetchAdmin() {
  try {
    const customers = await sql<CustomerField[]>`
        SELECT
          id,
          name
        FROM customers
        ORDER BY name ASC
      `;

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}
