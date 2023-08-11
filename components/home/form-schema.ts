import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Field required"),
  email: z.string().min(1, "Field required").email(),
  subject: z.string().min(1, "Field required"),
  message: z.string().min(1, "Field required"),
});

export type FormSchema = z.infer<typeof formSchema>;
export default formSchema;
