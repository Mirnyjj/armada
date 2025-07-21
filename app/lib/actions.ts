import { z } from "zod";

export const FormSchema = z.object({
  technique: z
    .string({
      required_error: "Пожалуйста, выберите технику",
      invalid_type_error: "Неверный тип данных",
    })
    .min(1, "Пожалуйста, выберите технику"),
  name: z
    .string({
      required_error: "Имя обязательно для заполнения",
      invalid_type_error: "Имя должно быть строкой",
    })
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя слишком длинное"),
  email: z
    .string({
      required_error: "Email обязателен для заполнения",
    })
    .email("Неверный формат email"),
  telephone: z
    .string({
      required_error: "Телефон обязателен для заполнения",
    })
    .min(10, "Телефон слишком короткий")
    .max(15, "Телефон слишком длинный")
    .regex(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
      "Неверный формат телефона"
    ),
  message: z
    .string({
      required_error: "Сообщение обязательно для заполнения",
    })
    .min(10, "Сообщение должно содержать минимум 10 символов")
    .max(500, "Сообщение слишком длинное"),
});

export type State = {
  errors?: {
    technique?: string[];
    name?: string[];
    email?: string[];
    telephone?: string[];
    message?: string[];
  };
  message?: string | null;
};

export async function submittingForm(
  prevState: State | undefined,
  formData: FormData
) {
  // Validate form fields using Zod
  console.log(formData);
  const validatedFields = FormSchema.safeParse({
    technique: formData.get("technique"),
    name: formData.get("name"),
    email: formData.get("email"),
    telephone: formData.get("telephone"),
    message: formData.get("message"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Не удалось отправить форму обратной связи",
    };
  }

  // Prepare data for insertion into the database
  const { technique, email, name, telephone, message } = validatedFields.data;
  console.log(technique, email, name, telephone, message);
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split("T")[0];

  // // Insert data into the database
  // try {
  //   await sql`
  //     INSERT INTO invoices (customer_id, amount, status, date)
  //     VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  //   `;
  // } catch (error) {
  //   // If a database error occurs, return a more specific error.
  //   return {
  //     message: "Database Error: Failed to Create Invoice.",
  //   };
  // }

  // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath("/dashboard/invoices");
  // redirect("/dashboard/invoices");
}
