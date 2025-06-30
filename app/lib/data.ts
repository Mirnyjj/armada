import postgres from "postgres";
import {
  CompletedProjects,
  CustomerField,
  TechniqueType,
  CarousePhotos,
} from "./definitions";
import { formatCurrency } from "./utils";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchCarouselPhotos() {
  try {
    const data = await sql<CarousePhotos[]>`SELECT * FROM carousel_photos`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function fetchCompletedProjects() {
  try {
    const data = await sql<
      CompletedProjects[]
    >`SELECT * FROM completed_projects`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchTechnique(
  filters: {
    id?: string;
    title?: string;
    minBucketVolume?: number;
    maxBucketVolume?: number;
    minMaxDepth?: number;
    maxMaxDepth?: number;
    minWeight?: number;
    maxWeight?: number;
    minLoadCapacityAuto?: number;
    maxLoadCapacityAuto?: number;
    minLoadCapacityArrow?: number;
    maxLoadCapacityArrow?: number;
    minBoomReach?: number;
    maxBoomReach?: number;
    minSideLength?: number;
    maxSideLength?: number;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: keyof TechniqueType;
    sortOrder?: "asc" | "desc";
    limit?: number;
    offset?: number;
  } = {}
) {
  const {
    id,
    title,
    minBucketVolume,
    maxBucketVolume,
    minMaxDepth,
    maxMaxDepth,
    minWeight,
    maxWeight,
    minLoadCapacityAuto,
    maxLoadCapacityAuto,
    minLoadCapacityArrow,
    maxLoadCapacityArrow,
    minBoomReach,
    maxBoomReach,
    minSideLength,
    maxSideLength,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder = "asc",
    limit,
    offset,
  } = filters;

  // Белый список допустимых колонок для сортировки
  const validSortColumns = [
    "id",
    "img",
    "title",
    "bucket_volume",
    "max_depth",
    "weight",
    "load_capacity_auto",
    "load_capacity_arrow",
    "boom_reach",
    "side_length",
    "price",
  ];

  try {
    const result = await sql`
      SELECT * FROM technique
      WHERE 1=1
        ${id ? sql`AND id = ${id}` : sql``}
        ${title ? sql`AND title ILIKE ${"%" + title + "%"}` : sql``}
        ${
          minBucketVolume !== undefined
            ? sql`AND bucket_volume >= ${minBucketVolume}`
            : sql``
        }
        ${
          maxBucketVolume !== undefined
            ? sql`AND bucket_volume <= ${maxBucketVolume}`
            : sql``
        }
        ${
          minMaxDepth !== undefined
            ? sql`AND max_depth >= ${minMaxDepth}`
            : sql``
        }
        ${
          maxMaxDepth !== undefined
            ? sql`AND max_depth <= ${maxMaxDepth}`
            : sql``
        }
        ${minWeight !== undefined ? sql`AND weight >= ${minWeight}` : sql``}
        ${maxWeight !== undefined ? sql`AND weight <= ${maxWeight}` : sql``}
        ${
          minLoadCapacityAuto !== undefined
            ? sql`AND load_capacity_auto >= ${minLoadCapacityAuto}`
            : sql``
        }
        ${
          maxLoadCapacityAuto !== undefined
            ? sql`AND load_capacity_auto <= ${maxLoadCapacityAuto}`
            : sql``
        }
        ${
          minLoadCapacityArrow !== undefined
            ? sql`AND load_capacity_arrow >= ${minLoadCapacityArrow}`
            : sql``
        }
        ${
          maxLoadCapacityArrow !== undefined
            ? sql`AND load_capacity_arrow <= ${maxLoadCapacityArrow}`
            : sql``
        }
        ${
          minBoomReach !== undefined
            ? sql`AND boom_reach >= ${minBoomReach}`
            : sql``
        }
        ${
          maxBoomReach !== undefined
            ? sql`AND boom_reach <= ${maxBoomReach}`
            : sql``
        }
        ${
          minSideLength !== undefined
            ? sql`AND side_length >= ${minSideLength}`
            : sql``
        }
        ${
          maxSideLength !== undefined
            ? sql`AND side_length <= ${maxSideLength}`
            : sql``
        }
        ${minPrice !== undefined ? sql`AND price >= ${minPrice}` : sql``}
        ${maxPrice !== undefined ? sql`AND price <= ${maxPrice}` : sql``}
        ${
          sortBy && validSortColumns.includes(sortBy)
            ? sql`ORDER BY ${sql(sortBy)} ${
                sortOrder === "desc" ? sql`DESC` : sql`ASC`
              }`
            : sql``
        }
        ${limit !== undefined ? sql`LIMIT ${limit}` : sql``}
        ${offset !== undefined ? sql`OFFSET ${offset}` : sql``}
    `;

    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch technique data.");
  }
}

export async function fetchCustomers() {
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

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const data = await sql<CustomersTableType[]>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error("Database Error:", err);
//     throw new Error("Failed to fetch customer table.");
//   }
// }

// export async function fetchRevenue() {
//   try {
//     // Artificially delay a response for demo purposes.
//     // Don't do this in production :)

//     // console.log('Fetching revenue data...');
//     // await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await sql<Revenue[]>`SELECT * FROM revenue`;

//     // console.log('Data fetch completed after 3 seconds.');

//     return data;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch revenue data.");
//   }
// }

// export async function fetchLatestInvoices() {
//   try {
//     const data = await sql<LatestInvoiceRaw[]>`
//       SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       ORDER BY invoices.date DESC
//       LIMIT 5`;

//     const latestInvoices = data.map((invoice) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount),
//     }));
//     return latestInvoices;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch the latest invoices.");
//   }
// }

// export async function fetchCardData() {
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0].count ?? "0");
//     const numberOfCustomers = Number(data[1].count ?? "0");
//     const totalPaidInvoices = formatCurrency(data[2][0].paid ?? "0");
//     const totalPendingInvoices = formatCurrency(data[2][0].pending ?? "0");

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch card data.");
//   }
// }

// const ITEMS_PER_PAGE = 6;
// export async function fetchFilteredInvoices(
//   query: string,
//   currentPage: number
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const invoices = await sql<InvoicesTable[]>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

//     return invoices;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch invoices.");
//   }
// }

// export async function fetchInvoicesPages(query: string) {
//   try {
//     const data = await sql`SELECT COUNT(*)
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE
//       customers.name ILIKE ${`%${query}%`} OR
//       customers.email ILIKE ${`%${query}%`} OR
//       invoices.amount::text ILIKE ${`%${query}%`} OR
//       invoices.date::text ILIKE ${`%${query}%`} OR
//       invoices.status ILIKE ${`%${query}%`}
//   `;

//     const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch total number of invoices.");
//   }
// }

// export async function fetchInvoiceById(id: string) {
//   try {
//     const data = await sql<InvoiceForm[]>`
//       SELECT
//         invoices.id,
//         invoices.customer_id,
//         invoices.amount,
//         invoices.status
//       FROM invoices
//       WHERE invoices.id = ${id};
//     `;

//     const invoice = data.map((invoice) => ({
//       ...invoice,
//       // Convert amount from cents to dollars
//       amount: invoice.amount / 100,
//     }));

//     return invoice[0];
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch invoice.");
//   }
// }
