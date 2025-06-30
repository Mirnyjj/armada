import { TechniqueType } from "@/app/lib/definitions";
import { sql } from "@/app/lib/utils";

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
    const result = await sql<TechniqueType[]>`
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

export async function getTechniqueById(id: string) {
  try {
    const [technique] = await sql<
      TechniqueType[]
    >`SELECT * FROM technique WHERE id = ${id}`;
    return technique;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch technique.");
  }
}
